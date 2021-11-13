import React from "react";
import { GetBlockResponse as BlockType } from "@notionhq/client/build/src/api-endpoints";
import styles from "./Block.module.scss";
import Paragraph from "./Paragraph";
import HeadingOne from "./HeadingOne";
import HeadingTwo from "./HeadingTwo";
import HeadingThree from "./HeadingThree";
import BulletedListItem from "./BulletedListItem";
import NumberedListItem from "./NumberedListItem";
import ImageBlock from "./Image";
import ToDo from "./ToDo";
import Toggle from "./Toggle";
import ChildPage from "./ChildPage";
interface BlockProps {
  value: BlockType;
}

const Block: React.FC<BlockProps> = ({ value }) => {
  console.log(value);
  switch (value.type) {
    case "paragraph":
      return <Paragraph className={styles["notion-block"]} value={value} />;
    case "heading_1":
      return <HeadingOne className={styles["notion-block"]} value={value} />;
    case "heading_2":
      return <HeadingTwo className={styles["notion-block"]} value={value} />;
    case "heading_3":
      return <HeadingThree className={styles["notion-block"]} value={value} />;
    case "bulleted_list_item":
      return (
        <BulletedListItem className={styles["notion-block"]} value={value} />
      );
    case "numbered_list_item":
      return (
        <NumberedListItem className={styles["notion-block"]} value={value} />
      );
    case "to_do":
      return <ToDo className={styles["notion-block"]} value={value} />;
    case "toggle":
      return <Toggle className={styles["notion-block"]} value={value} />;
    case "child_page":
      return <ChildPage className={styles["notion-block"]} value={value} />;
    case "image":
      return <ImageBlock className={styles["notion-block"]} value={value} />;
    default:
      console.info(
        `ℹ️ Unsupported block (${value.type}) - https://developers.notion.com/reference/block`
      );
      return (
        <p className={styles["notion-block"]}>
          ℹ️ Unsupported block ({value.type})
        </p>
      );
  }
};

export default Block;
