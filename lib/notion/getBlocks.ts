import { notion } from ".";

const getBlocks = async (
  blockId: string,
  {
    start_cursor,
    page_size,
  }: {
    start_cursor?: string;
    page_size?: number;
  } = {}
) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: page_size ?? 100,
    start_cursor: start_cursor,
  });
  return {
    blocks: response.results,
    next_cursor: response.next_cursor,
  };
};

export default getBlocks;
