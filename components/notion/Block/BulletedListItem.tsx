import React from "react";
import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichTexts } from "../RichText";
import Block from ".";
import styles from "./BulletedListItem.module.scss";
import classes from "../../../lib/classes";

type BulletedListItemBlockOf<T> = T extends { type: "bulleted_list_item" }
  ? T
  : never;

type BulletedListItemBlock = BulletedListItemBlockOf<GetBlockResponse>;

export interface BulletedListItemProps {
  value: BulletedListItemBlock;
  className?: string;
}

const BulletedListItem: React.FC<BulletedListItemProps> = ({
  value,
  className,
}) => {
  const { bulleted_list_item } = value;
  return (
    <>
      <li className={classes([className, styles.bulletedListItem])}>
        <RichTexts value={bulleted_list_item.text} />
      </li>
      {/* children 이 타입에 없습니다. */}
      {/* {bulleted_list_item.children && (
        <div className={classes(["ml-4"])}>
          {value.bulleted_list_item.children.map((child) => {
            return (
              <Block key={`${value.id}-child-${child.id}`} value={child} />
            );
          })}
        </div>
      )} */}
    </>
  );
};
export default BulletedListItem;
