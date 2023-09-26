import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// const AWS = require('aws-sdk');
// const docClient = new AWS.DynamoDB.DocumentClient();
import { PostInput } from "./types";

async function addPost(post: PostInput) {
  const params = {
    TableName: process.env.POSTS_TABLE,
    Item: post,
  };
  try {
    const command = new PutCommand(params);
    const response = await docClient.send(command);
    console.log(response);
    return post;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
  }
}

export default addPost;

export async function getPosts() {
  const params = {
    TableName: process.env.POSTS_TABLE,
  };
  try {
    const command = new ScanCommand(params);
    const response = await docClient.send(command);

    // await docClient.put(params).promise();
    console.log(response.Items);
    return response.Items;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
  }
}
