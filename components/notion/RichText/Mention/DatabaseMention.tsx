import { DatabaseMention as DatabaseMentionType } from "@notionhq/client/build/src/api-types";
import classes from "../../../../lib/classes";
import useRequest from "../../../../lib/hooks/useRequest";
import { GetDatabasesResData } from "../../../../pages/api/databases/[database_id]";

interface DatabaseMentionProps {
  mention: DatabaseMentionType;
  className?: string;
}

const DatabaseMention: React.FC<DatabaseMentionProps> = ({
  mention,
  className,
}) => {
  const { database } = mention;

  const { data, error } = useRequest<GetDatabasesResData>({
    url: `/api/databases/${database.id}`,
  });

  if (error || data?.database === null) {
    return (
      <span className={classes([className])}>requests fail: {database.id}</span>
    );
  }

  if (data === undefined) {
    return (
      <span
        className={classes([className])}
        title={`loading-database-${database.id}`}
      >
        Loading 📡
      </span>
    );
  }

  const title = data.database.title.map((value) => value.plain_text).join("");

  return (
    <span className={classes([className])} title={title}>
      {title}
    </span>
  );
};

export default DatabaseMention;
