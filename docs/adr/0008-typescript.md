> Date: 05.10.2021

# Typescript

## Status

accepted

## Context

The world of JavaScript is growing constantly. This sentence could sound like a lame article on medium, I know. But at the same time, it’s hard for a better opening for this wide topic. For this particular reason, we need to adjust and improve our code and the way that we are writing it to understand it better.

We all could agree that amount of libraries used in the project is insane. Our package.json file puffs up. At the same time, our project bundle file size is exceptionally big. It’s hard to set in that amount of code without any help.

Quite often it occurs that our mistakes could arise from wrong input or output in our function. When we are writing code in the JS it’s hard to sniff such mistakes without using a debugger or manually by console.log. How we can solve this problem? One of the tools which could help us to solve all mentioned topics is TypeScript of course.

More libraries rewrite their code from JS to TypeScript just to protect themselves in open source and to ease the usage of prepared API for developers. Preparing even the easiest types in our application could avoid many mistakes because they would be caught in the moment of writing the code. 

We are sure that this technology mark some way of the frontend. Adapting such a way sounds a really reasonable decision for us.

## Decision

We are starting our new projects on the template prepared for TS. It allows us to increase typed code in our daily job and in some certain way learn how to deal with code written like that even better.

Working on such a solution we have the privilege to share the knowledge in the upcoming projects and improve our tools.

## Consequences

Some developers could feel overwhelmed by the TS errors at the beginning. We have a few ways to deal with them. A pair programming session or consultation on the internal slack channels is the best way to deal with this kind of problem.

Well written types - written with the best practices - allows us to decrease the potential amount of mistakes. We don’t say about deleting the problems completely from our work - that’s obvious - but it’s an additional real help for you.
