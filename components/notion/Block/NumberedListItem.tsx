import React from "react";
import { NumberedListItemBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import Block from ".";
import styles from "./NumberedListItem.module.scss";
import classes from "../../../lib/classes";

export interface NumberedListItemProps {
  value: NumberedListItemBlock;
  className?: string;
}

const NumberedListItem: React.FC<NumberedListItemProps> = ({
  value,
  className,
}) => {
  return (
    <>
      <li className={classes([className, styles.numberedListItem])}>
        <RichTexts value={value.numbered_list_item.text} />
      </li>
      {value.numbered_list_item.children && (
        <div className={classes(["ml-4"])}>
          {value.numbered_list_item.children.map((child) => {
            return (
              <Block key={`${value.id}-child-${child.id}`} value={child} />
            );
          })}
        </div>
      )}
    </>
  );
};
export default NumberedListItem;
