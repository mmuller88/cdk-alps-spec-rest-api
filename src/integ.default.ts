import * as cdk from '@aws-cdk/core';
import { AlpsSpecRestApi } from './index';

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'my-demo-stack', { env });

    new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {});

    this.stack = [stack];
  }
}

new IntegTesting();
