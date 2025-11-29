# How to deploy and build a NextJS Docker container (2025)

## Introduction

In the last week, my team and I were working on a new setup of our NextJS app, and it couldn't be more annoying. Somehow it feels like NextJS's build and distribution functionality is designed to be to weird and complicated, so everyone must deploy it on Vercel's - NextJS developers - own platform.

Nevertheless we took the challenge and made it work for us. 
Today I want to outline our findings and experience for you.

You will learn:
- How to build an optimized NextJS server.
- How to make public files work with that build.
- How to package the build inside a docker image.

## How we decided to deploy

There are multiple ways to build a NextJS app, either for a server runtime to support all features of NextJS, or for a static runtime with a limited features set but without the need to operate a server. If you are unsure what this means, [read here first](https://nextjs.org/docs/pages/getting-started/deploying). 

We are utilized the full feature set of NextJS and therefor need a server runtime. While Vercel, or any other kind of easily deployable adapter tooling sound nice - [read here for more infos about adapters](https://nextjs.org/docs/pages/getting-started/deploying#adapters) - we are bound to Azure, which does not offer an easy solution for the moment. 

So we decided to build a Docker Image with our NextJS application and deploy it to a container runtime service, specifically Azure App Service.

## Build the NextJS app standalone

Out first step to build the NextJS app for a docker container is a `standalone` build. You activate it by setting the `output` parameter in the `next.config.js` accordingly.

```js
// next.config.js
module.exports = {
  output: 'standalone',
}
```

After running `next build`, the `.next/standalone` folder of your project includes a simple `server.js` entrypoint together with a stripped `node_modules` folder including all of your dependencies. The build is ready to run.

If you want to test it at this point, run:
```bash
node ./[...]/.next/standalone/server.js
```

## Add static resources

After building the standalone NextJS app, you might wonder why [public](https://nextjs.org/docs/pages/api-reference/file-conventions/public-folder) resource are not working. To fix it, you need to simply copy the `public` folder of your NextJS app to the `.next/standalone` build directory. Together with the `.next/static` folder. 

```bash
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
```

*FYI: If you are working on a serious production level build, you should consider a **CDN** at this point. Both, the static NextJS build files (`.next/static`) as well as the public resources could also be distributed by a CDN as they do not include any server runtime. NextJS support splitting the server and the static files. For high scaling application, a CDN might be the better solution. We decided to not take this route to decrease complexity for our setup.*

At this point your build is ready, either to be used like it is. Or to pack it into a container image.

## Building a Container Image

When following the NextJS guide to a Docker deployment you will come across a multiple stage container build, see [this documentation](https://nextjs.org/docs/pages/getting-started/deploying#docker).

In our opinion this is not needed. The standalone build runs as quickly on our machine or a CI pipeline runner and it includes all stripped `node_modules` out of the box.

This is how your `Dockerfile` could look like:

```Dockerfile
# Final production stage using latest Alpine Node image. Keep a fixed version.
FROM node:latest-alpine
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