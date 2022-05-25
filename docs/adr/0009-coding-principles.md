> Date: 06.10.2021

# Coding principles

## Status

accepted

## Context

Despite all previous standards and rules we also wanted to introduce some more general things which could describe the good programming habits which we always should use. We already tried to describe these values and principles. But right now we are doing it in a more structured way.

Let’s turn back to the coding issues. The front end wants to have a few more exclusive rules.

These are the following:
- Don’t add unneeded context
- Functions should do one thing - single responsibility principle
- Function names should say what they do (regarding the “naming-convention” page)
- Favour [functional programming over imperative programming](https://github.com/getify/Functional-Light-JS)
- Prefer [composition over inheritance](https://medium.com/humans-create-software/composition-over-inheritance-cb6f88070205)
- Use language features that are finalized and are already a part of ECMAScript standard - prefer to stick to [babel-env preset](https://babeljs.io/docs/en/babel-preset-env/)
- Have a good reason if you want to use any of the [ECMAScript proposals](https://github.com/tc39/proposals) that are not a part of the standard yet

Without strict rules, we wouldn’t be able to develop our company on the market and the quality could be affected. Most of us are already familiar with mentioned topics and that’s even better because that puts you in the right direction.

## Decision

We believe that following these rules on a daily basis could help maintain the project code in the long term. As a company, we aim to maintain long term projects and not only startups so it suits our needs.

## Consequences

In the beginning, developers could feel overwhelmed by the number of information and standards. But when we try it a few times we could find common sense in it. 

This decision depends on the developers themselves b/c we want to work with people who want to constantly improve our standards and follow i.e. mentioned ECMAScript proposals in our work. 

Keeping our boilerplate code well maintained is one example of this.
