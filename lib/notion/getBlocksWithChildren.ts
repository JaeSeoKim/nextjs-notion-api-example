import { Block } from "@notionhq/client/build/src/api-types";
import getBlockWithChildren from "./getBlockWithChildren";

const getBlocksWithChildren = async (blocks: Block[]) => {
  return await Promise.all(
    blocks.map(async (block) => {
      return await getBlockWithChildren(block);
    })
  );
};

export default getBlocksWithChildren;
