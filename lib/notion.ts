import { Client } from "@notionhq/client";
import { PagesRetrieveResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  RichText,
  TitlePropertyValue,
  Block,
} from "@notionhq/client/build/src/api-types";
import { allowedStatusCodes } from "next/dist/lib/load-custom-routes";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (
  databaseId: string,
  {
    start_cursor,
    page_size,
  }: {
    start_cursor?: string;
    page_size: number;
  } = {
    page_size: 50,
  }
) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    start_cursor: start_cursor,
    page_size: page_size,
  });
  return response.results;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({
    page_id: pageId,
  });
  return response;
};

export const getBlocks = async (
  blockId: string,
  {
    start_cursor,
    page_size,
  }: {
    start_cursor?: string;
    page_size: number;
  } = {
    page_size: 50,
  }
) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: page_size,
    start_cursor: start_cursor,
  });
  return response.results;
};

export const getBlockWithChildren = async (block: Block) => {
  if (block.has_children === true) {
    const children = await getBlocks(block.id);
    switch (block.type) {
      case "paragraph":
        if (typeof block.paragraph.children === "undefined") {
          block.paragraph.children = await getBlocksWithChildren(children);
        }
        break;
      case "bulleted_list_item":
        if (typeof block.bulleted_list_item.children === "undefined") {
          block.bulleted_list_item.children = await getBlocksWithChildren(
            children
          );
        }
        break;
      case "numbered_list_item":
        if (typeof block.numbered_list_item.children === "undefined") {
          block.numbered_list_item.children = await getBlocksWithChildren(
            children
          );
        }
        break;
      case "to_do":
        if (typeof block.to_do.children === "undefined") {
          block.to_do.children = await getBlocksWithChildren(children);
        }
        break;
      case "toggle":
        if (typeof block.toggle.children === "undefined") {
          block.toggle.children = await getBlocksWithChildren(children);
        }
        break;
    }
  }
  return block;
};

export const getBlocksWithChildren = async (blocks: Block[]) => {
  return await Promise.all(
    blocks.map(async (block) => {
      return await getBlockWithChildren(block);
    })
  );
};

export const getTitleFromPage = (
  page: PagesRetrieveResponse,
  titleKey: string = "Name"
) => {
  let title: RichText[] = [];
  if (page.parent.type === ("page_id" || "workspace")) {
    title = (page.properties.title as TitlePropertyValue).title;
  } else if (page.parent.type === "database_id") {
    title = (page.properties[titleKey] as TitlePropertyValue).title;
  }
  return title.map(({ plain_text }) => plain_text).join("");
};
