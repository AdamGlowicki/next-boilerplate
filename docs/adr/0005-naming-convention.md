> Date: 04.10.2021

# Naming convention

## Status

accepted

## Context

Let’s show it in the examples and we should get why we need that. Basically, the idea is to create reliable and simple component names. This convention should help us to achieve that.

```
[Domain/Product][Page/Context]ComponentName[Type]
```

> Parts surrounded by “[]” are optional

**Domain or Product**

If we ask which product owns this component we should know if we even should contain this part. The domain basically refers to the product scope. In our cases it happens rarely - we often have one product and it’s our project. In that case, we are omitting this part.

**Page or Context**

In case when we know that our piece of code doesn’t have any parents and we know that it belongs as a page. 

**Component**

The name of the component refers to its responsibilities. For example, we can ask questions like:
- What does this component do?
- Which elements is it containing?
- Which part of the page is it?

The Sidebar component is a Sidebar.

The ACommunityAddToShortListButton is a button component of ACommunity responsible for adding profiles to a shortlist.

The ChatConversationName component is only responsible for displaying the name of a chat conversation.

For the component props or inputs/outputs we should also be aware of this convenience:
- Boolean props start with: is, has, can
- Callback props start with: on, handle

## Decision

This decision is crucial to keep the projects clean and maintainable. Of course, additional rules on the project level are allowed but they should be described in separate ADR.

## Consequences

When we structure the code like presented above we are doing our best to deliver the best quality of our work. The other developers could gain from well-described component names and we can introduce others easily.

We need to remember that naming things in the right way could be demanding. Sometimes it would require to spent a moment to invent the best component name (that’s a disadvantage)
