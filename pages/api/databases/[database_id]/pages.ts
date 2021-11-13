import {
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
} from "@notionhq/client";
import { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabasePages } from "../../../../lib/notion";

export type GetDatabasesPagesResData = {
  error?: string;
  pages: GetPageResponse[] | null;
  code?: ClientErrorCode | APIErrorCode;
  next_cursor: string | null;
};

export type GetDatabasesPagesReqData = {
  database_id: string;
  start_cursor?: string;
  page_size?: string;
};

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetDatabasesPagesResData>
) => {
  const { database_id, start_cursor, page_size } =
    req.query as unknown as GetDatabasesPagesReqData;
  try {
    const { pages, next_cursor } = await getDatabasePages(database_id, {
      start_cursor,
      page_size: Number(page_size) || 50,
    });
    res.status(200).json({
      pages: pages,
      next_cursor: next_cursor,
    });
  } catch (e: unknown) {
    if (isNotionClientError(e))
      res.status(500).json({
        pages: null,
        next_cursor: null,
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
