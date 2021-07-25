import React from "react";
import { HeadingOneBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import styles from "./HeadingOne.module.scss";
import classes from "../../../lib/classes";

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
