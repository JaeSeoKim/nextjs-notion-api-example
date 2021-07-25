import React from "react";
import { ChildPageBlock } from "@notionhq/client/build/src/api-types";
import styles from "./ChildPage.module.scss";
import classes from "../../../lib/classes";

export interface ChildPageProps {
  value: ChildPageBlock;
  className?: string;
}

const ChildPage: React.FC<ChildPageProps> = ({ value, className }) => {
  return (
    <p className={classes([className])}>
      {/* TODO: link to childpage link */}
      <a className={classes([styles.childPage])}>{value.child_page.title}</a>
    </p>
  );
};
export default ChildPage;
