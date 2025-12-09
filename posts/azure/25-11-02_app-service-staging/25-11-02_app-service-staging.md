# How to use App Service Deployment Slots (with containers)
## Introduction

I have been working for a quite a while now with **Azure App Service Deployment Slots**, and the experience has always been great. It feels seamless and safe to deploy applications by swapping a container from one App Service slot to another. 

When working in a professional environment with App Services, deployment slots will most likely become a topic at one point. This is because: 
- Your team wants to enable **blue-green deployments** to test a newly build application in a production environment before replacing the old version with the new one. - [For more information, refer to Red Hats great docs of this topic.](https://www.redhat.com/en/topics/devops/what-is-blue-green-deployment)
- Or your team wants to create a second **deployment environment** for your team or organization to integrate applications before deploying them to production. - [For more information, refer to Martin Fowlers great Blog about continuous integration.](https://martinfowler.com/articles/continuousIntegrationhtml#TestInACloneOfTheProductionEnvironment)

Both strategies are well known and often implemented at the same time. To enable blue-green deployments and deployment environments side-by-side, you sadly need to **make some architectural decision early on**.

To prepare you for these decisions, I want to outline my ideal approach for an App Service development environment setup, discussing its most critical topics:

- Environment subscription structure
- Deployment with Deployment Slots
- Sideeffects of Deployment Slots

*This post will dive pretty deep into the topic, if you are not familiar with App Service deployment Slots, have a look at have a look at [Microsoft's deployment slot docs.](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots?tabs=portal)*

## Ideal Approach

While a deployment slot is basically another - closely related - App Service running on your App Service Plan next to your already existing "main" App Service. It comes with one main functionality: You are able to **configure the deployment slots and the main slot of each App Service independently**, by setting different App Settings for each slot (Microsoft calls this "unswappable settings"). This way you are able to configure an **isolated development environment** around each of the slots.

*For example, you could configure your main App Service for a production environment with a connection to the production database of your system and the url "app.com". Your deployment slot on the other side could get a second development database, and the url preview.app.com - basically an isolated preview environment next to your production environment.*

<PICTURE>

This is exactly the setup I want to propose as the ideal App Service setup. It follows [Microsoft's continuous deploy code recommendation](https://learn.microsoft.com/en-us/azure/app-service/deploy-best-practices#continuously-deploy-code) and keeps thing simple. The following benefits are included:

- **Swap warmed up slots towards production**: Run new code versions on a preview slot in a development environment before swapping exactly that warmed up (already running) version to the main slot (your production environment).
- **Roll back**: Swap newly deployed code version back if there are issues coming up in production quickly.

At this point, Azure does a lot of advertisement itself for the feature. [Have a look at the docs](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots?tabs=portal) to get a broad picture of all the features coming with App Service slots. 

Overall you want to have this feature working for you. To make that go as smooth as possible, I want to speak about the important architectural decision from now on.

## Environment subscription structure

Azure recommends to use [different Azure subscriptions for each development environment](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-area/management-application-environments) in its cloud adoption framework. But I found this **contrary** to the default App Service deployment slot setup because of one main reason:

**Each slot must adhere to exactly one App Service Plan!** This is critical because each App Service Plan can  host slots only in the same subscription it is living in. Therefor it is not possible to use multiple deployment slots of one App Service between the different subscriptions. What **prevents swaps between the App Services of the different environments entirely**. 

To solve this issue, there are 2 options:
- Provision your entire system with all its development environments in exactly one subscription, and structure your resources with resource groups. This is as well a option outline in [Azure's cloud adoption framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-area/management-application-environments).
- Provision one "shared" subscription for resources that are shared between development environments. Which has its own issues, like VNets between App Services and not-shared resources. 

As multiple subscriptions, one for each environment, and one for shared resources implies higher complexity, because it makes networking or roles&rights setup harder, I tend to recommend a one subscription set, utilizing App Service deployment slots.

## Deployment with Deployment Slots 

Nevertheless deployment slots are a important feature for your App Service, even if they are not used across subscriptions. Mainly because of their zero downtime functionality.

## Kudu deployments

Another App Service specific issues comes into play, when discussing zero downtime deployments - [Kudu](https://learn.microsoft.com/en-us/azure/app-service/resources-kudu). Kudu is the deployment engine behind App Service container deployment, which is used as soon as a container registry and image tag is set at an App Service. It pulls the container image, starts a new container, and throws the old container away, as soon as the new one starts.

In a setup where multiple App Service resources are used across multiple subscription, this deployment method would be the alternative to deployment slot swaps. The processes would look like:

1. Deployment Slot deployment

Kudu Deploy new container to preview slot -> test -> swap to main slot -> publicly available

2. Kudu Deployment

Kudu deploy new container to main slot -> publicly available

The issue with the Kudu deployment is, that it is not entirely zero downtime. While in most cases, when the App Service is running on multiple instances, Kudu manages to shut down and start new container version on the different instances one after another - which keep the deployment practically zero downtime. But with some caveats.

- Transient downtime: Some users might experience issues, when interacting with one the instances that is shut down. as they loose their session and are redicrected to the other instance.
- Scaling :In the moment of the containers is updated by Kudu, it is not available. This basically reduces the capacity of the application, shifting more load to the other instances.

You might understand why the kudu deployments are not labeled as zero downtime by Azure, and why they should not be used for professional production workload. 

This does also effect the overall setup of an App Service runtime. You basically need a deployment slot just to guarantee zero downtime deployments, even if they are not used for development environments.

### Zero Downtime deployments

The idea of blue-green deployments often comes with a solution for zero downtime deployments by default. A zero downtime deployment is basically the idea to run two version of the same container side-by-side, before switching the routing of your load balancer from the currently productive container to the newer instances. This avoids a downtime while the deployment is happening. 

While an App Service setup with multiple container version running in multiple App Service resources across multiple subscriptions offers the possibility to test new containers on one of the environments. A real blue-green deployment can only be used with the option to zero downtime deployment, and includes the option for a rollback as well.

In a setup where one App Service resource is used in Azure for all development environments, this is not an issue. But in setup with multiple App Service resources, you are required to basically duplicate each development environment again, to provide the zero downtime deployment option for your services - a bit redundant.

## Sideeffects of Deployment Slots

### Async Communication and other side effects

## Instances and technical requirements
- Container must work on each env
- Set env variables in App Services (With key vaults)
- Have all services in each environment 
...


## Where to set up environments?

Subscriptions? Resource Groups? 

Where are other parts of the system running? 

How separated must your environemnts be? 

multiple Ap pServices in one environments? (Stages in Stages)

## Implications 

(Benefits of the setup / Drawbacks)

- automated swaps between environemtns

## The perfect setup

After pointing at all the possible issues coming with different App Service setups, I want to outline the perfekt App Service setup:

- One subscription
- A shared Resource Group
- One Resource Group per development envrionment
- Shared resources (Key Vault, Database server ...)
- Environment resources (Database, Key Vault, ..)



## About me

My name is Florian, I am a platform engineer who wants to share his dev experience with you, hoping it makes us all a bit smarter. Please let me know what you think about my post!

In case you want to see more of my posts, you can also find me on [X.com](https://x.com/FlrnDml), where I share all of my content + daily dev news.