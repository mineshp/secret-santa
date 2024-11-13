# Frontend

## Run locally

`AWS_PROFILE=<> npm run start`

## Deploy to S3

Application is deployed as a static website to S3

`AWS_PROFILE=<> npm run deploy`

## Run linter

Eslint and stylelint are in place to lint the code

`AWS_PROFILE=<> npm run lint:fix`

## Run tests

Unit tests are written using React Testing Library (RTL), to run them locally use the following command.

`AWS_PROFILE=<> npm run test`

## Acceptance Tests

Acceptance tests are written using Cypress, to run them

### Local

```bash
npm run cy:local
```

### Prod

Runs against the production version

```bash
npm run cy:prod
```

### CI mode

Runs in headless mode, as part of the process to push the branch.

```bash
npm run cy:ci
```

### Deploy serverless app to aws

`AWS_PROFILE=<> sls deploy`
