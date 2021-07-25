import { notion } from ".";

const getBlocks = async (
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

export default getBlocks;
