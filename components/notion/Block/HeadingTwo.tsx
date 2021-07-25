import React from "react";
import { HeadingTwoBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import styles from "./HeadingTwo.module.scss";
import classes from "../../../lib/classes";

export interface HeadingTwoProps {
  value: HeadingTwoBlock;
  className?: string;
}

const HeadingTwo: React.FC<HeadingTwoProps> = ({ value, className }) => {
  return (
    <h2 className={classes([className, styles.headingTwo])}>
      <RichTexts value={value.heading_2.text} />
    </h2>
  );
};
export default HeadingTwo;
