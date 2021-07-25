import React from "react";
import { BulletedListItemBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import Block from ".";
import styles from "./BulletedListItem.module.scss";
import classes from "../../../lib/classes";

export interface BulletedListItemProps {
  value: BulletedListItemBlock;
  className?: string;
}

const BulletedListItem: React.FC<BulletedListItemProps> = ({
  value,
  className,
}) => {
  return (
    <>
      <li className={classes([className, styles.bulletedListItem])}>
        <RichTexts value={value.bulleted_list_item.text} />
      </li>
      {value.bulleted_list_item.children && (
        <div className={classes(["ml-4"])}>
          {value.bulleted_list_item.children.map((child) => {
            return (
              <Block key={`${value.id}-child-${child.id}`} value={child} />
            );
          })}
        </div>
      )}
    </>
  );
};
export default BulletedListItem;
