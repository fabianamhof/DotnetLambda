const AWS = require("aws-sdk");
const { writeFileSync } = require("fs");

const client = new AWS.Lambda({
  endpoint: "http://localhost:3001",
  region: "eu-south-1",
  credentials: new AWS.Credentials("", ""),
})

const event = {
  "body": "{\r\n    \"url\": \"https://www.google.de\",\r\n    \"config\": {\r\n      \"landscape\": true\r\n    }\r\n  }",
}

client.invoke({
  FunctionName: "HtmlToPdfFunction",
  Payload: JSON.stringify(event)
}).promise().then((response) => {
  const pdf = Buffer.from(JSON.parse(response.Payload.toString()).body, "base64");
  writeFileSync("html.pdf", pdf);
});