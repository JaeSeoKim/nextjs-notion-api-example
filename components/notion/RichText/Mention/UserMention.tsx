import { UserMention as UserMentionType } from "@notionhq/client/build/src/api-types";

interface UserMentionProps {
  mention: UserMentionType;
  className?: string;
}

const UserMention: React.FC<UserMentionProps> = ({ mention, className }) => {
  const { user } = mention;

  return (
    <span className={[className].join(" ").trim()}>
      {user.avatar_url && (
        <span>
          {/*
          TODO: Change to next/image component
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

export default UserMention;
