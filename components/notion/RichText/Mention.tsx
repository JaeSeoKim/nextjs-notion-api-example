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
import useRequest from "../../../lib/hooks/useRequest";
import { getPagesResData } from "../../../pages/api/pages/[page_id]";
import { getTitleFromPage } from "../../../lib/notion";

interface UserMentionProps {
  mention: UserMentionType;
}

const UserMention: React.FC<UserMentionProps> = ({ mention }) => {
  const { user } = mention;

  return (
    <span className={[styles.mention].join(" ").trim()}>
      {user.avatar_url && (
        <span className={styles.avatar}>
          {/*

          ISSUES: https://github.com/vercel/next.js/pull/21475

          <Image
            src={user.avatar_url}
            alt={`${user?.name} profile image`.trim()}
            width={24}
            height={24}
            layout="fixed"
          /> */}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatar_url}
            alt={`${user?.name} profile image`.trim()}
            width={24}
            height={24}
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
  const timeFormat = "YYYY MM/DD mm:ss";
  const { date } = mention as unknown as DatePropertyValue;
  const startAt = dayjs(date.start).format(timeFormat);
  if (date.end) {
    const endAt = dayjs(date.end).format(timeFormat);

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
  const { data, error } = useRequest<getPagesResData>({
    url: `/api/pages/${page.id}`,
  });

  if (error) {
    return <span className={styles.page}>requests fail: {page.id}</span>;
  }

  if (data === undefined) {
    return <span className={styles.page}>loading...: {page.id}</span>;
  }

  const title = getTitleFromPage(data.page);

  return (
    <span className={[styles.page].join(" ").trim()} title={title}>
      {title}
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
