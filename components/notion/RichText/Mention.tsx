import {
  DatabaseMention as DatabaseMentionType,
  DateMention as DateMentionType,
  DatePropertyValue,
  PageMention as PageMentionType,
  RichTextMention as RichTextMention,
  UserMention as UserMentionType,
} from "@notionhq/client/build/src/api-types";
import React, { Ref } from "react";
import Image from "next/image";
import styles from "./Mention.module.scss";
import getRelativeTime from "../../../lib/getRelativeTime";
import useRequest from "../../../lib/hooks/useRequest";
import { getPagesResData } from "../../../pages/api/pages/[page_id]";
import { getTitleFromPage } from "../../../lib/notion";
import { databasesResData } from "../../../pages/api/databases/[database_id]";
import dayjs from "dayjs";

interface UserMentionProps {
  mention: UserMentionType;
}

const UserMention: React.FC<UserMentionProps> = ({ mention }) => {
  const { user } = mention;

  return (
    <span className={[styles.mention].join(" ").trim()}>
      {user.name ? user.name : user.id}
      {user.avatar_url && (
        <span>
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
    </span>
  );
};

interface DatabaseMentionProps {
  mention: DatabaseMentionType;
}

const DatabaseMention: React.FC<DatabaseMentionProps> = ({ mention }) => {
  const { database } = mention;

  const { data, error } = useRequest<databasesResData>({
    url: `/api/databases/${database.id}`,
  });

  if (error || data?.database === null) {
    return <span className={styles.page}>requests fail: {database.id}</span>;
  }

  if (data === undefined) {
    return (
      <span
        className={styles.database}
        title={`loading-database-${database.id}`}
      >
        Loading 📡
      </span>
    );
  }

  const title = data.database.title.map((value) => value.plain_text).join("");

  return (
    <span className={[styles.database].join(" ").trim()} title={title}>
      {title}
    </span>
  );
};

interface DateMentionProps {
  mention: DateMentionType;
}

const DateMention: React.FC<DateMentionProps> = ({ mention }) => {
  const DateTimeFormat = "YYYY-MM-DD HH:mm";
  const { date } = mention as unknown as DatePropertyValue;
  const startAt = dayjs(date.start).format(DateTimeFormat);

  if (date.end) {
    const endAt = dayjs(date.end).format(DateTimeFormat);

    return (
      <span
        className={[styles.mention].join(" ").trim()}
        title={`${startAt} → ${endAt}`}
      >
        {getRelativeTime(date.start)} → {getRelativeTime(date.end)}
      </span>
    );
  }

  return (
    <span className={[styles.mention].join(" ").trim()} title={startAt}>
      {getRelativeTime(date.start)}
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

  if (error || data?.page === null) {
    return <span className={styles.page}>requests fail: {page.id}</span>;
  }

  if (data === undefined) {
    return (
      <span className={styles.page} title={`loading-page-${page.id}`}>
        Loading 📡
      </span>
    );
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
