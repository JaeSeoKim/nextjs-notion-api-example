import {
  DateMention as DateMentionType,
  DatePropertyValue,
} from "@notionhq/client/build/src/api-types";
import classes from "../../../../lib/classes";
import getFormatTime from "../../../../lib/getFormatTime";
import getRelativeTime from "../../../../lib/getRelativeTime";

interface DateMentionProps {
  mention: DateMentionType;
  className?: string;
}

const DateMention: React.FC<DateMentionProps> = ({ mention, className }) => {
  const { date } = mention as unknown as DatePropertyValue;
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
