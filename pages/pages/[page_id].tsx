import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Block from "../../components/notion/Block";
import { Block as BlockType } from "@notionhq/client/build/src/api-types";
import { PagesRetrieveResponse } from "@notionhq/client/build/src/api-endpoints";
import classes from "../../lib/classes";
import {
  getAllBlocks,
  getBlocksWithChildren,
  getPage,
  getTitleFromPage,
} from "../../lib/notion";
import Loading from "../../components/Loding";

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps = async (
  ctx: GetStaticPropsContext<{
    page_id: string;
  }>
) => {
  const { page_id } = ctx.params!;

  try {
    const page = await getPage(page_id);
    const blocks = await getAllBlocks(process.env.NOTION_INDEX_PAGE);
    const blocksWithAllChildren = await getBlocksWithChildren(blocks);
    return {
      props: {
        page,
        blocks: blocksWithAllChildren,
      },
      revalidate: 64,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const PageByIdPage = ({
  page,
  blocks,
}: {
  page: PagesRetrieveResponse;
  blocks: BlockType[];
}) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <Loading
        className={classes([
          "container",
          "min-w-screen-md",
          "min-h-screen",
          "mx-auto",
          "w-8",
        ])}
      />
    );
  }

  const title = getTitleFromPage(page);
  return (
    <div
      className={classes(["container", "max-w-screen-md", "mx-auto", "px-2"])}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={classes(["text-4xl", "py-3", "font-bold"])}>{title}</h1>
        <hr />
        {blocks.map((block) => (
          <Block key={`${block.id}-${new Date()}`} value={block} />
        ))}
      </article>
    </div>
  );
};

export default PageByIdPage;
