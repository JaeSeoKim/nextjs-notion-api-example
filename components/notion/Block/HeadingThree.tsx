import React from "react";
import { HeadingThreeBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import styles from "./HeadingThree.module.scss";

export interface HeadingThreeProps {
  value: HeadingThreeBlock;
}

const HeadingThree: React.FC<HeadingThreeProps> = ({ value }) => {
  return (
    <h3 className={["notion-block", styles.headingThree].join(" ").trim()}>
      <RichTexts value={value.heading_3.text} />
    </h3>
  );
};
export default HeadingThree;
