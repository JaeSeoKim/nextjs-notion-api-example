import { notion } from ".";

const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.retrieve({
    database_id: databaseId,
  });
  return response;
};

export default getDatabase;
