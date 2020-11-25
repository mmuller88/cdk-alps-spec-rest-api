import * as fs from 'fs';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import * as yaml from 'js-yaml';

export interface AlpsSpecRestApiProps {
  /** 
   * Optional mapping from openApi spec operationId to Lambda name.
   * Per default it uses a Lambda integration with using the openApi spec operationId property as Lambda name
   */
  readonly operationIdLambdaMapping?: Record<string, string>;
  /**
   * OpenApi Spec File. Can be YAML or JSON.
   */
  readonly specFile: string;
}

export class AlpsSpecRestApi extends cdk.Construct {

  operationIdLambdaMapping?: Record<string, string>;

  constructor(scope: cdk.Construct, id: string, props: AlpsSpecRestApiProps) {
    super(scope, id);
    this.operationIdLambdaMapping = props?.operationIdLambdaMapping;

    const apiRole = new iam.Role(scope, 'apiRole', {
      //roleName: 'apiRole',
      assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonAPIGatewayPushToCloudWatchLogs')],
    });

    apiRole.addToPolicy(
      new iam.PolicyStatement({
        resources: ['*'],
        actions: ['lambda:InvokeFunction'],
      }),
    );

    // const uni = unified;
    const specFile = props.specFile;

    const file = fs.readFileSync(specFile, { encoding: 'utf-8' });
    console.log(`file: ${file}`);
    let specJson;
    try {
      specJson = yaml.load(file);
    } catch (err) {
      try {
        specJson = JSON.parse(file);
      } catch (err2) {
        // no YAML or JSON
        console.log(`ERROR no YAML or JSON: ${err2}`);
        throw new Error(`ERROR no YAML or JSON: ${err2}`);
      }
    }

    console.log(`specJson: ${JSON.stringify(specJson)}`);

    const region = cdk.Stack.of(this).region;
    const accountId = cdk.Stack.of(this).account;

    const endpointsJson = specJson.paths;
    for (const endpoint of Object.keys(endpointsJson)) {
      console.log(`endpoint: ${JSON.stringify(endpoint)}`);
      for (const method of Object.values<any>(endpointsJson[endpoint])) {
        console.log(`method ${JSON.stringify(method)}`);
        // validate OpenApi Spec
        const methodKey = Object.keys(method)[0];
        if (method.operationId === undefined || method.operationId === null) {
          throw new Error(`Endpoint ${endpoint} with Method ${methodKey}`);
        }
        let methodExt = method;
        let lambdaName = method.operationId;
        // override lambdaName if specified in operationIdLambdaMapping
        if (this.operationIdLambdaMapping && this.operationIdLambdaMapping[method.operationId] !== undefined) {
          lambdaName = this.operationIdLambdaMapping[method.operationId];
        }
        methodExt['x-amazon-apigateway-integration'] = {
          uri: `arn:aws:apigateway:${region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${region}:${accountId}:function:${lambdaName}/invocations`,
          passthroughBehavior: 'when_no_match',
          httpMethod: 'POST',
          type: 'aws_proxy',
          credentials: apiRole.roleArn,
        };
        console.log(`methodExt: ${JSON.stringify(methodExt)}`);
      }
    }

    console.log(`specJson after edit: ${JSON.stringify(specJson)}`);

    const api = new apigw.SpecRestApi(this, 'SpecRestApi', {
      // restApiName: 'Alps Rest Api Gw',
      apiDefinition: apigw.ApiDefinition.fromInline(
        specJson,
      ),
    });
    api;
  }
}
