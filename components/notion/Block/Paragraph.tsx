import React from "react";
import { ParagraphBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import Block from "./";
import styles from "./Paragraph.module.scss";

export interface ParagraphProps {
  value: ParagraphBlock;
}

const Paragraph: React.FC<ParagraphProps> = ({ value }) => {
  return (
    <p className={["notion-block", styles.paragraph].join(" ").trim()}>
      <RichTexts value={value.paragraph.text} />
      {value.paragraph.children && (
        <div className={["ml-4"].join(" ").trim()}>
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
