import { App, Stack } from '@aws-cdk/core';
import { AlpsSpecRestApi } from '../src';
import '@aws-cdk/assert/jest';

describe('create the AlpsSpecRestApi', () => {
  describe('correctly', () => {
    test('from yaml', () => {
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

    test('from json', () => {
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

    test('with operationIdLambdaMapping', () => {
      // GIVEN
      const app = new App();
      const stack = new Stack(app, 'testing-stack');

      // WHEN
      new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {
        specFile: 'src/todo-oas.yaml',
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
          specFile: 'src/abs',
        });
      }).toThrowError();

      expect(() => {
        new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {
          specFile: 'src/index.ts',
        });
      }).toThrowError();

    });

    test('missing operationId in specFile', () => {
      // GIVEN
      const app = new App();
      const stack = new Stack(app, 'testing-stack');

      expect(() => {
        new AlpsSpecRestApi(stack, 'AlpsSpecRestApi', {
          specFile: 'src/todo-oas-missing-operationId.yaml',
        });
      }).toThrowError();
    });
  });

});

