# Setup

1. Install AWS Sam `https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html`
2. Install .Net6 dependencies `https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu#2004` (For Ubuntu 20.04)
3. Add tools directory to PATH `PATH="$PATH:$HOME/.dotnet/tools"`
4. Build Lambda using `cd HelloWorldApp && sam build`

# Invoking
## Cli
Invoke function using CLI `cd HelloWorldApp && sam local invoke HelloWorldFunction`

## Using SDK
Run SAM Server `cd HelloWorldApp && sam local start-lambda`
Install node and run `cd Invoker && node index.js`

## Using Api-Gateway
Run SAM Server `cd HelloWorldApp && sam local start-api`
Open http://127.0.0.1:3000/hello