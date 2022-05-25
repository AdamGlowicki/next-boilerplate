> Date: 31.12.2021

# Internationalization

## Status

accepted

## Context

In many projects, we see the need to implement translation and localization features. Configuring all needed libraries and providers can be time-consuming. That said, we started research to find a library that will cover all our needs. Top three libraries for handling translations with Next.js as core are:

- [react-intl](https://formatjs.io/docs/getting-started/installation/)
- [next-i18next](https://github.com/isaachinman/next-i18next)
- [react-i18next](https://www.npmjs.com/package/react-i18next) + [i18next](https://www.npmjs.com/package/i18next)

We compared these libraries by API, composition, bundle size, popularity, number of issues and frequency of updates.

|                                 | react-intl                                            | next-i18next | react-i18next + i18next |
|---------------------------------|-------------------------------------------------------|--------------|-------------------------|
| composition                     | @formatjs (3 libs): 62.3%, self: 10.1%, others: 27.6% | self: 100%   | self: ~85%, others: 15% |
| bundle size (minified)          | 56.6kb                                                | 79.4kb       | 74.7kb                  |
| bundle size (minified + gziped) | 16.2kb                                                | 21.1kb       | 20.8kb                  |
| stars                           | 12,906                                                | 2,851        | 5,987                   |
| issues                          | 3                                                     | 16           | 3                       |
| updated                         | Dec 12, 2021                                          | Dec 30, 2021 | Dec 28, 2021            |

We can see in the table above that `react-intl` library is the smallest in the bundle and the most popular but depends on external libraries. The reason for this is that the library `react-intl` belongs to the `@formatjs` family. `react-intl` is direct implementation just for React framework.

But what do we exactly need from this type of library? The point is that just translating strings to other languages is not enough. We should remember of differences in languages in:

- currencies
- numbers
- dates and time
- plurals

These things are essential if we want to implement translation and internationalization – and this should be our goal in every project. Only two libraries from the list above can do such a thing: `react-intl` and `i18next`. So we will focus only on these two.

The next things that we are demanding are:

- simplicity for implementing and using
- basic knowledge about library among developers
- support for RTL, SSR, etc.
- compatibility with Next.js internationalized routing

Reading documentation of `i18next` we have noticed that this library seems quite complicated and not so dev-friendly. While creating simple translations is simple, doing more complex things seems unnecessarily complicated. The next con of `i18next` is the built-in lack of compatibility with Next.js. To achieve this, we would have to install a third library – `next-i18next`. That's too much.

## Decision

Considering all pros and cons of these two libraries, we decided to go with `react-intl`. This library seems to have all things that we need at the moment. Besides, many of our developers worked before with this dependency, so it's a huge plus.

## Consequences

> Date: 15.04.2022r

**Translations managed by frontend**

After you decide to use react-intl in your project you also decide to use JSON files with translations in the repository. This is a trade-off for frontend based translations. Introducing the react-intl equals the decision that the frontend is responsible for translations on the website. You have to maintain those files now.

What we are trying to say is that you could dive into one of a few dilemmas:
1. You could close for any integration with the translation system from/on the backend. Now you have your own frontend system.
2. Backend translations are independent of the frontend and vice versa. It means a few sources of translations.
3. It could be hard to create util to synchronize the translation from backend to frontend. For example, fetch it before building and save the JSON file in the proper path. That approach is just not a goal here (If that's your case then you should consider switching off react-intl).

All of those consequences could be fine for you if you consult and think about them before the project starts.

**File format**

A bit connected with the above issues. Deciding to use JSON format to keep translation files. One of the official extensions for translations is the `.PO`. JSON could be less popular outside the frontend world when it comes to keeping the translations in one place i.e. for clients to translate.

That could be a case when you want to use some translation tool:
- [https://poedit.net/](https://poedit.net/) - it's free but supports only `.PO` files
- [https://poeditor.com/](https://poeditor.com/) - supports many extensions but it's paid

> Date: 31.12.2021r.

We should use `react-intl` in projects that require internationalization.

### Translation process

Extracted folder: Contains files in all supported locales in the application. Only one file (default language) is generated **automatically** by `yarn intl:extract` task. This command looks through all components and extracts default messages and descriptions into this one file. Other files with translations need to be created manually.

Compiled folder: This folder contains files with the same names as in an extracted folder, but these files are ready to use by `IntlProvider` without any further actions. These files **should not** be edited manually. All edits should be done in `extracted` folder and later compiled by `yarn intl:compile` task.

1. In all components, use proper components/functions to create default messages in a default language
2. Extract all these messages into JSON file using `yarn intl:extract`, the file will be created in `app/lang/extracted`
3. Duplicate this file (with a new name – language code) and translate it
4. When all translations are ready, run `yarn intl:compile`. `react-intl` do compilation of `extracted` folder
5. Translations are ready to use

### Deployment

We only need to ensure that all languages defined in `next.config.js` (i18n/locales) are available in the `app/lang/extracted` folder in the deployment phase. The `build` task will run the compilation process.
