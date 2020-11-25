const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: "damadden88@googlemail.com",
  authorName: "Martin Mueller",
  cdkVersion: "1.75.0",
  name: "cdk-alps-spec-rest-api",
  repository: "https://github.com/mmuller88/cdk-alps-spec-rest-api.git",
  dependencies: {
    'unified':'https://github.com/mamund/alps-unified',
    "js-yaml": "^3.14.0",
    "@types/js-yaml": "^3.12.5",
  },
  devDependencies: {

  },
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-iam',
  ],
  python: {
    distName: 'cdk-alps-spec-rest-api',
    module: 'cdk_alps_spec_rest_api',
  },
  releaseBranches: ['main'],
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log']
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);


project.synth();
