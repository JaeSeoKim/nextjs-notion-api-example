import React from "react";
import { ToggleBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import Block from ".";
import styles from "./Toggle.module.scss";

export interface ToggleProps {
  value: ToggleBlock;
}

const Toggle: React.FC<ToggleProps> = ({ value }) => {
  return (
    <details className={[styles.toggle].join(" ").trim()}>
      <summary>
        <RichTexts value={value.toggle.text} />
      </summary>
      {value.toggle.children && (
        <div className={["ml-4"].join(" ").trim()}>
          {value.toggle.children.map((child) => {
            return (
              <Block key={`${value.id}-child-${child.id}`} value={child} />
            );
          })}
        </div>
      )}
    </details>
  );
};
export default Toggle;
