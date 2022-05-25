> Date: 04.10.2021

# Forms libraries

## Status

accepted

## Context
We used to use Redux-form in the past, we had some performance issues due to its architecture and the library became deprecated itself. We performed research, gathered a few libraries - initially included:
  - React Final Forms
  - Formik
  - Hook form
  - React-form
  - Formz
  - Kendo-react

Then picked 3 best choices (in our opinion) that we compared by api, composition, bundle size, popularity, number of issues and frequency of updates. We included React Final Forms, Formik and Hook Form. The comparison was done in the middle of March 2021.

|                        | react-final-form                  | react-hook-form | formik                                      |
|------------------------|-----------------------------------|-----------------|---------------------------------------------|
| composition            | self: 96.4%, @babel/runtime: 3,6% | self: 100%      | self: 48,6%, lodash-es: 41,9%, others: 9,5% |
| bundle size (minified) | 8.9kb                             | 26.4kb          | 44.4kb                                      |
| stars                  | 6,316                             | 18,029          | 26,337                                      |
| issues                 | 326                               | 10              | 588                                         |
| updated                | Feb 4, 2021                       | Feb 17, 2021    | Feb 15, 2021                                |


When we compared the APIs and discussed our experiences - we quickly focused on hook form and formik. The APIs were looking really good and we had much bigger experience using formik and react-hook-form, so we decided to exclude react-final-form. When we checked the popularity and the number of downloads the winner was formik with almost 2 times more downloads. What’s worth mentioning is that the amount of open issues is way higher when for formik.

The last thing we wanted to check was bundle size and performance. The bundle size of the hook form is much lower and it has 0 dependencies (9 for Formik). When comparing performance we checked the number of rerenders in a basic form and mounting time. The Hook form was much quicker and much smaller, a more detailed comparison can be found [here](https://blog.logrocket.com/react-hook-form-vs-formik-comparison/).

## Decision

When we listed all the pros and cons of Formik and Hook form we decided that the libraries are quite similar to each other, they both have good APIS with solid docs and they both cover the majority of the use cases in our projects. 
The factor that tipped the scale was clearly the performance of the Hook form - avoiding unnecessary rerenders should be our way to go, so the decision couldn’t be different - React Hook Form.

## Consequences

We should be using React Hook Form in our project unless we have a good reason not to do so. Of course we are aware that none of the libraries are perfect so there may be cases where Hook form would be a worse choice - such cases should be treated and discussed separately.
