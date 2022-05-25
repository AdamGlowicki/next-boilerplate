> Date: 04.10.2021

# Used linters

## Status

accepted

## Context

In the projects, we need strict rules to determine how we write the code. As we all know everyone has this one favourite or hated tool for that. Standardize such a process sounds like a mandatory thing to do to decrease the variety of ways for solving this problem.

We feel that when we will allow picking any tool to format the code it probably does not end up well. Tones of different solutions could be used and the project would speak the developer’s favourite language instead of a universal company solution. The worst scenario is to don’t pick any formatting tools. The second wrong scenario is using too many rules to format the code in a certain way. We can’t allow the situation when it handicaps our work.

## Decision

At this moment we command a few solutions and configurations merged into our repository and ready to use.

- Eslint:
    
    - Eslintrc - https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/blob/master/.eslintrc 

    - Eslintignore - https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/blob/master/.eslintignore 
- stylelint https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/blob/master/.stylelintrc 
- Editorconfig https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/blob/master/.editorconfig
- Tsconfig https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/blob/master/tsconfig.json
- Jest config https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/blob/master/jest.config.js 

Postscript when speaking about a tool for redux we recommend a dev tool for chrome
https://github.com/reduxjs/redux-devtools 

## Consequences

It allows decreasing potential differences in the project when someone could impose their style guide. Of course, we are talking about code readability and the way how it looks. To a lesser degree about keeping the best practices. We are in such a situation because our configuration isn’t so strict. We don’t use for example from airbnb config for eslint.

Same configurations we are using also to run our linters pipeline.

While working with the code which is written in a similar way it’s easier to orient.
