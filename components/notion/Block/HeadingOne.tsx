import React from "react";
import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichTexts } from "../RichText";
import styles from "./HeadingOne.module.scss";
import classes from "../../../lib/classes";

type HeadingOneBlockOf<T> = T extends { type: "heading_1" } ? T : never;
type HeadingOneBlock = HeadingOneBlockOf<GetBlockResponse>;
export interface HeadingOneProps {
  value: HeadingOneBlock;
  className?: string;
}

const HeadingOne: React.FC<HeadingOneProps> = ({ value, className }) => {
  return (
    <h1 className={classes([className, styles.headingOne])}>
      <RichTexts value={value.heading_1.text} />
    </h1>
  );
};
export default HeadingOne;
