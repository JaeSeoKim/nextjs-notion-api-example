import React from "react";
import { ChildPageBlock } from "@notionhq/client/build/src/api-types";
import styles from "./ChildPage.module.scss";

export interface ChildPageProps {
  value: ChildPageBlock;
}

const ChildPage: React.FC<ChildPageProps> = ({ value }) => {
  return (
    <p className={[styles.childPage].join(" ").trim()}>
      {value.child_page.title}
    </p>
  );
};
export default ChildPage;
