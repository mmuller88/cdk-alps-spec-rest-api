[![NPM version](https://badge.fury.io/js/cdk-alps-spec-rest-api.svg)](https://badge.fury.io/js/cdk-alps-spec-rest-api)
[![PyPI version](https://badge.fury.io/py/cdk-alps-spec-rest-api.svg)](https://badge.fury.io/py/cdk-alps-spec-rest-api)
![Release](https://github.com/mmuller88/cdk-alps-spec-rest-api/workflows/Release/badge.svg)

# CDK Alps Spec Rest Api

The CDK Alps Spec Rest Api construct generates an AWS API Gateway out of an ALPS API yaml file such src/todo-alps.yaml. ALPS API is an abstraction of APIs like REST API or Graph QL. More about the ALPS API see in the ALPS API section.

The AWS CDK construct repo was generated with [Projen](https://github.com/projen/projen) as **awscdk-construct**

# Thanks

- To Pahud for the helpful AWS CDK Construct video: https://www.youtube.com/watch?v=cTsSXYOYQPw
- Mike Amundsen for the ALPS API idea and help

# ALPS API

The ALPS API converter is on GitHub on: https://github.com/mamund/alps-unified

Very useful to understand the idea of ALPS API is this video on YouTube: https://www.youtube.com/watch?v=oG6-r3UdenE

# Sample

```ts
const app = new cdk.App();

const stack = new cdk.Stack(app, 'my-demo-stack', { env });

new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {
  alpsSpecFile: 'src/todo-alps.yaml',
});
```

# CDK stack commands

## Diff

```ts
npx cdk --app lib/integ.default.js --profile <profile> diff
```

## Deploy

```ts
npx cdk --app lib/integ.default.js --profile <profile> deploy
```

## Destroy

```ts
npx cdk --app lib/integ.default.js --profile <profile> destroy
```

# Limitations / Issues / TODOS

- (AWS) Authorizer and Validator are not supported yet
- only alps YAML files are supported. alps JSON files will be added
- only Lambda integrations are supported and the endpoints are per default mapped to lambdas with the same name as the operationId.
