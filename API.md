# API Reference

**Classes**

Name|Description
----|-----------
[AlpsSpecRestApi](#cdk-alps-spec-rest-api-alpsspecrestapi)|*No description*


**Structs**

Name|Description
----|-----------
[AlpsSpecRestApiProps](#cdk-alps-spec-rest-api-alpsspecrestapiprops)|*No description*



## class AlpsSpecRestApi  <a id="cdk-alps-spec-rest-api-alpsspecrestapi"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new AlpsSpecRestApi(scope: Construct, id: string, props: AlpsSpecRestApiProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[AlpsSpecRestApiProps](#cdk-alps-spec-rest-api-alpsspecrestapiprops)</code>)  *No description*
  * **alpsSpecFile** (<code>string</code>)  ALPS Spec File. 
  * **operationIdLambdaMapping** (<code>Map<string, string></code>)  Optional mapping from openApi spec operationId to Lambda name. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**operationIdLambdaMapping**? | <code>Map<string, string></code> | __*Optional*__



## struct AlpsSpecRestApiProps  <a id="cdk-alps-spec-rest-api-alpsspecrestapiprops"></a>






Name | Type | Description 
-----|------|-------------
**alpsSpecFile** | <code>string</code> | ALPS Spec File.
**operationIdLambdaMapping**? | <code>Map<string, string></code> | Optional mapping from openApi spec operationId to Lambda name.<br/>__*Optional*__



