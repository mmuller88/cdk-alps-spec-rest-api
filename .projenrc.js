const { AwsCdkConstructLibrary } = require('projen');

const deps = [
  'alps-unified-ts',
];

const project = new AwsCdkConstructLibrary({
  authorAddress: 'damadden88@googlemail.com',
  authorName: 'Martin Mueller',
  name: 'cdk-alps-spec-rest-api',
  defaultReleaseBranch: 'main',
  cdkVersion: '1.75.0',
  repository: 'https://github.com/mmuller88/cdk-alps-spec-rest-api.git',
  deps: deps,
  // peerDeps: deps,
  bundledDeps: deps,
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-iam',
  ],
  java: {
    javaPackage: 'com.github.mmuller88.cdkAlpsSpecRestApi',
    mavenGroupId: 'com.github.mmuller88',
    mavenArtifactId: 'cdk-alps-spec-rest-api',
  },
  dotnet: {
    dotNetNamespace: 'com.github.mmuller88',
    packageId: 'com.github.mmuller88.CdkAlpsSpecRestApi',
  },
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

project.github.addMergifyRules({
  name: 'Label core contributions',
  actions: {
    label: {
      add: ['contribution/core'],
    },
  },
  conditions: [
    'author~=^(mmuller88)$',
    'label!=contribution/core',
  ],
});

project.github.addMergifyRules({
  name: 'Label auto-merge for core',
  actions: {
    label: {
      add: ['auto-merge'],
    },
  },
  conditions: [
    'label=contribution/core',
    'label!=auto-merge',
  ],
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log', 'tmp'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.antitamper = false;


project.synth();
