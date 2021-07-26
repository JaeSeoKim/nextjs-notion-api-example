import {
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
} from "@notionhq/client";
import { Page } from "@notionhq/client/build/src/api-types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPage } from "../../../lib/notion";

export type GetPagesResData = {
  error?: string;
  page: Page | null;
  code?: ClientErrorCode | APIErrorCode;
};

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetPagesResData>
) => {
  const { page_id } = req.query;
  try {
    const page = await getPage(
      typeof page_id === "string" ? page_id : page_id[0]
    );
    res.status(200).json({
      page: page,
    });
  } catch (e: unknown) {
    if (isNotionClientError(e))
      res.status(500).json({
        page: null,
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
