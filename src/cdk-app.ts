import { App } from "aws-cdk-lib";
import { AppStack } from "./stack.js";

const app = new App();
new AppStack(app, "NotionRemoveChecked");
