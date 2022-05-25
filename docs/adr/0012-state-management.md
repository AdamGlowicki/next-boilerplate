> Date: 04.10.2021

# State management - redux

## Status

accepted

## Context

What is the issue that we're seeing that is motivating this decision or change?

We always need to store some data when creating our apps. Very often we need to access this data in various ways and sometimes even on many pages. In this case, we should consider a single place for this kind of data.

You can consider using react-query or contexts API for your particular case.

But the most universal way to handle that would definitely be the redux way. Redux delivers us exactly what we need on state management topics. It has a very developer-friendly API when using redux toolkit - which is our case btw. Also, it provides great devtools.

## Decision

For now, we decided to use redux combined with redux-toolkit. Of course on the project level, you can consider if you want to use react-query combined with the toolkit.
 
## Consequences

> Update: 06.10.2021

The only tricky part is to get how the HYDRATE works with SSR. In most cases, you just need to replace the hydrated state, in just a few others you would need to use diff to check something. But when you need to search for some specific value in some nested data you know that you are doing something wrong.

> Date: 04.10.2021

Keeping the global state with redux for an app is super easy. You have access by selectors and you can put the new data by reducers divided by features structure after dispatching an action.

When using redux we will meet some elements which structurize the state. They are described in detail below:
​​https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers 
https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns 

That was a vocabulary used in the redux. When using redux-toolkit we will get almost the same names but with a bit different usage. It’s worth checking it here: https://redux-toolkit.js.org/usage/usage-guide  

When you are already familiar with redux. We can also present a few of our principles while working with these tools.

* Actions associated with sending an HTTP request to the backend API should have:
    - Prefix based on HTTP method or model interaction (CRUD):
      - Fetch/Get -> GET
      - Create -> POST
      - Update -> PUT/PATCH
      - Delete -> DELETE
      - Upload -> file upload with different content type
    - Suffix based on action status:
      - Request - before sending a request
      - Success - on request success
      - Failure - on request error

  If using Redux Toolkit, just use the actions automatically created by the createAsyncThunk helper instead of manually creating the actions with the suffixes.

  **Action module namespace**

  In Redux all actions go through one central store (as opposed to Flux where we have multiple stores) and they must be unique. Departing from the norm is a common mistake, which leads to a situation where we are not able to identify different actions across domains. 

  This may cause errors and makes debugging truly hard. The solution for this issue is quite simple and very easy to implement – add a prefix to each of the action types and make them unique in the whole application. The prefix should be considered as domain namespace.

* Reducers
  - Take advantage of Redux Toolkit and just “mutate” the state in the reducers (Immer is used under the hood to maintain immutability). No need to rely on multi-level spreading or libraries like Immutable.js anymore.

* Selectors
  - Always write selectors, even for the smallest data portions
  - Use reselect library for caching and performance (already included in Redux Toolkit - createSelector)


When you decide to store large amounts of data in the redux i.e. admin dashboard data you also can consider normalizing the redux store according to this doc link:

https://redux.js.org/usage/structuring-reducers/normalizing-state-shape. This library https://github.com/paularmstrong/normalizr could also help in this area.
