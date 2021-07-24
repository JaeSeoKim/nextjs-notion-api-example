import { Page } from "@notionhq/client/build/src/api-types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPage } from "../../../lib/notion";

export type getPagesResData = {
  page: Page;
};

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<getPagesResData>
) => {
  const { page_id } = req.query;
  const page = await getPage(
    typeof page_id === "string" ? page_id : page_id[0]
  );

  res.status(200).json({
    page: page,
  });
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
