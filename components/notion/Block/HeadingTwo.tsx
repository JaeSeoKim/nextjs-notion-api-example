import React from "react";
import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichTexts } from "../RichText";
import styles from "./HeadingTwo.module.scss";
import classes from "../../../lib/classes";

type HeadingTwoBlockOf<T> = T extends { type: "heading_2" } ? T : never;

type HeadingTwoBlock = HeadingTwoBlockOf<GetBlockResponse>;
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
