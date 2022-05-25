> Date: 10.12.2021

# Sentry integration with Next.js

## Status

Proposed

## Context

Previously, no standard way to integrate with Sentry was provided out of the box. Every project needed to configure everything themselves, facing the same problems (like how to handle uploading sourcemaps) every time a new project was started.

## Decision

We've decided to unify the approach and provide an out of the box solution. We think that this should not be something to implement from scratch every time, but just a matter of providing a few environment variables.

We're using a `@sentry/nextjs` package, which makes it easier to integrate Sentry with Next.js, both on the client and server-side.

Our new setup provides these things configured by default:
- Source maps - they will be automatically uploaded to Sentry every time `next build` runs. All .map files will then be removed by the post-build.js script.
- Release ID - all Sentry events will be tied to a specific release. The ID will be the hash of the last commit.
- Environment  - all Sentry events will be tied to a specific environment passed in via environment variables.
- No events will be emitted on local environments. If you still need to do that for some reason, you can control it in the sentry.*.config.js files with the enabled field.

## Consequences

You will need to set up some environment variables - you can find more on how to do that [in this document](https://docs.google.com/document/d/1lvRsmK84w2Qr9bP4qIalG6JJZU-sS8tLOxgfuICmsEY).