**Grenadier is an opinionated, full-stack, serverless web application framework
that will allow you to build and deploy JAMstack applications with ease.**
Imagine a React frontend, statically delivered by CDN, that talks via GraphQL to
your backend running on AWS Lambdas around the world, all deployable with just a
`git push`—that's Grenadier. By making a lot of decisions for you, Grenadier lets
you get to work on what makes your application special, instead of wasting
cycles choosing and re-choosing various technologies and configurations. Plus,
because Grenadier is a proper framework, you benefit from continued performance
and feature upgrades over time and with minimum effort.

> **WARNING:** Grenadier is still in the **alpha** phase of development. We do not
> recommend that you use Grenadier applications in production at this time. That said,
> your input can have a huge impact during this period, and we welcome your feedback
> and ideas! Check out the [Grenadier Community
> Forum](https://community.grenadierjs.web.app/) to join in.

> **TUTORIAL:** The best way to get to know Grenadier is by going through the extensive
> [Grenadier Tutorial](https://grenadierjs.web.app/tutorial). Have fun!

**EXAMPLES:** If you'd like to see some examples of what a Grenadier application looks
like, take a look at the following projects:

-   [Todo](https://github.com/grenadierjs/example-todo)
-   [Blog](https://github.com/grenadierjs/example-blog)
-   [Invoice](https://github.com/grenadierjs/example-invoice)

## Technologies
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FGrenadierJS%2Fgrenadier.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FGrenadierJS%2Fgrenadier?ref=badge_shield)


We are obsessed with developer experience and eliminating as much boilerplate as
possible. Where existing libraries elegantly solve our problems, we use them;
where they don't, we write our own solutions. The end result is a JavaScript
development experience you can fall in love with!

Here's a quick taste of the technologies a standard Grenadier application will
use:

-   [React](https://reactjs.org/)
-   [GraphQL](https://graphql.org/) ([Apollo](https://github.com/apollographql))
-   [Prisma](https://www.prisma.io/)
-   [Jest](https://jestjs.io/) (coming soon)
-   [Storybook](https://storybook.js.org/) (coming soon)
-   [Babel](https://babeljs.io/)
-   [Webpack](https://webpack.js.org/)

## Features

-   Opinionated defaults for formatting, file organization, webpack, Babel, and more.
-   Simple but powerful routing (all routes defined in one file) with dynamic (typed) parameters, constraints, and named route functions (to generate correct URLs).
-   Automatic page-based code-splitting.
-   Boilerplate-less GraphQL API construction.
-   Cells: a declarative way to fetch data from the backend API.
-   Generators for pages, layouts, cells, SDL, services, etc.
-   Scaffold generator for CRUD operations around a specific DB table.
-   Forms with easy client- and/or server-side validation and error handling.
-   [Hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR) for faster development.
-   Database migrations (via Prisma 2).
-   First class JAMstack-style deployment to [Netlify](https://www.netlify.com/).

## The Grenadier philosophy

Grenadier believes that [JAMstack](https://jamstack.org/) is a huge leap forward in how we can write web
applications that are easy to write, deploy, scale, and maintain.

Grenadier believes that there is power in standards, and makes decisions for you
about which technologies to use, how to organize your code into files, and how to
name things. With a shared understanding of the Grenadier conventions, a developer
should be able to jump into any Grenadier application and get up to speed very
quickly.

Grenadier believes that traditional, relational databases like PostgreSQL and
MySQL are still the workhorses of today's web applications and should be first-class
citizens. However, Grenadier also shines with NoSQL databases.

Grenadier believes that, as much as possible, you should be able to operate in a
serverless mindset and deploy to a generic computational grid. This helps unlock
the next point...

Grenadier believes that deployment and scaling should be super easy. To deploy
your application, you should only need to commit and push to your Git
repository. To scale from zero to thousands of users should not require your
intervention. The principles of JAMstack and serverless make this possible.

Grenadier believes that it should be equally useful for writing both simple, toy
applications and complex, mission-critical applications. In addition, it should
require very little operational work to grow your app from the former to the
latter.

Grenadier believes that you can use JavaScript as your primary language on both
the frontend and backend. Using a single language simplifies everything
from code reuse to hiring developers.

## How it works

A Grenadier application is split into two parts: a frontend and a backend. This is
represented as two node projects within a single monorepo. We use [NPM](https://docs.npmjs.com/) to make
it easy to operate across both projects while keeping them in a single
Git repository.

The frontend project is called `web` and the backend project is called `api`.
For clarity, we will refer to these in prose as "sides", i.e. the "web side" and
the "api side". They are separate projects because code on the web side will end
up running in the user's browser while code on the api side will run on a server
somewhere. It is important that you keep this distinction clear in your mind as
you develop your application. The two separate projects are intended to make
this obvious. In addition, separate projects allow for different dependencies
and build processes for each project.

The api side is an implementation of a GraphQL API. Your business logic is
organized into "services" that represent their own internal API and can be
called both from external GraphQL requests and other internal services. Grenadier
can automatically connect your internal services with Apollo, reducing the
amount of boilerplate you have to write. Your services can interact with a
database via Prisma's ORM, and Prisma's migration tooling provides first-class
migrations that take the pain out of evolving your database schema.

The web side is built with React. Grenadier's router makes it simple to map URL
paths to React "Page" components (and automatically code-split your app on each
route). Pages may contain a "Layout" component to wrap content. They also
contain "Cells" and regular React components. Cells allow you to declaratively
manage the lifecycle of a component that fetches and displays data. Other
Grenadier utility components make it trivial to implement smart forms and various
common needs. An ideal development flow starts with Storybook entries and Jest
tests, so Grenadier closely integrates both, making it easy to do the right thing.

You'll notice that the web side is called "web" and not "frontend". This is
because Grenadier conceives of a world where you may have other sides like
"mobile", "desktop", "cli", etc., all consuming the same GraphQL API and living
in the same monorepo.

## How can it be serverless if it involves a GraphQL API and database?

I'm glad you asked! Currently, Grenadier can deploy your GraphQL API to a Lambda
function. This is not appropriate for all use cases, but on hosting providers
like Netlify, it makes deployment a breeze. As time goes on, "functions" will
continue to enjoy performance improvements which will further increase the
number of use cases that can take advantage of this technology.

Databases are a little trickier, especially the traditional relational ones
like PostgreSQL and MySQL. Right now, you still need to set these up manually,
but we are working hard with Netlify and other providers to fulfill the
serverless dream here too.

Grenadier is intentionally pushing the boundaries of what's possible with
JAMstack. In fact, the whole reason I (Tom) started working on Grenadier is
because of a tweet I posted some time ago:


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FGrenadierJS%2Fgrenadier.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FGrenadierJS%2Fgrenadier?ref=badge_large)