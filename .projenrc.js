const { AwsCdkConstructLibrary } = require('projen');

const deps = [
  'boxen',
  'chalk',
  'yamljs',
  'yargs@16.1.1',
  // 'unified@https://github.com/mamund/alps-unified'
  'alps-unified-ts'
];

const project = new AwsCdkConstructLibrary({
  authorAddress: "damadden88@googlemail.com",
  authorName: "Martin Mueller",
  name: "cdk-alps-spec-rest-api",
  defaultReleaseBranch: "main",
  cdkVersion: "1.75.0",
  repository: "https://github.com/mmuller88/cdk-alps-spec-rest-api.git",
  deps: deps,
  // peerDeps: deps,
  bundledDeps: deps,
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
  keywords: [
    'cdk',
    'aws',
    'alps',
    'apigateway',
  ],
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log', 'tmp'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.antitamper = false;


project.synth();
