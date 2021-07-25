import { PagesRetrieveResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  RichText,
  TitlePropertyValue,
} from "@notionhq/client/build/src/api-types";

const getTitleFromPage = (
  page: PagesRetrieveResponse,
  titleKey: string = "Name"
) => {
  let title: RichText[] = [];
  if (page.parent.type === "page_id" || page.parent.type === "workspace") {
    title = (page.properties.title as TitlePropertyValue).title;
  } else if (page.parent.type === "database_id") {
    title = (page.properties[titleKey] as TitlePropertyValue).title;
  }
  return title.map(({ plain_text }) => plain_text).join("");
};

export default getTitleFromPage;
