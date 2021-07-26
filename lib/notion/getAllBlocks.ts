import { getBlocks } from ".";

const getAllBlocks = async (blockId: string, start_cursor?: string) => {
  const { blocks, next_cursor } = await getBlocks(blockId, {
    start_cursor,
    page_size: 100,
  });

  if (next_cursor === null) {
    return blocks;
  }
  blocks.push(...(await getAllBlocks(blockId, next_cursor)));
  return blocks;
};

export default getAllBlocks;
