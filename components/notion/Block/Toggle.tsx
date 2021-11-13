import React from "react";
import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichTexts } from "../RichText";
import Block from ".";
import styles from "./Toggle.module.scss";
import classes from "../../../lib/classes";

type ToggleBlockOf<T> = T extends { type: "toggle" } ? T : never;

type ToggleBlock = ToggleBlockOf<GetBlockResponse>;
export interface ToggleProps {
  value: ToggleBlock;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ value, className }) => {
  return (
    <details className={classes([styles.toggle])}>
      <summary className={classes([className])}>
        <RichTexts value={value.toggle.text} />
      </summary>
      {/* no children */}
      {/* {value.toggle.children && (
        <div className={classes(["ml-4"])}>
          {value.toggle.children.map((child) => {
            return (
              <Block key={`${value.id}-child-${child.id}`} value={child} />
            );
          })}
        </div>
      )} */}
    </details>
  );
};
export default Toggle;
