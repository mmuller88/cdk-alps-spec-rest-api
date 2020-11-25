import { App, Stack } from '@aws-cdk/core';
import { AlpsSpecRestApi } from '../src';
import '@aws-cdk/assert/jest';

test('create the default AlpsSpecRestApi correctly', () => {
  // GIVEN
  const app = new App();
  const stack = new Stack(app, 'testing-stack');

  // WHEN
  new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {
    specFile: 'src/todo-oas.yaml',
  });

  // THEN
  expect(stack).toHaveResource('AWS::ApiGateway::RestApi');
  expect(stack).toHaveResource('AWS::ApiGateway::Stage', {
    StageName: 'prod',
  });
});

test('create the default AlpsSpecRestApi correctly for JSOn as well', () => {
  // GIVEN
  const app = new App();
  const stack = new Stack(app, 'testing-stack');

  // WHEN
  new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {
    specFile: 'src/todo-oas.json',
  });

  // THEN
  expect(stack).toHaveResource('AWS::ApiGateway::RestApi');
  expect(stack).toHaveResource('AWS::ApiGateway::Stage', {
    StageName: 'prod',
  });
});

test('fail if invalid specFile', () => {
  // GIVEN
  const app = new App();
  const stack = new Stack(app, 'testing-stack');

  expect(() => {
    new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {
      specFile: 'src/abs',
    });
  }).toThrowError();

  expect(() => {
    new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {
      specFile: 'src/index.ts',
    });
  }).toThrowError();

});