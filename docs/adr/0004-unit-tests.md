> Date: 04.10.2021

# Unit tests

## Status

proposed

## Context

This decision is necessary for us to include unit tests in projects on both development and business levels. We want to show that the company is ready to do it, and it’s not a barrier of being unable to estimate the time needed.

We think that writing tests is an additional measure of security and will actually save time in the long run, for example by preventing some production bugs. By adding this, we will be able to support the long-term projects better.
The provided additions will serve as an example on how to start with unit tests. We’ve also prepared some mocks for the modules we use, like Axios or the store, that will allow for even more efficient tests.

You can view the presentation about unit tests here:
[https://docs.google.com/presentation/d/1-vamiX2piwBScmziu_Vf10PyeNYf_ScTufsyVL9_ikQ/edit?usp=sharing ]().

---

> Date: 20.12.2021r

### next-router-mock

During development on one project, we forced problem with testing routes in application. When running tests on components that were using `useRouter` hook, jest was showing an error that return cannot read properties of `null` (returned value from `useRouter`).

We have looking for many solutions to this problem, but dependency [next-router-mock](https://github.com/scottrippey/next-router-mock) seems the best one. It's very simple, and provides quite a lot of interesting features. For example, we can `setCurrentUrl` in test-case to render component with specific URL (in case that our component is using query params for fetching). Or we can check if clicking on element changes path in browser.

File `__mocks__/next-router.ts` was created to provide all needed imports, `jest.mocks` and export of default library object. Also, it comes with mocked `router.back()` function which is not available in `next-router-mock` library. Usage is quite simple.

```tsx
import mockRouter from 'mocks/next-router';

it('displays spinner when fetching data', () => {
  mockRouter.setCurrentUrl('/crypto/bitcoin');
  render(<SearchResults />);
  //...
  expect(mockRouter).toMatchObject({
    asPath: '/crypto/bitcoin',
    pathname: '/crypto/bitcoin',
  });
  //...
  expect(mockRouter.back).toBeCalledTimes(1);
});
```

Thanks to `mockRouter` we can change URL and component `SearchResults` can read `search` query and perform some actions.

This library is mentioned in [Next.js documentation](https://nextjs.org/docs/testing#community-packages-and-examples).

### test-utils export

We also added one line in `__tests__/utils.jsx` that provides export of all functions from `@testing-library/dom`. Thanks to that we don't have to import `render` from utils and `screen` from mentioned dependency. All imports are from `tests/utils`.

### @testing-library/user-event

Last thing is `user-event` dependency from `testing-library`. It should be standard library to test user actions like click, dbclick, type etc. Is much simpler and clearer then `fireEvent`.

## Decision

The decision is an official start for unit tests. The choice of the library was pretty obvious, as it’s the most popular open-source combination for unit testing React code (also it’s easy to bootstrap). It guarantees good support going forward and potentially lack of problems with maintaining the tests.


## Consequences

> Date: 22.12.2021r.

To fully get the context of this issue, you should read [this thread on MR](https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/merge_requests/40#note_759806207).

After that, you may understand the pattern here. We decided to store multiple tests files from same directory under the dedicaded `__tests__` directory. The example below should also be helpful:

Example before:
```
- directory
    -> fileA.ts
    -> fileA.test.ts
    -> fileB.ts
    -> fileB.test.ts
    ...
```

Example now:
```
- directory
  - __tests__
      -> fileA.tests.ts
      -> fileB.tests.ts
  -> fileA.ts
  -> fileB.ts
```

Of course, in the case when you are writing a single test for your component, you don't have to worry about that. The `utils` or redux files from the same directory should first come to your mind if you wonder where it could be useful.

> Date: 04.10.2021

We’re aware that starting with unit tests might be difficult. They might slow down the development at first, and the developers will need to get used to actually writing them. That being said, we still want to go this way to improve the quality of our code.

We prepared a few examples of good and bad practices for unit tests that developers should follow.

What to test:

- It must render

  At the very least, make sure the component renders without error. This verifies there are no JSX syntax errors, that all variables are defined, etc. This could be as simple as verifying that the rendered output is not null.
- Test the output

  One step above “it renders” is “it renders the correct thing.” Given a set of props, what output is expected? Does Person render its name and age, or does it render a name and “TODO: age coming in v2.1”?
- Test the states

  Every conditional should be accounted for. If the classNames are conditional (enabled/disabled, success/warning/error, etc.), make sure to test that the className-deciding logic is working right. Likewise for conditionally-rendered children: if a Logout button is only visible when the user is logged in, for instance, make sure to test for that.
- Test the events

  If the component can be interacted with (an input or button with an onClick or onChange or onAnything), test that the events work as expected and call the specified functions with the correct arguments (including binding this, if it matters).
- Test the edge cases

  Anything that operates on an array could have boundary cases — an empty array, an array with 1 element, a paginated list that should truncate at 25 items, and so on. Try out every edge case you can think of, and make sure they all work correctly.
- If still don’t know…

  How do you manually test the code you wrote?

  Break it down into steps and describe it by writing tests.


**What not to test:**

- Third-party libraries
  
  Is not our responsibility to test how components and functions from other libraries behave
- Implementation details
  
  Write test simulate steps like user do on application and check the effects by  DOM state. For example, check if form validation messages show in DOM than checking if errors object has attributes.

  Think less about the code you are testing and more about the use cases that code supports.
- Avoid snapshot testing
  
  Snapshot testing helps to detect if the render of the component has been changed. That means, any changes like adding a new element, change static text make our tests failed, nothing more. To fix that, we can easily update our snapshot. For that reason, snapshot testing doesn't give us a sure, if our component works properly.

  Another problem with snapshot testing is creating a new file for each snapshot, which grows our codebase quickly.
  
  Also, snapshot testing forces us to manually checking if render effects are what we expected. This is boring, manual work.
