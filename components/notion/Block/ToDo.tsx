import React from "react";
import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichTexts } from "../RichText";
import Block from ".";
import styles from "./ToDo.module.scss";
import classes from "../../../lib/classes";

type ToDoBlockOf<T> = T extends { type: "to_do" } ? T : never;

type ToDoBlock = ToDoBlockOf<GetBlockResponse>;
export interface ToDoProps {
  value: ToDoBlock;
  className?: string;
}

const ToDo: React.FC<ToDoProps> = ({ value, className }) => {
  return (
    <>
      <p className={classes([className, , styles.toDo])}>
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
      </p>
      {/* children 이 타입에 없습니다. */}
      {/* {value.to_do.children && (
        <div className={classes(["ml-4"])}>
          {value.to_do.children.map((child) => {
            return (
              <Block key={`${value.id}-child-${child.id}`} value={child} />
            );
          })}
        </div>
      )} */}
    </>
  );
};
export default ToDo;
