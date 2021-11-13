import { GetPagePropertyResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";
import styles from "./Mention.module.scss";
import UserMention from "./UserMention";
import DatabaseMention from "./DatabaseMention";
import PageMention from "./PageMention";
import DateMention from "./DateMention";

type RichTextOf<T> = T extends { type: "rich_text" } ? T : never;

type RichText = RichTextOf<GetPagePropertyResponse>;
type RichTextMentionOf<T> = T extends { type: "mention" } ? T : never;
type RichTextMention = RichTextMentionOf<RichText["rich_text"]>;
export interface MentionProps {
  value: RichTextMention;
}

const Mention: React.FC<MentionProps> = ({ value }) => {
  const { mention } = value;
  switch (mention.type) {
    case "user":
      return <UserMention className={styles.mention} mention={mention} />;
    case "database":
      return <DatabaseMention className={styles.database} mention={mention} />;
    case "page":
      return <PageMention className={styles.page} mention={mention} />;
    case "date":
      return <DateMention className={styles.date} mention={mention} />;
  }
};

export default Mention;
