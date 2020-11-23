import { App, Stack } from '@aws-cdk/core';
import { AlpsSpecRestApi } from '../src';
import '@aws-cdk/assert/jest';

test('create the default AlpsSpecRestApi correctly', () => {
  // GIVEN
  const app = new App();
  const stack = new Stack(app, 'testing-stack');

  // WHEN
  new AlpsSpecRestApi(stack, 'AlpsSpecRestApi');

  // THEN
  expect(stack).toHaveResource('AWS::ApiGateway::RestApi');
  expect(stack).toHaveResource('AWS::ApiGateway::Stage', {
    StageName: 'prod',
  });
});
