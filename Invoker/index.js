const AWS = require("aws-sdk");

const client = new AWS.Lambda({
  endpoint: "http://localhost:3001",
  region: "eu-south-1",
  credentials: new AWS.Credentials("", ""),
})

client.invoke({
  FunctionName: "HelloWorldFunction",
  Payload: JSON.stringify({hi: "hi"})
}).promise().then((response) => console.log(response));