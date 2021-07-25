import React from "react";
import { HeadingThreeBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import styles from "./HeadingThree.module.scss";
import classes from "../../../lib/classes";

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
