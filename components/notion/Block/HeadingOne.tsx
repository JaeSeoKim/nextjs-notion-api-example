import React from "react";
import { HeadingOneBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import styles from "./HeadingOne.module.scss";

export interface HeadingOneProps {
  value: HeadingOneBlock;
}

const HeadingOne: React.FC<HeadingOneProps> = ({ value }) => {
  return (
    <h1 className={["notion-block", styles.headingOne].join(" ").trim()}>
      <RichTexts value={value.heading_1.text} />
    </h1>
  );
};
export default HeadingOne;
