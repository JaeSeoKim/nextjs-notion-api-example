import React from "react";
import { NumberedListItemBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import Block from ".";
import styles from "./NumberedListItem.module.scss";

export interface NumberedListItemProps {
  value: NumberedListItemBlock;
}

const NumberedListItem: React.FC<NumberedListItemProps> = ({ value }) => {
  return (
    <li className={[styles.numberedListItem].join("").trim()}>
      <RichTexts value={value.numbered_list_item.text} />
      {value.numbered_list_item.children && (
        <div className={["ml-4"].join(" ").trim()}>
          {value.numbered_list_item.children.map((child) => {
            return (
              <Block key={`${value.id}-child-${child.id}`} value={child} />
            );
          })}
        </div>
      )}
    </li>
  );
};
export default NumberedListItem;
