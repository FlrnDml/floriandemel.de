---
title: "What your team actually needs from a Tech Lead"
date: 2026-09-27
description: "After my first months as a Tech Lead, I found two core tasks that matter most: Keep the feature pipeline rolling and build a technical vision."
tags: [process, leadership]
draft: true
---

Have you every asked a developer what a good Tech Lead does?

You will rarely hear that they want a "great architect" that describes the most shiny software architecture. They want to have a clear answer to what do work on next. let me explain...

Coming into a new Tech Lead role lately, I made my way though books like the staff engineers path (https://www.oreilly.com/library/view/the-staff-engineers/9781098118723/) by Tanja Reilley, and even if its a great book, it did not bring me through my first days. There are so many things to focus on, I always wondered what the core of my new job really is.

After my first months in the role, after talks with many devs and stakeholers, I want bring a bit of clarity in these core tasks of a Tech Lead and tell you about my top two priorities:

1. Keep the feature pipeline rolling
2. Build a technical vision

## Keep the feature pipeline rolling

In software organizations, different ideas of new features and their technical solutions are floating around. Multiple stakeholders try to prioritize work for your team and roadmaps are shifted regularly.

All of this happens, while dev teams are continously needing prepared working packages to stay productive.

### Roadmapping is hard

In a perfect world, a coordinated flow of working packages does always exist. The Product Owner of a team would align everyone on clear goals and provide a product roadmap for the next months. The team refines it into clear working packages. But this often comes with many impediments.

Understanding, estimating and planning work in an organization with more than one team is a complex task. Many stakeholders are involved and conflicts between business and tech are coming up regularly. Finalized plans are often shifted again. The process of refinement is one of the main challenges of software development.

### Prepare the work

Without technical understanding of the current implementation it is not possible to bring a roadmap idea to a clarified working package. Preparation of overarching architecture and technical solution design should already be outlined before someone in the team starts to work.

This is where a Tech Lead is able to fill the gap. He understands new feautures, is able to align them architecturally and resolved open questions early in the planning process.

In Short: A Tech Lead is able to clarify work before it reaches the developer. He is able to kill the waste.

### Kill Waste

Preparing work comes with one commitment to your devs: Do not overrun them with waste.

Changing requirements in the implementation phase, task switching and handoffs are not only inefficient. They are pure demotivation for developers.

the book "lean software development" from 2003 by.., does already outline the lean principle for software development. That's exactly what your task is all about. Make sure everyone is able to deliver value, it is not only economically effective. It also feels better for everyone involved.

So keep everyone happy and working on clear working packages based on coordinated and refined decisions.

![Po and Tech Lead together](<po-and-tl-together.png>)

## Build a technical vision

While the pipeline for new features flows smoothly, there are many non functional architectural concerns that must be addressed to create long lived software systems.

### Have a broad understanding

This is where a Tech Lead drives not only the specific architecture of a product, he also aligns it with overarching organizational architecture.

In corporate environments architecture tackles cross cutting concerns like security, UX or a shared tech stack. These things are shared between multiple software products and teams. They are shared organizational requirements and a common foundation.

While developer often want to build new, exciting and good looking technology, aligning them on an organization wide adoption is essential to keep software together in the scope of a bigger organization. Even if it means to build another boring Sprint Boot application.

### Strive for technical clarity

Following and participating in such an overarching architecture does sounds like an easy task. Maybe you read some documentations, make sure to apply the recommanded way of doing things, and you will be fine, right?

Most likely, no!

Often there is no comprehensive documentation describing a solution, sometimes not a single document. Maybe there is merely someone to ask. And in the worst case, there isn't even a process to follow.

Knowing which setup to work with requires you to make your own way through the jungle. Something that requires tedious research and networking. Sometimes its on you to bring up something new and align your organization on its usage.

### Build it long lasting

All of that is so much work, why cant you just ignore all of that alignment and build things quickly?

One of the main requirements of a technical lead is to bring a long lived system to success. Software engineering is exactly about that. Software that lasts, software that is only working on a stable base. Not just a simple vibe coded script.

If you want so create such a long lasting system, create a clear technical vision. Together with your organizations architecture.

### What does the team say?

Besides organizational challenges, there are also technical requests driven directly by the developers in your team. Partially representing detailed technical issues, partially representing developer exierience issues - that are not less important.

You are probably familiar with requests like:

- Integrating code is to slow and the CI pipeline feels like it takes forever.
- The new event driven architecture misses a clear API schema handling.
- Our software should we rewritten in Rust ;)

There must be someone in the room who takes the responsibility for such requests, even if some are more relevant that others. Do not look for someone to solve this for you. It's the Tech Lead, who tackles them.

While all of these topics, are not the ones driving the product for a user, they are important to make the technology work on the short and the long run.

### Have a vision

While a technical vision helps yourself to make better decisions, do not forget that the same vision helps your teammates to thrive towards a shared goal as well. Communiate it thorougly. Developers are far more effective writing new code, when they understand what they are working towards and how it should be implemented

![tl-corporate-and-developers](<tl-devs-corporate.png>)
