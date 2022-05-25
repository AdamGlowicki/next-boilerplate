> Date: 01.09.2021

# Authorization with next-auth

## Status

Proposed

## Context

The current solution with authorization was unreliable in the production environment which was a blocker no. 1 for us. The problems are listed below:
- leaking the user session on the server instance and propagating it to the other users
- enforcing developers to work with getInitialProps in _app.tsx file which disables - other possible page renders provided by next.js

Considered options to solve the problem:
- Rewriting authentication from scratch by us
- Next-iron-session https://github.com/vvo/next-iron-session 
- Next-auth https://next-auth.js.org/ 

## Decision

After the research and development part, we decided to go with the next-auth and prepare the whole implementation on a separate branch. It’s also because we prefer to rely on the well tested and universal way to do it instead of creating complicated and unmaintainable modules for authorization like the last time. Generally, the first approach of rewriting authentication from scratch led us to the same problem as we are right now so it’s a short term solution. 

We consulted with frontend-devs for proposed changes and next-auth implementation. Now we want to boot the first client project with it to see how it will behave in a real situation. After that, we would be able to adapt this solution.

[Link to the next-auth docs - demo for now](https://docs.google.com/document/d/1ePvmsvh4EXp6IyOkInZudyL1Bf6o6gqzaLu9KY340sU/edit?usp=sharing)


## Consequences

> Date: 17.12.2021r.
Release of [4.0.0-beta.7](https://github.com/nextauthjs/next-auth/releases/tag/v4.0.0-beta.7) introduced a solution for cookie chunking when it get's too big. Our solution seems to be irrelevant after [this MR](https://github.com/nextauthjs/next-auth/pull/3101). Probably you should first check the library solution and use our workaround as an extreme.

Link to our changes with our solution available [here](https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/merge_requests/58/diffs). That was done when we decided to delete our solution and use the updated version.

> Date: 06.12.2021r. - DEPRECATED
When using next-auth providers you can spot the issue from [here](https://stackoverflow.com/questions/68159271/problem-whit-nextauth-js-token-length-and-cognito). Curently we are providing solution for that in [this MR](https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/merge_requests/53). 

Also we prepared a descriptive comments in the code how to treat with such problems easily in projects.

> Date: 01.09.2021r.
Handling the session is now provided by an easy to use API from the library instead of one file with authorization - it’s easy to understand how our implementation works. It’s good for the specific implementations encountered in projects because the code seems to be flexible for many cases like support for 3rd company auth providers maintained in open source.

Right now we don't know how it works on production but even if we do, it’s worth remembering that every change requires time to propagate. Developers need to fully understand the approach. There are still unknowns in the mentioned topics.
