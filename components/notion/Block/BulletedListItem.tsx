import React from "react";
import { BulletedListItemBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import Block from ".";
import styles from "./BulletedListItem.module.scss";

export interface BulletedListItemProps {
  value: BulletedListItemBlock;
}

const BulletedListItem: React.FC<BulletedListItemProps> = ({ value }) => {
  return (
    <>
      <li className={[styles.bulletedListItem].join("").trim()}>
        <RichTexts value={value.bulleted_list_item.text} />
      </li>
      {value.bulleted_list_item.children && (
        <div className={["ml-4"].join(" ").trim()}>
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
