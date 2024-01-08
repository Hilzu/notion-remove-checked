import { AppStack } from "./stack.js";
import { App } from "aws-cdk-lib";

const app = new App();
new AppStack(app, "NotionRemoveCheckedStack");
