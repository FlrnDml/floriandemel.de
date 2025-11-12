# How to (not) move resources in Azure
## Introduction

Have you every thought about moving resources in Azure? About moving production workloads?
I did, and always was the conclusion to avoid the hustle and just keep things as they are.

Today I want to tell a story about my first move of production workloads, and about the learnings I had doing so.
 This guide will show you the important practical steps and theoretical details about moving resources. 

## How Microsoft wants you to act

When following the many MS learn documentations available for Azure resource moving, you might become a bit confused reading about all the requirements and details you need to comply to. That is absolutely relatable, there are so many different requirements regarding the relation of resources, their current place or even their networking setup. The following requirements are the most important ones: 

1. **You need to determine whether a resource is meant to be move at all**. There are 3 different move operations in Azure, a move to another **subscription**, to another **resource group** or to another **region**. No matter which one you need, there is a [MS learn page](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-support-resources) that will tell you which resource can be move in which way.
2. **You need to determine whether a resource must be moved with a related resource**.
3. **You need to follow some basic rules**. Azure generally does not allow the move between different Azure tenants. It does not move resources from or to a Cloud Solution Provider (CSP), one of Azures partner companies. And it needs an active subscription. Just remember, if you are using a typical tenant with typical subscription, you will probably be fine. 


## Infrastructure as Code

One important topics when moving resources around is your Infrastructure as Code (IaC) setup, and especially its state.

Most professional software organizations are building upon a setup of Terraform, ARM- or Biceps templates, or any other kind of IaC tools. These tools are basically using files in JSON, YAML or any other format to declare the infrastructure for Azure. To make this possible, the IaC tool does call the Azure ARM API in the background, deploying and deleting resources. This process requires a state, a file storing the current resources the tool deployed for the tool to work with.

If you are now starting to work on resource without IaC, the IaC state will not represent the actual state of the resources anymore. The IaC tool is basically broken at that point, requiring a manual intervention and state update from your side, what is a typical issue working with IaC.

When moving resource this issue becomes really big. Typically you would forget to work with IaC for one small change, what requires one small update to one resource in the state manually. Some tools even allow for a automated refresh to fix an unaligned state. 

But with a move, you might corrupt your entire state, depending on the resources you are moving. If you are moving one resource, importing it to the state is often simple depending on the tool. If you are moving all resource of a system, the state will be completely off afterwards, what will require you to recreate the entire state manually. 

So looking from a IaC point of view, recreating the resources seems a lot easier than manually importing them into your state.



## Why all the hustle?

*"So far so good, but would it not be easier to just tear down all infrastructure and provision it all again? - With IaC that is a quick operation, that makes the resource move easier and more predictable. Why all the hustle?"*

A discussion like that will most likely be part of each decision regarding resource moving. And that is absolutely right, it probably is easier in most cases.

But there are two elephants in the room. 

First, there are resource you really do not want to recreate when moving. There might be a database with a many TBs of data that requires a long lasting backup procedure, or there might be any other resource you might not want to tear down for many other reasons.

For example in my recent project there was an internal reference on one of the KeyVault secrets, that requires a Service Now ticket and a lot of waiting to be referenced again by internal IT. It was one of these thing you just do not want to do again. So we decided that moving seems like the easier way.

Second, there are systems that need to be up and running all the time. Recreating such a system would either require to spin up a second copy and hot swapping of both systems, afterwards. Or just moving the resources entirely. This new level of complexity might shift the ball of low complexity towards the the move quite quickly. 

## Stay Practical

- Try if it works - there are so many requirements and contradictory docs, just find out yourself
- Move some resources if you can not delete them and recreate others

## What happens when shit hits the fan?

- be prapared to handle a unexpected event or downtime
- create backups even if you probably do not need them
- Make sure you know how to set things up from scratch
- have stakholders ready
- communicate possible downtimes



