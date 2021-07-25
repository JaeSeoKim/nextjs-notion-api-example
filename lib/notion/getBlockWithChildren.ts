import { Block } from "@notionhq/client/build/src/api-types";
import getBlocks from "./getBlocks";
import getBlocksWithChildren from "./getBlocksWithChildren";

const getBlockWithChildren = async (block: Block) => {
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

export default getBlockWithChildren;
