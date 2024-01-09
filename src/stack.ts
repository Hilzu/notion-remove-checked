import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import { getEnv } from "./utils.js";

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const handler = new NodejsFunction(this, "handler", {
      entry: "./dist/handler.mjs",
      runtime: Runtime.NODEJS_20_X,
      bundling: {
        minify: true,
        sourceMap: true,
        target: "es2022",
        format: OutputFormat.ESM,
        banner:
          "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
      },
      timeout: Duration.seconds(30),
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
        NODE_ENV: "production",
        NOTION_TOKEN: getEnv("NOTION_TOKEN"),
        NOTION_PAGE_ID: getEnv("NOTION_PAGE_ID"),
      },
    });

    new LogGroup(this, "HandlerLogGroup", {
      logGroupName: `/aws/lambda/${handler.functionName}`,
      retention: RetentionDays.THIRTEEN_MONTHS,
    });
  }
}
