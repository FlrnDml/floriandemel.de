# How to use App Service Deployment Slots (with containers)

## TLDR

Using Azure App Service deployment slots requires key architectural decisions early on. Running zero-downtime deployments or blue-green deployments sadly does not come 100% out of the box. This post covers my learnings and my ideal approach of an enterprise App Service setup:

- **Use a single Azure Subscription**: This is necessary because deployment slots of one App Service cannot run across subscriptions or resource groups.
- **Create a "shared" Resource Group**: This group holds the App Service Plan and the App Service itself, allowing slots to be managed centrally over multiple environments.
- **Isolate environment-specific resources**: Use separate Resource Groups for production and preview resources like databases and Key Vaults to maintain environment isolation.

Following this setup avoids the pitfalls with deployments of multiple App Service resources in multiple subscriptions for the same application. Always keep in mind that deployment slots for multiple environments do work with one App Service resource only.

## Introduction

I have been working for quite a while now with **Azure App Service Deployment Slots**, and the experience has mostly been great. It feels seamless and safe to deploy applications by swapping a container from one App Service slot to another.

When working in a professional environment with App Services, deployment slots will most likely become a topic at one point. This is because:

- Your team wants to enable **blue-green deployments** to test a newly built application in a production-like environment before replacing the old version with the new one. - [For more information, refer to Red Hat's great docs of this topic.](https://www.redhat.com/en/topics/devops/what-is-blue-green-deployment)
- Or your team wants to create a second **deployment environment** to integrate applications with one another before deploying them to production. - [For more information, refer to Martin Fowler's great Blog about continuous integration.](https://martinfowler.com/articles/continuousIntegration.html#TestInACloneOfTheProductionEnvironment)

Both strategies are well known and often implemented at the same time. To enable blue-green deployments and deployment environments side-by-side, you seriously need to **make some architectural decision early on**.

To prepare you for these decisions, I want to outline my preferred approach for an App Service setup and discuss its most critical topics to enable environments and slots:

- Environment subscription structure
- Deployment with and without Deployment Slots
- Side effects of Deployment Slots

_Please note: This post will dive pretty deep into the topic, if you are not familiar with App Service deployment Slots, have a look at [Microsoft's deployment slot docs.](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots?tabs=portal)_

## Preferred Approach

### Deployment Slots basics

A deployment slot is essentially another—closely related—App Service running on your App Service Plan alongside your existing "main" App Service. It comes with two important features:

1.  You are able to **configure the deployment slots and the main slot of each App Service independently**. This works by setting different app settings for each slot—effectively different environment variables. Microsoft calls this slot feature "unswappable settings", settings that always stay with one slot, not with the container running inside. This way you are able to configure an **isolated development environment** around each of the slots.
2.  You are able to **swap slots**. That means you can run new containers on a deployment slot—effectively in a specific development environment—before swapping exactly that already running version to the main slot. If you are not satisfied with the way the new container performs in the main slot, you are always able to **roll back** the new container and swap the slots back to its previous version.

Beyond these two features, Azure promotes this capability heavily. [Have a look at the docs](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots?tabs=portal) to get a broad picture of all the features coming with App Service slots.

### Example

To illustrate a typical setup, I want to make a simple example:

- We want to run **one application** on Azure App Services in **two environments**: Preview (_preview.app.com_) and Production (_app.com_).
- Each application uses **one Azure SQL database** and stores its environment secrets in a **Key Vault**. Both resources are needed in each environment.
- To provision the App Service main slot (production environment) and the App Service deployment slot (preview environment) there must be **one App Service Plan** resource that hosts the slots.
- To provision Azure SQL databases, there must be **one SQL Database Server** that hosts the production and preview databases.

To enable both development environments and to swap slots between preview and production, my preferred setup looks like this:

- **One Subscription**: All resources of our example are living in one subscription.
- **Shared Resource Groups**: The App Service resource with the main and the deployment slot, the App Service plan resources, and the Azure SQL Server are cross-environment resources. They are needed by both the production and preview environments and are part of a "shared" resource group. It is not possible to maintain one App Service resource for each environment, as Azure does not support the provisioning of slots in multiple resource groups (or subscriptions). This would force us to use multiple resources instead of multiple slots!
- **Production Resource Groups**: The production database and a production Key Vault are an isolated part of the production environment, provisioned in a production resource group.
- **Preview Resource Groups**: The preview database and a preview Key Vault are an isolated part of the preview environment, provisioned in a preview resource group.

<GRAPHIC>

With a setup like this, we are able to maintain two isolated environments for both application environments (preview & production). Both have their own persistent database and separated secrets in their Key Vaults, while still being able to run everything using one App Service resource. This allows us to use the swap slot features between the two environments.

To outline the architectural decisions behind this setup, the next sections dive deeper into the technical details.

## Environment subscription structure

You may have already seen that Azure typically recommends using [different Azure subscriptions for each development environment](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-area/management-application-environments) in its cloud adoption framework. However, I found this **contradicts** the default App Service deployment slot setup for one main reason:

**All environments must connect to exactly one App Service resource.** This is critical because an App Service can create slots only as part of the same resource and resource group. Therefore, it is not possible to use multiple deployment slots of one App Service between different subscriptions or even resource groups.
That is why I prefer to have a shared resource group hosting the App Service. Any other approach would **prevent swaps between the App Services runtimes of the different environments entirely**.

Another option would be to use **multiple App Service resources**, which could be part of different resource groups or even subscriptions.

- App Service resources in **multiple subscriptions** would require multiple App Service plans and could possibly introduce other architectural challenges, for example, with networking, resource moving, or your IAM setup.
- App Service resources in **multiple resource groups** would be easier to manage, as they can still run on the same App Service plan and inside the same subscription boundaries. However, you would lose the opportunity to swap slots.

## Deployment

While you might be able to solve the challenges coming with multiple subscriptions or find a viable setup with multiple resource groups, there is one thing you will not find an easy solution for: the missing swap slot feature. It is the most critical feature you would not want to lose.

### Kudu deployments

Without the swap slot feature, you need to rely on Kudu deployment. [Kudu](https://learn.microsoft.com/en-us/azure/app-service/resources-kudu) is the deployment engine behind App Service container deployment, which is used as soon as a container registry and image tag is set at an App Service. It pulls the container image, starts a new container, and throws the old container away as soon as the new one starts.

In a setup where multiple App Service resources are used, either across resource groups or subscriptions, this deployment method is the only option to deploy. The process would look like this:

`Kudu deploys new container to main slot -> publicly available`

compared to a deployment slot deployment:

`Kudu deploys new container to preview slot -> preview slot is tested -> preview slot container is swapped to main slot -> publicly available`

The issue with Kudu deployments is that they are **not entirely zero-downtime**. Although in most cases, especially when the App Service is running on multiple instances, Kudu manages to shut down and start new containers on the different instances one after another—which keeps the application practically without downtime—this approach has some caveats:

- **Transient downtime**: Some users might experience issues when interacting with one of the instances that is shut down in the deployment process. As they lose their session and are redirected to the other instance, it is also possible to have different versions on different instances, which might cause issues for the users.
- **Scaling**: The moment the container is updated by Kudu, it becomes unavailable. This basically reduces the capacity of the application, shifting more load to the other instances.

You might understand why Kudu deployments are not labeled as zero-downtime by Azure, and why they should not be used for high-professional production workloads. Nevertheless, the decision always depends on your specific use case.

### Side Effects of Deployment Slots

There is another method to enable zero-downtime deployments with multiple App Service resources in multiple resource groups or subscriptions: using deployment slots for each resource.

This option is probably the one you must choose if your company has specific requirements for resource allocation in an environment subscription or if you want to follow Microsoft's cloud adoption framework.

This option depends strongly on your individual case; often, it is fairly simple. But some cases come with pretty remarkable **side effects**.

#### Two Environments

Imagine you create two applications running in the same environment. If you are using REST HTTP calls and a simple database, this is not an issue. Load balancing will pass each request to only one of the applications or instances running, and the database will prevent parallel write operations by default. You are likely fine running two apps in two slots side-by-side in one environment. There are no side effects so far.

However, be aware: If you were to use the deployment slot as another testing environment now, for example with different databases, you are essentially creating another new environment besides the one already existing. This introduces even more complexity and fiddling around with the setup and resources.

#### Async Communication

Another problematic point is async events, for example when you are using Kafka to communicate from one of your apps to another. Imagine there is an event consumed by your app that triggers it to write a new user to your database.

In this case the following issue might appear: Your environment has one event publisher that sends these user events, *e.g.* App 1. App 1 user events can now be consumed by both your main slot and your deployment slot—because both are in the same environment. You are now coming to a point where the deployment slot might "steal" the event from your main slot—because it is connected to the same user events. In this case it writes the user to its database, not the one of the main slot—so the user is not available in your main slot.

Another issue could be that the deployment slot processes the event in another way than expected because it is running a different code version than the main slot.

These side effects are nothing that a developer could not solve, but they are introducing another layer of complexity that someone must handle. This is often hard to grasp for application developers who do not want to dive deep into the infrastructure.

## Wrap up

Choosing the right architecture for your Azure App Service environments is critical. While Microsoft's Cloud Adoption Framework often recommends separate subscriptions, this approach conflicts with the core functionality of deployment slots, which cannot be swapped across subscription or resource group boundaries.

By using a single subscription with a shared resource group for the App Service and separate, environment-specific resource groups for databases and secrets, you get the best of both worlds. You maintain clear environment isolation while retaining the powerful, zero-downtime swap capability.

As always, the optimal approach depends on various factors. I hope you are now aware of the pitfalls and key decisions required for deployment slot setups.

## About me

My name is Florian, I am a platform engineer who wants to share his dev experience with you, hoping it makes us all a bit smarter. Please let me know what you think about my post!

In case you want to see more of my posts, you can also find me on [X.com](https://x.com/FlrnDml), where I share all of my content.
