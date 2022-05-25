> Date: 1.04.2022r

# ISR (Incremental Static Regeneration) nextjs feature status

## Status

rejected

## Context

Many of you came here to read about the ISR feature and at the beginning let's give some grasp of information on what it is?

> Feature docs page as the source of the latest information:
https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

It's worth mentioning that it's one of the official data fetching solutions listed in the nextjs docs right here: https://nextjs.org/docs/basic-features/data-fetching/overview. But please don't treat is a completely separate and new thing. It's more like adding some options to static paths.

To make long story short this feature allows refreshing the static page after a defined time when the user hits the page. You can think about it also as an extended caching system but on the nextjs backend side.

To use it you just need to define the `revalidate` value in the fetching method. The rest of the magic happens on the server.

With the nextjs `12.1` version they introduced a thing called "on-demand revalidation". That's manual revalidation for the selected page. Useful when we i.e. want to fix some typo on a static page. We are allowed to hit the "refresh" request without rebuilding the whole site like on the "standard" or old fix way. The other cases are rarely possible for this feature to be honest.

To achieve this you have to create a small script in your API directory. It will handle the incoming request for the selected page. The code example is provided in the [docs](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation). This API route is defended and triggered by sending the secret key stored inside the site env variables. It's our auth system here.

___

Let's get to the discovered potential problems.

Even after reading the pieces of information from here:
https://aws.amazon.com/about-aws/whats-new/2021/08/aws-amplify-hosting-support-next-js-version-11/

...and there (the OP answer):
https://www.reddit.com/r/nextjs/comments/mvvhym/a_complete_guide_to_incremental_static/gvfu256/

Before the info from the amazon docs, the actual support for nextjs had one potential issue. That's also a case when you want to use something else than AWS (i.e. client decision or their/unknown infrastructure) with an undefined amount of servers behind your site.

Potential problem description:

You don't revalidate page in the all servers at once after a single user request.

It's a case when you have a site on multiple servers (you may even don't know about it). So you may hit the page, revalidate and get new content but after a refresh, it could still respond with the old version. Seems like a specific and hard to debug case.

Also, after consultations with DevOps team members, they claim that setting up CloudFront for the frontend is easier including maintaining, configuring and setup than dealing with the ISR feature and moving one part of the caching to the frontend tool. It's not the nextjs job to deal with it if DevOps is setting up the other tools/mechanisms for that. As the result, it just can't go well together and soon or later we can hit some unwanted and unknown issues.

## Decision

**IMPORTANT SUMMARY**: We are **NOT** supporting this feature right now. 

The problem does not lay on the frontend side itself and we can't prepare a fix for it. Also, it's not caused by current state of our boilerplate code. That means we won't change our status flag or enable support for this feature soon. Please take a look at the alternatives described below for your project.

As an alternative, we can provide together with our DevOps team the combination of SSR + CloudFront instead of ISR.

Just for the record - Currently in the `package.json` we have `nextjs` in the `12.0.3` version and on the day of writing the latest is `12.1.4`. But it doesn't change anything in our case :)

## Consequences

For sure we can't say that we are using the nextjs to the fullest b/c we just decided to block one particular feature for developers.

Our alternative will require some DevOps support for sure and we will see how it goes.
