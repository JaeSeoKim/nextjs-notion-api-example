import React from "react";
import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichTexts } from "../RichText";
import Block from "./";
import styles from "./Paragraph.module.scss";
import classes from "../../../lib/classes";

type ParagraphBlockOf<T> = T extends { type: "paragraph" } ? T : never;
type ParagraphBlock = ParagraphBlockOf<GetBlockResponse>;
export interface ParagraphProps {
  value: ParagraphBlock;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ value, className }) => {
  return (
    <p className={classes([className, styles.paragraph])}>
      <RichTexts value={value.paragraph.text} />
      {/* children 이 타입에 없습니다. */}
      {/* {value.paragraph.children && (
        <div className={classes(["ml-4"])}>
          {value.paragraph.children.map((child) => {
            return (
              <Block key={`${value.id}-child-${child.id}`} value={child} />
            );
          })}
        </div>
      )} */}
    </p>
  );
};
export default Paragraph;
