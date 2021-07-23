import React from "react";
import { HeadingTwoBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import styles from "./HeadingTwo.module.scss";

export interface HeadingTwoProps {
  value: HeadingTwoBlock;
}

const HeadingTwo: React.FC<HeadingTwoProps> = ({ value }) => {
  return (
    <h2 className={[styles.headingTwo].join(" ").trim()}>
      <RichTexts value={value.heading_2.text} />
    </h2>
  );
};
export default HeadingTwo;
