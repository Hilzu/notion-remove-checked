// eslint-disable-next-line n/no-missing-import
import type { Handler } from "aws-lambda";
import { removeCheckedItems } from "./notion.js";

export const handler: Handler = async (event) => {
  console.log("event", event);
  await removeCheckedItems();
};
