# How to move resources between subscriptions in Azure

## TL;DR
Moving resources in Azure is a powerful capability, but it's not easy. The official documentation can be a maze, making it impossible to plan with all different requirements. The biggest watch-out is for your Infrastructure as Code state, as resource ID changes will break it, requiring manual state fixes. The practical path forward is often a hybrid one: move the truly irreplaceable resources, but don't be afraid to recreate everything else. It might just be faster.

## Introduction

Have you ever thought about moving resources in Azure? About moving resources that are part of a production workload to other resource groups, subscriptions, or even regions?
I did, and the conclusion was always: **Avoid the hassle** and just keep things as they are.

Today I want to tell a story about my first move of a production workload from one subscription to another, and the lessons I learned doing so.
This post will show you the important **practical steps** and a summary of the theoretical details about moving resources between resource groups and subscriptions.

## How Microsoft wants you to act

When following the many MS Learn documentation available for Azure resource migration, you might become a bit confused reading about all the requirements you need to comply with. That is absolutely relatable, as there are so many different requirements regarding the relation of resources, their current place, or their networking setup.

*For example, moving an Azure App Service has several requirements. The App Service and its corresponding App Service Plan must be in the same resource group to be moved together. To make it more complex, they must be moved from the resource group where the App Service was originally created. This means you first have to move the App Service Plan into the App Service's original resource group before you can move them together to a new subscription.*

Why do I tell you about that? I want to make it obvious that you can not foresee all of these rules by reading one simple documentation, first because Azure documentation is too scattered and second because the rules of moving resources are too opaque.

Nevertheless, there are two high-level rules that always apply:

1.  **You need to follow the basics**. Azure generally does not allow the move between different Azure tenants. It does not move resources from or to a Cloud Solution Provider (CSP), one of Azure's partner companies. And it needs an active subscription. Just remember, if you are using a typical tenant with typical subscriptions, you will probably be fine. All basic rules are collected by Azure in their [move resources MS Learn page](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription).
2.  **You need to determine whether a resource is meant to be moved at all**. There are 3 different move operations in Azure, a move to another **subscription**, to another **resource group** or to another **region**. No matter which one you need, there is a [MS Learn page](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-support-resources) that will tell you which resource can be moved in which way.

Besides these 2 rules, many resources have specific rules applying to them. Often there are some limitations documented somewhere. I'd recommend a quick google search to find such document for the resources you are targeting, *e.g.* [Limitations for App Services](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-limitations/app-service-move-limitations).

## Be aware: Resources might change!

There is one thing that is great about moving resources:

*"Despite [some...] restriction[s], [resources] continue to operate normally, and services relying on it do not experience any downtime."* - [MS Learn](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription?tabs=azure-cli#frequently-asked-questions)

This is what makes the move possible, because you do not need to worry about downtimes in the first place.

But that is not entirely true. While I did not experience any issues with the resources we moved between subscriptions, you need to be aware that things might need to change before and will change after the move:

-   **Networking**: The move of networking resources is widely restricted. While moving a VNet is generally possible, public IPs, peerings and resource links can not be moved at all. Follow [MS Learn limitation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-limitations/networking-move-limitations) if you need to tackle networking.
-   **Scope Change**: With the new subscription, the scope of many cross-resource functionalities changes. Alerts, RBAC and subscription quotas now apply for the new subscription. Be aware that this might break things in your setup.
-   **Resource IDs Change**: As the resource IDs in Azure always follow their subscription ID, the resource ID does change with a subscription move. For example:

    `/subscriptions/901a2c3d-xxxx-xxxx-xxxx-00000000/resourceGroups/rg-production-web/providers/Microsoft.Compute/virtualMachines/vm-web-01`

    will become

    `/subscriptions/b54f9a8e-yyyy-yyyy-yyyy-ffffffff/resourceGroups/rg-production-web/providers/Microsoft.Compute/virtualMachines/vm-web-01`

    This does not only cause Azure dashboards to break, it will also cause all **Infrastructure as Code** tools, and scripts, to lose their current state with the resources.

## Infrastructure as Code

As resource IDs in Azure change with a move, look after your Infrastructure as Code (IaC) setup, and especially its state.

Most software organizations are building upon a setup of Terraform, ARM- or Biceps templates, or any other kind of IaC tools. If you are now starting to work on resources without using IaC, which is required when moving resources, the **IaC state will break** - a typical issue with IaC tools. Up to now there is no option to move resources with the IaC tools, which would solve the issue.

When moving resources this **state out of sync** issue can become really big depending on the amount of resources you are moving. But most likely you will corrupt your entire state. That will require you to recreate the entire state manually after the move.

So looking from an IaC point of view, recreating the resources seems a lot easier than manually importing them into your state.

*PS: Be aware that Azure offers some features like [export for Terraform](https://learn.microsoft.com/en-us/azure/developer/terraform/azure-export-for-terraform/export-terraform-overview), which allows you to import existing resources easily. Sadly this did not work for us but might solve your issues with importing the moved resources into your state.*

## Why all the hassle?

*"So far so good, but would it not be easier to just tear down all infrastructure and provision it all again? - With IaC that is a quick operation, which makes the resource move easier and more predictable. Why all the hassle?"*

A discussion like that will most likely be part of each decision regarding resource moving. And it is absolutely fair, it probably is easier in most cases. Especially if you would need to manually rebuild a big IaC state.

But there are two elephants in the room.

First, there are **resources you really do not want to recreate** when moving. There might be a database with many TB of data that requires a long lasting backup and restore procedure, or there might be any other resource you might not want to tear down for many other reasons.

*For example in my recent project there was an internal reference on one of the KeyVault secrets, that requires a Service Now ticket and a lot of waiting to be referenced again by internal IT. It was one of these things you just do not want to do again. So we decided that moving seems like the easier way.*

Second, there are **systems that need to be up and running all the time**. Recreating such a system would either require to spin up a second copy and hot-swapping the two systems afterward, or just moving the resources entirely. This new level of complexity might tip the scales toward the move quite quickly.

While it is hard for me to answer the question if you should try to move resources, it might be worth a discussion on your side.

## Stay Practical

My most important learning is that you should stay practical and **just try it out** yourself. After going through pages of documentation, your only way to know for sure is to see what happens. Before you touch your production environment, use a testing environment or make some prod-like test cases.

*We, for example, used a deprecated service that wasn't doing a lot for the system. Downtime would not affect the system to much and after we moved it, we were sure that it is possible.*

At this point I want to recommend **[Azure Resource Mover](https://learn.microsoft.com/en-gb/azure/resource-mover/overview)**, an Azure tool that allows to move resource in the Azure portal. It is simple and gives great feedback before executing the move. You are able to configure the operation you'd like to execute and Azure Resource Mover will check if it might work before executing. Play around with it a bit and you will know what works and what does not.

You should also remember that you do not need to go all-in on moving everything. It is perfectly fine to take a **hybrid approach**. For some critical resources you absolutely can not recreate — like a database with terabytes of data — the move operation is perfect. For everything else, you might find it is faster to just recreate them from scratch in the new location and move the database into the new setup. 

When starting to think about hybrid solutions, you will quickly find a way that could work for you.

## What happens when shit hits the fan?

Even if the move process is designed to be safe on Azure`s side, always be prepared for the unexpected.

First, be **prepared to handle an unexpected downtime** by having a Plan B. Make sure you know exactly how to set things up from scratch if the move fails. If you use Infrastructure as Code, this might just be your standard deployment process to the old environment, but it is a critical fallback to have ready.

*For example, we moved all of our resources from one subscription to another without a downtime. Already thinking everything worked out perfect. But while recreating the state in our IaC tool Pulumi, Pulumi decided to destroy an entire resource group because it would not import a resource group correctly in its state. Things will happen...*

Second, **create backups**. Even though the process should not cause data loss, create backups of everything important before you start. You probably will not need them, but it is a simple and essential safety measure.

Finally, do not perform a migration in secret. **Keep your stakeholders informed** about what you are doing and when. Be transparent about the small possibility of downtimes.

After all, it is not easy, but always remember: **Just try it!**

## About me

My name is Florian, I am a platform engineer who wants to share his dev experience with you, hoping it makes us all a bit smarter. Please let me know what you think about my post!

In case you want to see more of my posts, you can also find me on [X.com](https://x.com/FlrnDml), where I share all of my content + daily dev news.