import { GetPagePropertyResponse } from "@notionhq/client/build/src/api-endpoints";
import classes from "../../../../lib/classes";
import getFormatTime from "../../../../lib/getFormatTime";
import getRelativeTime from "../../../../lib/getRelativeTime";

type RichTextOf<T> = T extends { type: "rich_text" } ? T : never;

type RichText = RichTextOf<GetPagePropertyResponse>;
type RichTextMentionOf<T> = T extends { type: "mention" } ? T : never;
type RichTextMention = RichTextMentionOf<RichText["rich_text"]>;
type RichTextMentionDateOf<T> = T extends { type: "date" } ? T : never;
type RichTextMentionDate = RichTextMentionDateOf<RichTextMention["mention"]>;

interface DateMentionProps {
  mention: RichTextMentionDate;
  className?: string;
}

const DateMention: React.FC<DateMentionProps> = ({ mention, className }) => {
  const { date } = mention;
  const startAt = getFormatTime(date.start);

  if (date.end) {
    const endAt = getFormatTime(date.end);

    return (
      <span className={classes([className])} title={`${startAt} → ${endAt}`}>
        {getRelativeTime(date.start)} → {getRelativeTime(date.end)}
      </span>
    );
  }

  return (
    <span className={classes([className])} title={startAt}>
      {getRelativeTime(date.start)}
    </span>
  );
};

export default DateMention;
