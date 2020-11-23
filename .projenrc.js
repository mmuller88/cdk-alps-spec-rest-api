const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: "damadden88@googlemail.com",
  authorName: "Martin Mueller",
  cdkVersion: "1.73.0",
  name: "cdk-alps-spec-rest-api",
  repository: "https://github.com/mmuller88/cdk-alps-spec-rest-api.git",
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-apigateway',
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
