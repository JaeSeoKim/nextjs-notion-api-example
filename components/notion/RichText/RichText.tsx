import React from "react";
import { RichText as RichTextType } from "@notionhq/client/build/src/api-types";
import styles from "./RichText.module.scss";
import Text from "./Text";
import Equation from "./Equation";
import Mention from "./Mention";
import classes from "../../../lib/classes";

export interface SwitchRichTextProps {
  value: RichTextType;
}

export const SwitchRichText: React.FC<SwitchRichTextProps> = ({ value }) => {
  switch (value.type) {
    case "text":
      return <Text value={value} />;
    case "mention":
      return <Mention value={value} />;
    case "equation":
      return <Equation value={value} />;
  }
};

export interface RichTextProps {
  value: RichTextType;
}

const RichText: React.FC<RichTextProps> = ({ value }) => {
  const { annotations } = value;

  return (
    <span
      className={classes([
        styles.richtext,
        styles[`richtext-${annotations.color}`],
        annotations.bold ? styles["richtext-bold"] : "",
        annotations.italic ? styles["richtext-italic"] : "",
        annotations.underline ? styles["richtext-underline"] : "",
        annotations.strikethrough ? styles["richtext-strikethrough"] : "",
        annotations.code ? styles["richtext-code"] : "",
      ])}
    >
      <SwitchRichText value={value} />
    </span>
  );
};

export default RichText;
