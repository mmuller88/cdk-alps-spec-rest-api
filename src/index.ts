import * as apigw from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
// import * as lambda from "@aws-cdk/aws-apigateway";

export interface AlpsSpecRestApiProps {}

export class AlpsSpecRestApi extends cdk.Construct {
  constructor(
    scope: cdk.Construct,
    id: string,
    props: AlpsSpecRestApiProps = {},
  ) {
    super(scope, id);
    props;

    const api = new apigw.RestApi(this, 'RestApi', {
      restApiName: 'Alps Rest Api Gw',
    });

    api.root.addMethod('ANY');
  }
}
