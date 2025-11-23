# How to move resources between subscriptions in Azure

## TLDR
Moving Azure resources to a new subscription or resource group, a process often called Azure resource migration, is a complex task. While it avoids service downtime, it comes with significant side effects. The biggest challenge is that the resource IDs change, which breaks your Infrastructure as Code (IaC) state, causing what is known as Azure IaC state drift. This requires manual effort to fix (e.g., using `terraform import` after the move). This article shares practical learnings and argues that for many scenarios, recreating the resources in the new location can be easier than a cross-subscription move. Always test your migration in a safe environment first.

## Introduction

Have you ever thought about moving resources in Azure? About moving resources that are part of a production workloads to other resource groups, subscriptions or even regions?
I did, and the conclusion was always: Avoid the hassle and just keep things as they are.

Today I want to tell a story about my first move of a production workload from one subscription to another, and the learnings I had doing so.
This post will show you the important practical steps and a summary of the theoretical details about moving resources between resource groups and subscriptions.

## How Microsoft wants you to act

When following the many MS learn documentations available for moving Azure resources, you might become a bit confused reading about all the requirements and details you need to comply to. That is absolutely relatable, as there are so many different requirements regarding the relation of resources, their current place or even their networking setup.

*E.g. When moving Azure App Services, you need to make sure the App Service is in the same resource group as their App Service plan because both resources must be moved together. And even worse, App Services must be moved in the same resource group where they have been created in. To comply to all of these requirements when moving subscriptions, you first need to move an App Service plan to the resource group where the App Service has been created in, and afterwards move both resource together to another subscription.*

Why do I tell you about that? I want to make obvious that you probably can not foresee all of these rules by reading one simple documentation. First because Azure documentation is too scattered and second because the rules of moving resources are too opaque.  

Nevertheless, there are two high level rules that do always apply:

1. **You need to follow some basic rules**. Azure generally does not allow the move between different Azure tenants. It does not move resources from or to a Cloud Solution Provider (CSP), one of Azures partner companies. And it needs an active subscription. Just remember, if you are using a typical tenant with typical subscriptions, you will probably be fine. All basic rules are collected by Azure in their [move resources MS learn page](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription).
1. **You need to determine whether a resource is meant to be moved at all**. There are 3 different move operations in Azure, a move to another **subscription**, to another **resource group** or to another **region**. No matter which one you need, there is a [MS learn page](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-support-resources) that will tell you which resource can be moved in which way.

Besides these 2 rules, many resources have specific rules applying to them. Often there are some limitations documented somewhere. I'd recommend a quick google search to find such document for the resources you are targeting. E.g. [Limitations for App Services](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-limitations/app-service-move-limitations). 


## Be aware: Resources might change!

There is one thing that is great about moving resources:

*"Despite [some...] restriction[s], resources continue to operate normally, and services relying on it do not experience any downtime."* - [MS learn](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription?tabs=azure-cli#frequently-asked-questions)

This is what makes the move possible, because you do not need to worry about downtimes in the first place.

But that is not entirely true. While I did not experience any issues with the resources we moved between subscriptions. You need to be aware that Azure might change things:

- **Networking**: The move of networking resources is widely restricted. While moving a VNet is generally possible, public IPs, peerings and resource links can not be moved at all. Follow [MS Learn limitation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-limitations/networking-move-limitations) if you need to tackle networking.  
- **Scope Change**: With the new subscription, the scope of many cross-resource functionalities changes. Alerts, RBAC and subscription quotas now apply for the new subscription. Be aware that this might break things in your setup.
- **Resource IDs Change**: As the resource IDs in Azure always follow their subscription ID, the resource ID does change with a subscription move. For example:

    `/subscriptions/901a2c3d-xxxx-xxxx-xxxx-00000000/resourceGroups/rg-production-web/providers/Microsoft.Compute/virtualMachines/vm-web-01`

    will become 

    `/subscriptions/b54f9a8e-yyyy-yyyy-yyyy-ffffffff/resourceGroups/rg-production-web/providers/Microsoft.Compute/virtualMachines/vm-web-01`

    This does not only cause Azure dashboards to break it will also cause all **Infrastructure as Code** tools, and scripts, to lose their current state with the resources.  

## Infrastructure as Code

As resource IDs in Azure change with a move, look after your Infrastructure as Code (IaC) setup, and especially its state.

Most software organizations are building upon a setup of Terraform, ARM- or Biceps templates, or any other kind of IaC tools. If you are now starting to work on resources without using IaC, which is required when moving resources, the **IaC state will break** - a typical issue with IaC tools. Up to now there is no option to move resources with the IaC tools, what would solve the issue.

When moving resources this **state out of sync** issue can become really big depending on the amount of resources you are moving. But most likely you will corrupt your entire state, what will require you to recreate the entire state manually after the move. 

So looking from a IaC point of view, recreating the resources seems a lot easier than manually importing them into your state.

*PS: Be aware that Azure offers some features like [export for Terraform](https://learn.microsoft.com/en-us/azure/developer/terraform/azure-export-for-terraform/export-terraform-overview), which allows you to import existing resources easily. Sadly this did not work for us but might solve your issues with importing the moved resources into your state.*



## Why all the hassle?

*"So far so good, but would it not be easier to just tear down all infrastructure and provision it all again? - With IaC that is a quick operation, that makes the resource move easier and more predictable. Why all the hassle?"*

A discussion like that will most likely be part of each decision regarding resource moving. And that is absolutely right, it probably is easier in most cases. Especially if you would need to manually rebuild a big IaC state.

But there are two elephants in the room. 

**First**, there are resources you really do not want to recreate when moving. There might be a database with many TBs of data that requires a long lasting backup and restore procedure, or there might be any other resource you might not want to tear down for many other reasons.

*For example in my recent project there was an internal reference on one of the KeyVault secrets, that requires a Service Now ticket and a lot of waiting to be referenced again by internal IT. It was one of these things you just do not want to do again. So we decided that moving seems like the easier way.*

**Second**, there are systems that need to be up and running all the time. Recreating such a system would either require to spin up a second copy and hot swapping of both systems, afterwards. Or just moving the resources entirely. This new level of complexity might shift the ball of low complexity towards the the move quite quickly.

While it is hard for me to answer the question if you should try to move resources, it might be worth a discussion on your side.

## Stay Practical

- Try if it works - there are so many requirements and contradictory docs, just find out yourself by trying out in a testing state / environment
- You do not need to go all in for everything: Move some resources if you can not delete them and recreate others

## What happens when shit hits the fan?

- be prepared to handle a unexpected event or downtime
- create backups even if you probably do not need them
- Make sure you know how to set things up from scratch
- have stakholders ready
- communicate possible downtimes