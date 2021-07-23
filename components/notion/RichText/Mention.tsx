import {
  DatabaseMention as DatabaseMentionType,
  DateMention as DateMentionType,
  DatePropertyValue,
  PageMention as PageMentionType,
  RichTextMention as RichTextMention,
  UserMention as UserMentionType,
} from "@notionhq/client/build/src/api-types";
import React from "react";
import Image from "next/image";
import styles from "./Mention.module.scss";
import dayjs from "dayjs";

interface UserMentionProps {
  mention: UserMentionType;
}

const UserMention: React.FC<UserMentionProps> = ({ mention }) => {
  const { user } = mention;

  return (
    <span className={[styles.mention].join(" ").trim()}>
      {user.avatar_url && (
        <span className={styles.avatar}>
          <Image
            src={user.avatar_url}
            alt={`${user?.name} profile image`.trim()}
            width={24}
            height={24}
            layout="fixed"
          />
        </span>
      )}
      {user.name ? user.name : user.id}
    </span>
  );
};

interface DatabaseMentionProps {
  mention: DatabaseMentionType;
}

const DatabaseMention: React.FC<DatabaseMentionProps> = ({ mention }) => {
  const { database } = mention;

  return (
    <span
      className={[styles.database].join(" ").trim()}
      title={`database-${database.id}`}
    >
      {database.id}
    </span>
  );
};

interface DateMentionProps {
  mention: DateMentionType;
}

const DateMention: React.FC<DateMentionProps> = ({ mention }) => {
  const { date } = mention as unknown as DatePropertyValue;
  const startAt = dayjs(date.start).format("DD/MM YYYY mm:ss");
  if (date.end) {
    const endAt = dayjs(date.end).format("DD/MM YYYY mm:ss");

    return (
      <span
        className={[styles.mention].join(" ").trim()}
        title={`${startAt}-${endAt}`}
      >
        {startAt} → {endAt}
      </span>
    );
  }
  return (
    <span className={[styles.mention].join(" ").trim()} title={`${startAt}`}>
      {startAt}
    </span>
  );
};

interface PageMentionProps {
  mention: PageMentionType;
}

const PageMention: React.FC<PageMentionProps> = ({ mention }) => {
  const { page } = mention;
  return (
    <span className={[styles.page].join(" ").trim()} title={`page-${page.id}`}>
      {page.id}
    </span>
  );
};

interface MentionSwitchProps {
  mention:
    | UserMentionType
    | PageMentionType
    | DatabaseMentionType
    | DateMentionType;
}

const MentionSwitch: React.FC<MentionSwitchProps> = ({ mention }) => {
  switch (mention.type) {
    case "user":
      return <UserMention mention={mention} />;
    case "database":
      return <DatabaseMention mention={mention} />;
    case "page":
      return <PageMention mention={mention} />;
    case "date":
      return <DateMention mention={mention} />;
  }
};

export interface MentionProps {
  value: RichTextMention;
}

const Mention: React.FC<MentionProps> = ({ value }) => {
  return <MentionSwitch mention={value.mention} />;
};

export default Mention;
