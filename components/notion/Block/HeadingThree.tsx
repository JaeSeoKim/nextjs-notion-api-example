import React from "react";
import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichTexts } from "../RichText";
import styles from "./HeadingThree.module.scss";
import classes from "../../../lib/classes";

type HeadingThreeBlockOf<T> = T extends { type: "heading_3" } ? T : never;

type HeadingThreeBlock = HeadingThreeBlockOf<GetBlockResponse>;
export interface HeadingThreeProps {
  value: HeadingThreeBlock;
  className?: string;
}

const HeadingThree: React.FC<HeadingThreeProps> = ({ value, className }) => {
  return (
    <h3 className={classes([className, styles.headingOne])}>
      <RichTexts value={value.heading_3.text} />
    </h3>
  );
};
export default HeadingThree;
