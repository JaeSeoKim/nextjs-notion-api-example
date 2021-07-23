import React, { ReactElement } from "react";
import { Block as BlockType } from "@notionhq/client/build/src/api-types";
import Paragraph from "./Paragraph";
import HeadingOne from "./HeadingOne";
import HeadingTwo from "./HeadingTwo";
import HeadingThree from "./HeadingThree";
import BulletedListItem from "./BulletedListItem";
import NumberedListItem from "./NumberedListItem";
import ToDo from "./ToDo";
import Toggle from "./Toggle";
import ChildPage from "./ChildPage";

interface BlockProps {
  value: BlockType;
}

const Block: React.FC<BlockProps> = ({ value }) => {
  switch (value.type) {
    case "paragraph":
      return <Paragraph value={value} />;
    case "heading_1":
      return <HeadingOne value={value} />;
    case "heading_2":
      return <HeadingTwo value={value} />;
    case "heading_3":
      return <HeadingThree value={value} />;
    case "bulleted_list_item":
      return <BulletedListItem value={value} />;
    case "numbered_list_item":
      return <NumberedListItem value={value} />;
    case "to_do":
      return <ToDo value={value} />;
    case "toggle":
      return <Toggle value={value} />;
    case "child_page":
      return <ChildPage value={value} />;
    default:
      console.info(
        `ℹ️ Unsupported block (${value.type}) - https://developers.notion.com/reference/block`
      );
      return <p>ℹ️ Unsupported block ({value.type})</p>;
  }
};

export default Block;
