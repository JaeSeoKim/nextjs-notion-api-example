import { Page } from "@notionhq/client/build/src/api-types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPage } from "../../../lib/notion";

export type getPagesResData = {
  page: Page;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<getPagesResData>
) {
  const { page_id } = req.query;
  const page = getPage(page_id as string);
}
