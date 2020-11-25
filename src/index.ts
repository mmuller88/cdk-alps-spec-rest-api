import * as fs from 'fs';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import * as yaml from 'js-yaml';

export interface AlpsSpecRestApiProps {
  readonly integrations?: Record<string, apigw.Integration>;
  readonly specFile: string;
}

export class AlpsSpecRestApi extends cdk.Construct {

  integrations?: Record<string, apigw.Integration>;

  constructor(scope: cdk.Construct, id: string, props: AlpsSpecRestApiProps) {
    super(scope, id);
    this.integrations = props?.integrations;

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
    console.log(`Swagger: ${specJson}`);

    const api = new apigw.SpecRestApi(this, 'SpecRestApi', {
      // restApiName: 'Alps Rest Api Gw',
      apiDefinition: apigw.ApiDefinition.fromInline(
        specJson,
      ),
    });
    api;
  }
}
