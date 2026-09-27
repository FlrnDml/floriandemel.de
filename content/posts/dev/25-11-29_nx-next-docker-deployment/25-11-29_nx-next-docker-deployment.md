# How to Dockerize a Next.js App (2025)

## Introduction

In the last week, my team and I were working on a new setup of our Next.js app, and it was an annoying experience. It sometimes feels like Next.js's build functionality is designed to be overly complicated, pushing developers towards the Vercel deployment platform - while Vercel is also the creator of Next.js.

Nevertheless, we took the challenge and made it work for us. Today, I want to outline our findings.

You will learn:
- How to build an optimized Next.js server.
- How to make public files work with that build.
- How to package the build inside a Docker image.

## How we decided to deploy

There are multiple ways to build a Next.js app, either for a server runtime to support all features of Next.js, or for a static runtime with a limited feature set but without the need to operate a server. If you are unsure what this means, [read here first](https://nextjs.org/docs/pages/getting-started/deploying). 

We utilized the full feature set of Next.js and therefore need a server runtime. While Vercel, or any other kind of easily deployable adapter tooling sounds nice - [read here for more infos about adapters](https://nextjs.org/docs/pages/getting-started/deploying#adapters) - we are bound to Azure, which does not offer an easy solution for the moment. 

So we decided to build a Docker Image with our Next.js application and deploy it to a container runtime service, specifically Azure App Service.

## Build the Next.js app standalone

Our first step to build the Next.js app for a Docker container is a `standalone` build. You activate it by setting the `output` parameter in the `next.config.js` accordingly.

```js
// next.config.js
module.exports = {
  output: 'standalone',
}
```

After running `next build`, the `.next/standalone` folder of your project includes a simple `server.js` entrypoint together with a stripped-down `node_modules` folder including all your dependencies. The build is ready to run.

If you want to test it at this point, run:
```bash
node ./[...]/.next/standalone/server.js
```

## Add static resources

After building the standalone Next.js app, you might wonder why [public](https://nextjs.org/docs/pages/api-reference/file-conventions/public-folder) resources are not working. To fix it, you need to copy the `public` folder of your Next.js app to the `.next/standalone` build directory, together with the `.next/static` folder. 

```bash
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
```

*FYI: If you are working on a serious production-level build, you should consider a **CDN** at this point. Both the static Next.js build files (`.next/static`) and the public resources could also be distributed by a CDN as they do not include any server runtime.*

*Next.js supports splitting the server and the static files. For high-scaling applications, a CDN might be the better solution. We decided not to take this route to decrease complexity for our setup.*

At this point your build is ready, either to be used as-is, or to be packed into a container image.

## Building a Container Image

When following the official Next.js guide to **Dockerize Next.js**, you will come across a multi-stage container build, see [this documentation](https://nextjs.org/docs/pages/getting-started/deploying#docker).

In our opinion, this is often more complex than necessary, especially if your build process already runs on a CI/CD pipeline runner. The `standalone` output already includes the stripped-down `node_modules` and everything needed to run the application. A simpler, single-stage Dockerfile keeps things straightforward and easy to understand. It avoids duplicating the build process inside the container, which you have likely already run on your machine or in a pipeline.

This is how your `Dockerfile` could look like:

```Dockerfile
# Final production stage using a fixed Alpine Node image.
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

# Create only the non-root 'nextjs' user (and its default group, also named 'nextjs')
RUN adduser --system --uid 1001 nextjs

# --- IMPORTANT ASSUMPTION ---
# This single-stage Dockerfile relies on the following directories
# being present in the local build context (pre-built application):
# ./.next/standalone, ./.next/static, and ./public

# Copy standalone output (server.js, node_modules, traced files) and set ownership
# Ownership is now set to 'nextjs' user and its primary group (also 'nextjs')
COPY --chown=nextjs:nextjs ./.next/standalone ./
# Copy static assets (e.g., built JS, CSS files)
COPY --chown=nextjs:nextjs ./.next/static ./.next/static
# Copy public assets (e.g., favicon, robots.txt)
COPY --chown=nextjs:nextjs ./public ./public

# Switch to the non-root user
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the Next.js server
CMD ["node", "server.js"]
```

This `Dockerfile` already copies the public and static directories to the correct place. So you just need to build standalone before to use it.

## Wrap Up

And that's it! We have successfully built a production-ready Next.js application, packaged it into a simple, single-stage Docker image, and made sure all our static and public assets are included.

This approach is perfect for deploying to container runtimes like Azure App Service, Google Cloud Run, or AWS Fargate.

## About me

My name is Florian, I am a platform engineer who wants to share his dev experience with you, hoping it makes us all a bit smarter. Please let me know what you think about my post!

In case you want to see more of my posts, you can also find me on [X.com](https://x.com/FlrnDml), where I share all of my content + daily dev news.