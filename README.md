<div align="center">
  <h1 align="center"><a aria-label="Helsinki Events Monorepo" href="https://github.com/City-of-Helsinki/events-helsinki-monorepo">Helsinki Events Monorepo</a></h1>
  <p align="center"><strong>A monorepo for event-search based nextjs applications and common event components</strong></p>
</div>
<p align="center">
  <a aria-label="Build" href="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions">
    <img alt="build" src="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions/workflows/ci-hobbies-helsinki-staging.yml/badge.svg?label=CI&logo=github&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Build" href="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions">
    <img alt="build" src="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions/workflows/ci-events-helsinki-staging.yml/badge.svg?label=CI&logo=github&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Build" href="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions">
    <img alt="build" src="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions/workflows/ci-sports-helsinki-staging.yml/badge.svg?label=CI&logo=github&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Build" href="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions">
    <img alt="build" src="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions/workflows/ci-proxy-events-graphql-router-staging.yml/badge.svg?label=CI&logo=github&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Codacy grade" href="https://www.codacy.com/gh/City-of-Helsinki/events-helsinki-monorepo/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=City-of-Helsinki/events-helsinki-monorepo&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy grade" src="https://img.shields.io/codacy/grade/dff9c944af284a0fad4e165eb1727467?logo=codacy&style=flat-square&labelColor=000&label=Codacy">
  </a>
  <a aria-label="LoC">  
    <img alt="LoC" src="https://img.shields.io/tokei/lines/github/City-of-Helsinki/events-helsinki-monorepo?style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Top language" href="https://github.com/City-of-Helsinki/events-helsinki-monorepo/search?l=typescript">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/City-of-Helsinki/events-helsinki-monorepo?style=flat-square&labelColor=000&color=blue">
  </a>
  <a aria-label="Licence" href="https://github.com/City-of-Helsinki/events-helsinki-monorepo/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/github/license/City-of-Helsinki/events-helsinki-monorepo?style=flat-quare&labelColor=000000" />
  </a>
</p>

> Howtos for monorepo. New to monorepos ? [check this FAQ](./docs/howto/how-to.md).

## Structure

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/City-of-Helsinki/events-helsinki-monorepo)

```
.
├── proxies
│   └── events-graphql-federation (Apollo Router and Gateway)
│
├── apps
│   ├── hobbies-helsinki  (i18n, ssr, api, jest)
│   ├── events-helsinki   ("clone of hobbies-helsinki")
│   └── sports-helsinki   ("clone of hobbies-helsinki")
└── packages
    ├── common-i18n         (locales...)
    ├── components          (common event components, utils and hooks, storybook, jest)
    └── eslint-config-bases (to shared eslint configs)
```

#### Proxies

- [proxies/events-graphql-federation](./proxies/events-graphql-federation): The Apollo Router and Gateway configuration to manage and run subgraphs. [README](./proxies/events-graphql-federation/README.md)

#### Apps

- [apps/hobbies-helsinki](./apps/hobbies-helsinki): SSR, i18n, sass, graphQL, rest... [README](./apps/hobbies-helsinki/README.md) | [DEMO](https://harrastukset.test.kuva.hel.ninja) | [CHANGELOG](./apps/hobbies-helsinki/CHANGELOG.md)
- [apps/events-helsinki](./apps/events-helsinki): Clone of Hobbies (SSR, i18n, sass, graphQL, rest...) [README](./apps/events-helsinki/README.md) | [DEMO](https://tapahtumat-mono.test.kuva.hel.ninja) | [CHANGELOG](./apps/events-helsinki/CHANGELOG.md)
- [apps/sports-helsinki](./apps/sports-helsinki): Clone of Hobbies (SSR, i18n, sass, graphQL, rest...) [README](./apps/sports-helsinki/README.md) | [DEMO](https://liikunta-mono.test.kuva.hel.ninja) | [CHANGELOG](./apps/sports-helsinki/CHANGELOG.md)

> Apps should not depend on apps, they can depend on packages

#### Shared packages

- [packages/eslint-config-bases](./packages/eslint-config-bases): [README](./packages/eslint-config-bases/README.md) | [CHANGELOG](./packages/eslint-config-bases/CHANGELOG.md)
- [packages/components](./packages/components): publishable. [README](./packages/components/README.md) | [CHANGELOG](./packages/components/CHANGELOG.md)
- [packages/common-i18n](./packages/common-i18n): [README](./packages/common-i18n/README.md) | [CHANGELOG](./packages/common-i18n/CHANGELOG.md)

> Apps can depend on packages, packages can depend on each others...

#### Shared static assets

If needed static resources like **images**,... can be shared by using symlinks in the repo.

- See the global [static](./static) folder.

#### Folder overview

<details>
<summary>Detailed folder structure</summary>

```
.
├── proxies
│   └── events-graphql-federation (Apollo Router and Gateway)
│
├── apps
│   └── hobbies-helsinki         (NextJS app with api-routes)
│       ├── public/
│       │   ├── shared-assets/   (possible symlink to global assets)
│       │   └── shared-locales/  (possible symlink to global locales)
│       ├── src/
│       │   └── pages/api        (api routes)
│       ├── CHANGELOG.md
│       ├── next.config.js
│       ├── next-i18next.config.js
│       ├── package.json         (define package workspace:package deps)
│       └── tsconfig.json        (define path to packages)
│
├── packages
│   ├── common-i18n
│   │   ├── src/
│   │   ├── CHANGELOG.md
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── eslint-config-bases
│   │   ├── src/
│   │   ├── CHANGELOG.md
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── components                  (basic design-system in react)
│       ├── src/
│       ├── CHANGELOG.md
│       ├── package.json
│       └── tsconfig.json
│
├── static                       (no code: images, json, locales,...)
│   ├── assets
│   └── locales
├── .yarnrc.yml
├── .dockerignore
├── docker-compose.nextjs-app.yml   (compose specific for nextjs-app)
├── docker-compose.yml           (optional: general services like postgresql...)
├── Dockerfile                   (multistage build suitable for all apps)
├── package.json                 (the workspace config)
└── tsconfig.base.json           (base typescript config)
```

</details>

## Monorepo essentials

### Monorepo scripts

Some convenience scripts can be run in any folder of this repo and will call their counterparts defined in packages and apps.

| Name                         | Description                                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `yarn g:changeset`           | Add a changeset to declare a new version                                                                                             |
| `yarn g:typecheck`           | Run typechecks in all workspaces                                                                                                     |
| `yarn g:lint`                | Display linter issues in all workspaces                                                                                              |
| `yarn g:lint --fix`          | Attempt to run linter auto-fix in all workspaces                                                                                     |
| `yarn g:lint-styles`         | Display css stylelint issues in all workspaces                                                                                       |
| `yarn g:lint-styles --fix`   | Attempt to run stylelint auto-fix issues in all workspaces                                                                           |
| `yarn g:test`                | Run unit and e2e tests in all workspaces                                                                                             |
| `yarn g:test`                | Run unit tests in all workspaces                                                                                                     |
| `yarn g:test-e2e`            | Run e2e tests in all workspaces                                                                                                      |
| `yarn g:build`               | Run build in all workspaces                                                                                                          |
| `yarn g:clean`               | Clean builds in all workspaces                                                                                                       |
| `yarn g:check-dist`          | Ensure build dist files passes es2017 (run `g:build` first).                                                                         |
| `yarn g:check-size`          | Ensure browser dist files are within size limit (run `g:build` first).                                                               |
| `yarn clean:global-cache`    | Clean tooling caches (eslint, jest...)                                                                                               |
| `yarn deps:check --dep dev`  | Will print what packages can be upgraded globally (see also [.ncurc.yml](https://github.com/sortlist/packages/blob/main/.ncurc.yml)) |
| `yarn deps:update --dep dev` | Apply possible updates (run `yarn install && yarn dedupe` after)                                                                     |
| `yarn check:install`         | Verify if there's no peer-deps missing in packages                                                                                   |
| `yarn dedupe`                | Built-in yarn deduplication of the lock file                                                                                         |
| `yarn build`                 | Builds application with rollup.                                                                                                      |
| `yarn publish-canary`        | Publishes a canary tagged version of the application. CD is configured to run this script on additions tot he main branch.           |

> Why using `:` to prefix scripts names ? It's convenient in yarn 3+, we can call those scripts from any folder in the monorepo.
> `g:` is a shortcut for `global:`. See the complete list in [root package.json](./package.json).

### Maintaining deps updated

The global commands `yarn deps:check` and `yarn deps:update` will help to maintain the same versions across the entire monorepo.
They are based on the [npm-check-updates](https://github.com/raineorshine/npm-check-updates)
(see [options](https://github.com/raineorshine/npm-check-updates#options), i.e: `yarn check:deps -t minor`).

> After running `yarn deps:update`, a `yarn install` is required. To prevent
> having duplicates in the yarn.lock, you can run `yarn dedupe --check` and `yarn dedupe` to
> apply deduplication. The duplicate check is enforced in the example github actions.

## 5. Quality

### 5.1 Linters

See in [./apps/hobbies-helsinki/.eslintrc.js](./apps/nextjs-app/.eslintrc.js) and
[eslint-config-bases](./packages/eslint-config-bases/README.md).

### 5.2 Hooks / Lint-staged

Check the [.husky](./.husky) folder content to see what hooks are enabled. Lint-staged is used to guarantee
that lint and prettier are applied automatically on commit and/or pushes.

### 5.3 Tests

Tests relies on ts-jest or vitest depending on the app. All setups supports typescript path aliases.
React-testing-library is enabled whenever react is involved.

Configuration lives in the root folder of each apps/packages. See

- [./apps/hobbies-helsinki/jest.config.js](./apps/hobbies-helsinki/jest.config.js).

### 5.4 CI

You'll find some example workflows for github action in [.github/workflows](./.github/workflows).
They will ensure that

- You don't have package duplicates.
- You don't have typecheck errors.
- You don't have linter / code-style errors.
- Your test suite is successful.
- Your apps or packages can be successfully built.
- Basic check-size.

Each of those steps can be opted-out.

To ensure decent performance, those features are present in the example actions:

- **Caching** of packages (node_modules...) - install around 25s
- **Caching** of nextjs previous build - built around 20s
- **Triggered when changed** using [actions paths](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#onpushpull_requestpaths), ie:

  > ```
  >  paths:
  >    - "apps/hobbies-helsinki/**"
  >    - "packages/**"
  >    - "package.json"
  >    - "tsconfig.base.json"
  >    - "yarn.lock"
  >    - ".yarnrc.yml"
  >    - ".github/workflows/**"
  >    - ".eslintrc.base.json"
  >    - ".eslintignore"
  > ```

## 6. Editor support

### 6.1 VSCode

The ESLint plugin requires that the `eslint.workingDirectories` setting is set:

```
"eslint.workingDirectories": [
    {
        "pattern": "./apps/*/"
    },
    {
        "pattern": "./packages/*/"
    }
],
```

More info [here](https://github.com/microsoft/vscode-eslint#mono-repository-setup)

## 7. Deploy

### Docker

Building a docker image, read the [docker doc](./docs/docker/docker.md).

## FAQ

### Monorepo

#### Exact vs semver dependencies

Apps dependencies and devDependencies are pinned to exact versions. Packages deps will use semver compatible ones.
For more info about this change see [reasoning here](https://docs.renovatebot.com/dependency-pinning/) and our
[renovabot.json5](renovate.json5) configuration file.

To help keeping deps up-to-date, see the `yarn deps:check && yarn deps:update` scripts and / or use the [renovatebot](https://github.com/marketplace/renovate).

> When adding a dep through yarn cli (i.e.: yarn add something), it's possible to set the save-exact behaviour automatically
> by setting `defaultSemverRangePrefix: ""` in [yarnrc.yml](./.yarnrc.yml). But this would make the default for packages/\* as well.
> Better to handle `yarn add something --exact` on per-case basis.
