import * as apigw from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import { join } from 'path';

export interface AlpsSpecRestApiProps {}

export class AlpsSpecRestApi extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props?: AlpsSpecRestApiProps) {
    super(scope, id);
    props;

    // const uni = unified;
    const swaggerFile = 'src/todo-oas.yaml';
    //const swaggerFile = 'src/openapi.yaml';

    const api = new apigw.SpecRestApi(this, 'SpecRestApi', {
      // restApiName: 'Alps Rest Api Gw',
      apiDefinition: apigw.ApiDefinition.fromAsset(
        join(__dirname, `../${swaggerFile}`),
      ),
    });
    api;
  }
}
