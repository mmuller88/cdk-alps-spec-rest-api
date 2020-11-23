[![NPM version](https://badge.fury.io/js/cdk-alps-spec-rest-api.svg)](https://badge.fury.io/js/cdk-alps-spec-rest-api)
[![PyPI version](https://badge.fury.io/py/cdk-alps-spec-rest-api.svg)](https://badge.fury.io/py/cdk-alps-spec-rest-api)
![Release](https://github.com/mmuller88/cdk-alps-spec-rest-api/workflows/Release/badge.svg)

# CDK Alps Spec Rest Api

CDK Construct library constructed with the help of Pahud https://www.youtube.com/watch?v=cTsSXYOYQPw&t=2s <3.

# Sample

```ts
const app = new cdk.App();

const stack = new cdk.Stack(app, 'my-demo-stack', { env });

new AlpsSpecRestApi(stack, 'AlpsSpecRestApi');
```
