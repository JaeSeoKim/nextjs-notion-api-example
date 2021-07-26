import { Client } from "@notionhq/client/build/src";
import getDatabasePages from "./getDatabasePages";
import getDatabase from "./getDatabase";
import getBlocks from "./getBlocks";
import getAllBlocks from "./getAllBlocks";
import getBlocksWithChildren from "./getBlocksWithChildren";
import getBlockWithChildren from "./getBlockWithChildren";
import getPage from "./getPage";
import getTitleFromPage from "./getTitleFromPage";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export {
  getDatabase,
  getDatabasePages,
  getBlocks,
  getAllBlocks,
  getBlocksWithChildren,
  getBlockWithChildren,
  getPage,
  getTitleFromPage,
};
