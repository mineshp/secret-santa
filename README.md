# Frontend

## Run locally

```AWS_PROFILE=<> npm run start```

## Deploy to S3

Application is deployed as a static website to S3

```AWS_PROFILE=<> npm run deploy```

## Run linter

Eslint and stylelint are in place to lint the code

```AWS_PROFILE=<> npm run lint:fix```

## Run tests

Unit tests are written using React Testing Library (RTL), to run them locally use the following command.

```AWS_PROFILE=<> npm run test```

## Acceptance Tests

Acceptance tests are written using Cypress, to run them

```bash
npm run cy:run
```

### Deploy serverless app to aws

```AWS_PROFILE=<> sls deploy```
