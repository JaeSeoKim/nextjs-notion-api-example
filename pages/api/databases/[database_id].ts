import {
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
  NotionClientError,
} from "@notionhq/client";
import { Database } from "@notionhq/client/build/src/api-types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabaseInfo } from "../../../lib/notion";

export type databasesResData = {
  error?: string;
  database: Database | null;
  code?: ClientErrorCode | APIErrorCode;
};

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<databasesResData>
) => {
  const { database_id } = req.query;
  try {
    const database = await getDatabaseInfo(
      typeof database_id === "string" ? database_id : database_id[0]
    );
    res.status(200).json({
      database: database,
    });
  } catch (e: unknown) {
    if (isNotionClientError(e))
      res.status(500).json({
        database: null,
        error: e.message,
        code: e.code,
      });
    else throw e;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return await getHandler(req, res);
    default:
      break;
  }
};

export default handler;
