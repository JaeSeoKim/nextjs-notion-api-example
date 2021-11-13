import { GetPagePropertyResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import classes from "../../../../lib/classes";
import useRequest from "../../../../lib/hooks/useRequest";
import { getTitleFromPage } from "../../../../lib/notion";
import { GetPagesResData } from "../../../../pages/api/pages/[page_id]";

type RichTextOf<T> = T extends { type: "rich_text" } ? T : never;
type RichText = RichTextOf<GetPagePropertyResponse>;
type RichTextMentionOf<T> = T extends { type: "mention" } ? T : never;
type RichTextMention = RichTextMentionOf<RichText["rich_text"]>;
type RichTextMentionPageOf<T> = T extends { type: "page" } ? T : never;
type RichTextMentionPage = RichTextMentionPageOf<
  RichTextMention["mention"]
>;
interface PageMentionProps {
  mention: RichTextMentionPage;
  className?: string;
}

const PageMention: React.FC<PageMentionProps> = ({ mention, className }) => {
  const { page } = mention;
  const { data, error } = useRequest<GetPagesResData>({
    url: `/api/pages/${page.id}`,
  });

  if (error || data?.page === null) {
    return (
      <Link href={`/pages/${page.id}`}>
        <a className={classes([className])}>requests fail: {page.id}</a>
      </Link>
    );
  }

  if (data === undefined) {
    return (
      <Link href={`/pages/${page.id}`}>
        <a className={classes([className])} title={`loading-page-${page.id}`}>
          Loading 📡
        </a>
      </Link>
    );
  }

  const title = getTitleFromPage(data.page);

  return (
    <Link href={`/pages/${page.id}`}>
      <a className={classes([className])} title={title}>
        {title}
      </a>
    </Link>
  );
};

export default PageMention;
