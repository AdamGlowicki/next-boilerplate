> Date: 04.10.2021

# Built in utils

## Status

accepted

## Context

**Update: 05.01.2022**

New built-in utils comes with react-intl implementation:

- useLocaleRedirect  
  
  This hook is solution to keep information about locale when next-auth is redirecting to provided pages (error, signIn, signOut). Here is PR that will provide in the future (we hope) built-in solution to that. Now we have to use this hook on default pages + pass `nextLocale` prop (you can find example in `pages/login.tsx`).

- isLocaleRTL

  The function provides information whether the transferred language is a language written from right to left. Inside function you can find list of all languages that are RTL. Function supports also more specific formats, ex. Arabic - `ar` or Arabic (United Arab Emirates) - `ar-AE`.

- useTheme

  Hook is merging custom theme of application with direction property based on locale provided by Next Router.

- importLocaleMessages

  Used when we want to do the asynchronous import messages to the page. It is usefull when fetching things on the SSR. By doing that we have rendered page content in the source whchi is friendly for SEO.

**Update: 26.10.2021**

New built-in utils comes with next-auth implementation:

- serverSideRequest
  
  Proxy for our standard requests when dealing with authenticated requests on the server-side. It allows us to get a user-defined response without setting it on the server-side. We don’t want to keep any user-specific data on the SSR due to potential session leak problems. It’s user agnostic place.

- useAuthenticatedSession

  Useful when we want to operate on the client-side with authenticated users on the mount. We are waiting for the session from next-auth and after that our custom method is run.

- pageHelpers
	
  Reusable helpers for things like getting the user from the session/page context.


**Date: 04.10.2021**

To bootstrap even more efficiently we prepared some universal methods or modules ready to use. From experience gained across many projects, we know that they are used in almost every project. But we should keep in mind that things like that should be done with caution, especially on the template level.

Here is a list of helpers prepared by us with a short description:

- Case-converter (https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/blob/master/app/utils/case-converter.ts)

  It’s used to “translate” the payload and request body received and sent to our backend since when creating API you prefer to use snake-case.

- General helpers (https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/blob/master/app/utils/helpers.ts)
  
  Here we added some base methods that could be used on daily basis. This is also a place where we can put our custom methods

- JWT (https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/blob/master/app/utils/jwt.ts) 
  
  Universal helpers to check tokens provided by our backend

- Request (https://gitlab.com/merixstudio/pts/nextjs-boilerplate/-/blob/master/app/utils/request.ts)

  The base singleton instance for making requests in your application. Developer should always use it underneath instead of raw Axios/HttpClient requests. Interceptors are created especially for our backend and they support request retry after refreshing the token when outdated and they convert to proper case the data and the response of the request

## Decision

Only selected helpers were introduced into the boilerplate to avoid an unnecessary amount of code stored in the template. We don’t want to end up with a wrapper for everything that we wrote.

## Consequences

They could save a lot of time when working with the backend provided by our company. But the things can get complicated when we need to integrate with some 3rd company API when we don’t want to case convert the data or params.

Introducing too many wrappers or helpers to hide some logic behind could be tricky on the boilerplate level. It’s an easy way to end up with very big and generic wrappers for things that could be simple even when repeated.
