// eslint-disable-next-line n/no-missing-import
import type { ScheduledHandler } from "aws-lambda";
import { removeCheckedItems } from "./notion.js";

export const handler: ScheduledHandler = async (event) => {
  console.log("event", event);
  await removeCheckedItems();
};
