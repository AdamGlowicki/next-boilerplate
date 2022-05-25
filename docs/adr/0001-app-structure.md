> Date: 4.10.2021

# App structure

## Status

Accepted

## Context

The company is creating many apps for various clients. The easy to use and ready to adapt patterns is something required in this case. Projects need to be bootstrapped in the fastest way possible without inventing the same thing over again. Keeping the app structured and the same in every project allows that. 

We don’t have to blame other developers for the inconvenience structure because everyone should stick to the same pattern. In that case, introducing a new developer into an ongoing project is easier because we should be already familiar with the structure. That reduces our cost and time because developers need to know some project-specific solutions.

A structured project means at least half the job done since we don’t need to ask the same questions over again. Inventing structure per project is time-consuming.

About the structure. We considered other options on how to keep the components of a feature but storing them inside kinda blocked us from nesting in components again (which sometimes happens). That could look like a mistake and be unreadable from a dev perspective.

Elements used in the feature’s main component are kept at the same level in the folder with the component’s name at the moment. You can nest components used in said components inside. This will allow us to maintain a clean structure and know where the component is used, as well as keep the root folder number relatively small. 

It might be worthwhile to deal with exports properly from the index.ts files. They should export mostly the main components, but you can also export the types there.

The api.ts file from the root level of the feature is also an important thing to mention here. It should export an object with endpoints, used to communicate with the actual API. It can be used in the components or thunks.

## Decision

Proper app structure should looks like following:

```
App
-> Features
	-> Our feature name
    -> interfaces
    -> store 
        -> reducer
        -> actions
        -> selectors
    -> helpers
    -> api.ts
    -> MainFeatureComponent.tsx
    -> index.tsx (with MainFeatureComponent export)
    -> NamedComponent
        -> PotentialNestedComponent
            -> PotentialNestedComponent.tsx
            -> index.tsx (with PotentialNestedComponent export)
        -> NamedComponent.tsx
        -> index.tsx (with NamedComponent export)
    -> … (other components used in this feature)
-> Core (globally used things)
	-> components
	-> interfaces
	-> store
	-> hooks
	-> …
-> Themes
-> Utils
```

It’s worth mentioning that this structure could be adjusted for the project needs but basically, if you don’t have any strong arguments to integrate into that then just adapt to the presented option.

Just to clarify we would expand this example structure. 
- In the `features` we should keep bigger chunks of our app i.e. Auth, Category, Product, ProductList, Sidebar, Dashboard etc. It should allow splitting the main elements
  - Interfaces inside features keep feature scoped types only
  - The store keeps feature scoped files with only one object key to keep the HYDRATE easy.
  - Helpers are the functions that are used in many components and we need some global place for it
  - Api.ts file keeps routes API used in such feature. It could be the route used in redux action or in the component or page
  - MainFeatureComponent is a root component for a feature also for every component we could have a styled file that keeps styles for that component
  - Main index exports only the root component
  - NamedComponent is a component used in MainFeatureComponent and we could have more than one component here. 
    - PotentialNestedComponent is a component used in NamedComponent only
      - Index on this level exports only PotentialNestedComponent elements
    - NamedComponent is a child component
    - Index on this level exports only NamedComponent elements
- In the `core` we should use global elements, interfaces or when it is really generic like Layout component and so on. They could be imported in any place of application. Also, we should keep here all other React-based stuff
- In the `themes` we should keep files related to theming and global styling of our component
- In the `utils` directory, we should keep all methods, functions and things written in plain JS. For example like we have right now utils for manage JWT tokens.


## Consequences

Decided to split the app by features because it seems to be the easier way to split over functionalities or some features and put it in one place. We are not repeating ourselves and the only issue with this structure is that it can look tricky when used with atomic design. For now, it suits our needs and we are not that perfect in indicating our domain by app structure.
