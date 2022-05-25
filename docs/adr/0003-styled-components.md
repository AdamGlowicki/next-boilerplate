> Date: 04.10.2021

# Styled components

## Status

accepted

## Context

When looking into the styling topics we can define few major styling strategies. Let’s take all of them as considered options:
- Sass styles
- CSS modules
- CSS with styled-components (CSS-in-JS)
- JSS

**SASS styles analyze**

Most of us are familiar with styling the application with the SASS or SCSS files. We need to admit that it’s very universal for every project. It simply allows us to migrate from legacy CSS to SASS in small steps rather than develop one big refactoring. It’s widely supported by style frameworks so we don’t need to worry about support. Using Bootstrap, Bulma or other tools is easy peasy in this case.

On the other side, we can talk about additional minimal configuration and maintaining the imports when dealing with the styles separately. Despite that, you have many features from the SASS you need to do few things on your own when choosing this way. The scope issues could exist, potential class name bugs or dealing with critical CSS.

**CSS modules analyze**

CSS modules could sound a bit tricky but it’s mostly about the scopes and variables defined in our stylesheets. The great thing here is we don’t need to handle styling conflicts since it renders classes at build time.

This solution has only one serious disadvantage (for us), to be honest. It requires additional configuration and builds tools. It’s not something that you install and go. Of course, it’s not a problem that is stopping us from using it. But we need to prepare really universal and easy to replace things in our tools. In our implementation, we need to add in each component `className`

**CSS with styled-components analyze**

Breaking implementation of mixing CSS and JS together. Very similar approach as in CSS modules but on steroids. We also have scoped styles for the component and in addition to that, we don’t have to use `clasName`. It feels like this library packs everything inside and just allow us to write the styles. The other features and concerns are just covered. You don’t need to configure webpack, you have support for SSR with critical CSS at that time. You can style by props and even create multiple themes.

Of course, if someone comes from writing plain CSS could get overwhelmed at the first meet with this library. Fortunately, documentation is well described here. The other big issue is the performance issue related to style caching. Since the class names are created on the build we can’t cache them efficiently.

**JSS analyze**

It’s a very similar approach to the styled-components. You can even build implementation on top of the JSS for styled-components by an official plugin. What’s different is that JSS is a smaller library which makes it a better choice if you treat performance as a top priority. In the other features, they are literally the same.

The one more difference between styled-components is that in the second library syntax in which we write the styles is more popular than the JSS syntax. But that’s really personal thing. 

What about the atomic CSS (don’t mislead with atomic design) feature?
It’s a really cool thing as I could read and it gives quite good arguments behind the implementation. It would be a great choice if we would use SCSS and won’t use CSS-in-JS for some reason. If you are curious about it you can check this:
https://sebastienlorber.com/atomic-css-in-js

More sources to read:
- https://css-tricks.com/a-thorough-analysis-of-css-in-js
- https://pustelto.com/blog/css-vs-css-in-js-perf/
- https://github.com/stereobooster/css-in-js-101 
- https://getstream.io/blog/styled-components-vs-css-stylesheets/ 

## Decision

As you probably noticed we described the styled-components as the best possible tool. That wasn’t intentional. This tool really suits our needs and we think that it helps to do the styles as fast as we can. Nothing can stop us during development and it actually works well in our projects.

If it ain't broke, don't fix it. Also, it means that for now, we don’t search for any other style library.

## Consequences

We want to make styling easy for everyone and we believe that picking the styled-components way is better than creating the whole implementation by ourselves. We have got everything packed in. You don’t have to learn new things again.

One negative thing comes from picking styled-components instead of JSS - bundle size. We are aware of that.
