// import * as cdk from "aws-cdk-lib";
// import { Construct } from "constructs";
// // import * as sqs from 'aws-cdk-lib/aws-sqs';
// import * as cognito from "aws-cdk-lib/aws-cognito";
// import * as lambda from "aws-cdk-lib/aws-lambda";
// import * as apigateway from "aws-cdk-lib/aws-apigateway";
// import * as aws_dynamodb from "aws-cdk-lib/aws-dynamodb";
// import { Duration } from "aws-cdk-lib";
// import { Role, PolicyStatement, ServicePrincipal } from "aws-cdk-lib/aws-iam";

// export class NewOneStack extends cdk.Stack {
//   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);

//     // const authEmailFn = new lambda.Function(this, "newOneAuthEmail1", {
//     //   runtime: lambda.Runtime.NODEJS_14_X,
//     //   handler: "index.handler",
//     //   code: lambda.Code.fromAsset("lambda"),
//     // });

//     // const userPool = new cognito.UserPool(this, "newOne1", {
//     //   selfSignUpEnabled: true,
//     //   accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
//     //   userVerification: {
//     //     emailStyle: cognito.VerificationEmailStyle.CODE,
//     //   },
//     //   autoVerify: {
//     //     email: false,
//     //   },
//     //   standardAttributes: {
//     //     email: {
//     //       required: true,
//     //       mutable: true,
//     //     },
//     //   },
//     //   lambdaTriggers: {
//     //     preSignUp: authEmailFn, ///Trigger before the signup process to userpool
//     //   },
//     // });
//     // const userPoolClient = userPool.addClient("app-client", {
//     //   oAuth: {
//     //     flows: {
//     //       authorizationCodeGrant: true,
//     //     },
//     //     scopes: [cognito.OAuthScope.OPENID],
//     //     callbackUrls: ["http://localhost/welcome"],
//     //     logoutUrls: ["https://localhost/home"],
//     //   },
//     // });

//     // new cdk.CfnOutput(this, "aws_user_pools_web_client_id", {
//     //   value: userPoolClient.userPoolClientId,
//     // });
//     // new cdk.CfnOutput(this, "aws_project_region", {
//     //   value: this.region,
//     // });
//     // new cdk.CfnOutput(this, "aws_user_pools_id", {
//     //   value: userPool.userPoolId,
//     // });

//     // CREATE A DYNAMO DB TABLE

//     const postsTable = new aws_dynamodb.Table(this, "CDKpostsTable", {
//       partitionKey: {
//         name: "id",
//         type: aws_dynamodb.AttributeType.STRING,
//       },
//       billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
//     });

//     // Define an IAM role for the Lambda function
//     const lambdaRole = new Role(this, "MyLambdaRole", {
//       assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
//     });

//     // Add permissions to the IAM role to allow API Gateway to invoke the Lambda function
//     const lambdaPermission = new PolicyStatement({
//       actions: ["lambda:InvokeFunction"],
//       resources: ["*"], // You can restrict this to specific Lambda functions if needed
//     });

//     lambdaRole.addToPolicy(lambdaPermission);

//     //  CREATE A LAMBDA FUNCTION

//     const postsLambda = new lambda.Function(this, "PostsHandler", {
//       runtime: lambda.Runtime.NODEJS_14_X,
//       handler: "main.handler",
//       code: lambda.Code.fromAsset("lambda"),
//       memorySize: 1024,
//       role: lambdaRole,
//     });

//     postsTable.grantFullAccess(postsLambda);

//     postsLambda.addEnvironment("POSTS_TABLE", postsTable.tableName);

//     //CREATE AN API GATEWAY

//     // const api = new apigateway.LambdaRestApi(this, "postSapi", {
//     //   handler: postsLambda,
//     //   proxy: false,
//     //   integrationOptions: {
//     //     allowTestInvoke: true,
//     //     timeout: Duration.seconds(5),
//     //   },
//     // });

//     // Define the API Gateway
//     const api = new apigateway.RestApi(this, "MyApi", {
//       deployOptions: {
//         stageName: "prod",
//       },
//     });

//     const lamddaIntegeration = new apigateway.LambdaIntegration(postsLambda);

//     const items = api.root.addResource("posts");
//     items.addMethod("GET", lamddaIntegeration); // GET /items

//   }
// }

import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {
  aws_cognito,
  aws_secretsmanager,
  aws_lambda,
  aws_appsync,
  aws_dynamodb,
} from "aws-cdk-lib";
export class NewOneStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const userPool = new aws_cognito.UserPool(this, "Pool", {
    //   selfSignUpEnabled: true,
    //   accountRecovery: aws_cognito.AccountRecovery.EMAIL_ONLY,
    //   userVerification: {
    //     emailStyle: aws_cognito.VerificationEmailStyle.CODE,
    //   },
    //   autoVerify: {
    //     email: true,
    //   },
    //   standardAttributes: {
    //     email: {
    //       required: true,
    //       mutable: true,
    //     },
    //   },
    // });

    // const secret = aws_secretsmanager.Secret.fromSecretAttributes(
    //   this,
    //   "CognitoClientSecret",
    //   {
    //     secretCompleteArn:
    //       "arn:aws:secretsmanager:us-east-1:754509966853:secret:octotastic/google/clientSecret-qX1Ihx",
    //   }
    // ).secretValue;

    // const provider = new aws_cognito.UserPoolIdentityProviderGoogle(
    //   this,
    //   "Google",
    //   {
    //     clientId:
    //       "113942170177-0t72njcr8h8fvj4ckacsdsvtkhuudkke.apps.googleusercontent.com",
    //     clientSecretValue: secret,
    //     userPool: userPool,
    //   }
    // );

    // userPool.registerIdentityProvider(provider);

    // const userPoolClient = new aws_cognito.UserPoolClient(
    //   this,
    //   "amplifyClient",
    //   {
    //     userPool,
    //     oAuth: {
    //       callbackUrls: ["http://localhost:5173/"], // This is what user is allowed to be redirected to with the code upon signin. this can be a list of urls.
    //       logoutUrls: ["http://localhost:5173/"], // This is what user is allowed to be redirected to after signout. this can be a list of urls.
    //     },
    //   }
    // );

    // const domain = userPool.addDomain("domain", {
    //   cognitoDomain: {
    //     domainPrefix: "eru-test-pool", // SET YOUR OWN Domain PREFIX HERE
    //   },
    // });
    // new cdk.CfnOutput(this, "aws_user_pools_web_client_id", {
    //   value: userPoolClient.userPoolClientId,
    // });
    // new cdk.CfnOutput(this, "aws_project_region", {
    //   value: this.region,
    // });
    // new cdk.CfnOutput(this, "aws_user_pools_id", {
    //   value: userPool.userPoolId,
    // });

    // new cdk.CfnOutput(this, "domain", {
    //   value: domain.domainName,
    // });

    // apsyncc code

    const api = new aws_appsync.GraphqlApi(this, "MemApi", {
      name: "cdk-posts-appsync-api",
      schema: aws_appsync.SchemaFile.fromAsset("graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: aws_appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
      xrayEnabled: true,
    });

    const postsLambda = new aws_lambda.Function(this, "AppSyncPostsHandler", {
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: aws_lambda.Code.fromAsset("lambda"),
      memorySize: 1024,
    });
    const lambdaDs = api.addLambdaDataSource("lambdaDatasource", postsLambda);

    lambdaDs.createResolver("GetPosts", {
      typeName: "Query",
      fieldName: "getPosts",
    });

    lambdaDs.createResolver("CreatePost", {
      typeName: "Mutation",
      fieldName: "addPost",
    });

    // order table

    const postsTable = new aws_dynamodb.Table(this, "CDKpostsTable", {
      partitionKey: {
        name: "id",
        type: aws_dynamodb.AttributeType.STRING,
      },
      billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // const todosTable = new aws_dynamodb.Table(this, "CDKTodosTable", {
    //   partitionKey: {
    //     name: "id",
    //     type: aws_dynamodb.AttributeType.STRING,
    //   },
    // });
    postsTable.grantFullAccess(postsLambda);
    postsLambda.addEnvironment("POSTS_TABLE", postsTable.tableName);

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl,
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });

    // Prints out the AppSync GraphQL API ID to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIID", {
      value: api.apiId || "",
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region,
    });
  }
}