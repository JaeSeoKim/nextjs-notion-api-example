import React from "react";
import { ToDoBlock } from "@notionhq/client/build/src/api-types";
import { RichTexts } from "../RichText";
import Block from ".";
import styles from "./ToDo.module.scss";

export interface ToDoProps {
  value: ToDoBlock;
}

const ToDo: React.FC<ToDoProps> = ({ value }) => {
  return (
    <div className={[styles.toDo].join(" ").trim()}>
      <label
        className={[
          styles["toDo-checkbox"],
          value.to_do.checked ? styles.checked : "",
        ]
          .join(" ")
          .trim()}
        htmlFor={value.id}
      >
        <input
          type="checkbox"
          id={value.id}
          onClick={(e) => {
            e.preventDefault();
            return false;
          }}
          defaultChecked={value.to_do.checked}
        />
        <RichTexts value={value.to_do.text} />
      </label>
      {value.to_do.children && (
        <div className={["ml-4"].join(" ").trim()}>
          {value.to_do.children.map((child) => {
            return (
              <Block key={`${value.id}-child-${child.id}`} value={child} />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ToDo;
