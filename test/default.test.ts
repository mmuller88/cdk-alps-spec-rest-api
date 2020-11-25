import { App, Stack } from '@aws-cdk/core';
import { AlpsSpecRestApi } from '../src';
import '@aws-cdk/assert/jest';

describe('create the AlpsSpecRestApi', () => {
  describe('correctly', () => {
    test('from alps yaml', () => {
      // GIVEN
      const app = new App();
      const stack = new Stack(app, 'testing-stack');

      // WHEN
      new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {
        alpsSpecFile: 'src/todo-alps.yaml',
      });

      // THEN
      expect(stack).toHaveResource('AWS::ApiGateway::RestApi');
      expect(stack).toHaveResource('AWS::ApiGateway::Stage', {
        StageName: 'prod',
      });
    });

    test('with operationIdLambdaMapping', () => {
      // GIVEN
      const app = new App();
      const stack = new Stack(app, 'testing-stack');

      // WHEN
      new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {
        alpsSpecFile: 'src/todo-alps.yaml',
        operationIdLambdaMapping: {
          todoList: 'myOwnLambda',
        },
      });

      // THEN
      expect(stack).toHaveResource('AWS::ApiGateway::RestApi');
      expect(stack).toHaveResource('AWS::ApiGateway::Stage', {
        StageName: 'prod',
      });
    });
  });

  describe('failed', () => {
    test('invalid specFile format', () => {
      // GIVEN
      const app = new App();
      const stack = new Stack(app, 'testing-stack');

      expect(() => {
        new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {
          alpsSpecFile: 'src/abs',
        });
      }).toThrowError();

      expect(() => {
        new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {
          alpsSpecFile: 'src/index.ts',
        });
      }).toThrowError();

    });
  });

});

