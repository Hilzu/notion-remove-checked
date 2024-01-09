import { inspect } from "node:util";
import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  ToDoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints.js";
import { getEnv } from "./utils.js";

const pageId = getEnv("NOTION_PAGE_ID");

const token = getEnv("NOTION_TOKEN");

const notion = new Client({ auth: token });

const isTodoBlock = (
  block: PartialBlockObjectResponse | BlockObjectResponse,
): block is ToDoBlockObjectResponse =>
  "type" in block && block.type === "to_do";

export const removeCheckedItems = async () => {
  const blockChildrenResponse = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  console.log("Fetched blocks", {
    ...blockChildrenResponse,
    results: blockChildrenResponse.results.length,
  });

  for (const block of blockChildrenResponse.results) {
    if (!isTodoBlock(block)) continue;
    if (!block.to_do.checked) continue;

    console.log("Deleting block", inspect(block, { depth: 5 }));
    await notion.blocks.delete({ block_id: block.id });
  }
};
