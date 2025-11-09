# How to (not) move resources in Azure
## Introduction

Moving resource in Azure is a functionality that no one would need in a perfect world. You created a subscription or resource group before deploying and running your production workloads, with the right organizational structure in mind. 

Why would anyone ever want to move this structure afterwards? 

That is exactly the point. Not every organizational change can be foreseen. You might need to change your structure when splitting a team into two, or moving one old - no really legacy - application to a completely different department in your organization. Such things will happen eventually in a professional Azure environment. 

This guide will show you the important practical steps when moving resources. 

## How Microsoft wants you to act

When following the many MS learn documentations available for Azure resource moving, you might become a bit confused in all the requirements and details you need to comply to. Thats absolutely relatable, the following requirements are in your way.

1. **You need to determine whether a resource is meant to be move at all**. There are 3 options, a move to another subscription, to another resource group or to another region. No matter which one, there is a [MS learn page](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-support-resources) that will tell you which resource can be move in which way.
2. **You need to determine whether a resource must be moved with a depending resource**.
3. **You need to follow some basic rules**. Azure generally does not allow the move between different Azure tenants. It does not move resources from or to a Cloud Solution Provider (CSP), one of Azures partner companies. And it needs an active subscription. Just remember, if you are using a typical tenant with typical subscription, you will probably be fine. 


## Infrastructure as Code

One important topics when moving resources is Infrastructure as Code (IaC), and especially its state. 
Most professional software organizations are building upon a setup of Terraform, ARM- or Biceps templates, or any other kind of IaC tools. These tools are basically using files in JSON, YAML or any other language declaring the infrastructure that should be deployed in Azure. To make this possible, the IaC tool does call the Azure ARM API in the background, deploying and deleting resources. This process requires a state, a file storing the current resources the tool deployed for the tool to work with.

If you are now starting to work on resource without IaC, the IaC state will not represent the actual state of the resources anymore. The IaC tool is basically broken at that point, requiring a manual intervention and state update from your side, what is a typical issue working with IaC.

When moving resource this issue becomes really big. Typically you would forget to work with IaC for one small change, what requires one small update to one resource in the state manually. Some tools even allow for a automated refresh to fix an unaligned state. 

But with a move, you might corrupt your entire state, depending on the resources you are moving. If you are moving one resource, importing it to the state is often simple depending on the tool. If you are moving all resource of a system, the state will be completely off afterwards, what will require you to recreate the entire state manually. 

So looking from a IaC point of view, recreating the resources seems a lot easier than manually importing them into your state.



## Databases and other immutable resources

While it seems easy to 

## Do I really need to move?

- decision tree -> When move, when recreate?
- 

## What happens when shit hits the fan?

## Practicality

- Try if it works - there are so many requirements and contradictory docs, just find out yourself




