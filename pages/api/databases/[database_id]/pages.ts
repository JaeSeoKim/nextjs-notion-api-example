import {
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
} from "@notionhq/client";
import { Page } from "@notionhq/client/build/src/api-types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabasePages } from "../../../../lib/notion";

export type GetDatabasesPagesResData = {
  error?: string;
  pages: Page[] | null;
  code?: ClientErrorCode | APIErrorCode;
};

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetDatabasesPagesResData>
) => {
  const { database_id } = req.query;
  try {
    const pages = await getDatabasePages(
      typeof database_id === "string" ? database_id : database_id[0]
    );
    res.status(200).json({
      pages: pages,
    });
  } catch (e: unknown) {
    if (isNotionClientError(e))
      res.status(500).json({
        pages: null,
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
