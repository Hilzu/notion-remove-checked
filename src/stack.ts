import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, "handler", {
      entry: "./dist/handler.js",
      runtime: Runtime.NODEJS_20_X,
      bundling: {
        minify: true,
        sourceMap: true,
        target: "es2022",
        format: OutputFormat.ESM,
      },
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
        NODE_ENV: "production",
      },
    });
  }
}
