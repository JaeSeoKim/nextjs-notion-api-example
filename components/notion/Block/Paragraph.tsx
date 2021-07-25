import React from "react";
import { ParagraphBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import Block from "./";
import styles from "./Paragraph.module.scss";
import classes from "../../../lib/classes";

export interface ParagraphProps {
  value: ParagraphBlock;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ value, className }) => {
  return (
    <p className={classes([className, styles.paragraph])}>
      <RichTexts value={value.paragraph.text} />
      {value.paragraph.children && (
        <div className={classes(["ml-4"])}>
          {value.paragraph.children.map((child) => {
            return (
              <Block key={`${value.id}-child-${child.id}`} value={child} />
            );
          })}
        </div>
      )}
    </p>
  );
};
export default Paragraph;
