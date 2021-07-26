import { notion } from ".";

const getDatabasePages = async (
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
  return {
    pages: response.results,
    next_cursor: response.next_cursor,
  };
};

export default getDatabasePages;
