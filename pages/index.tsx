import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Block from "../components/notion/Block";
import classes from "../lib/classes";
import {
  getAllBlocks,
  getBlocksWithChildren,
  getPage,
  getTitleFromPage,
} from "../lib/notion";

export const getStaticProps = async (_ctx: GetStaticPropsContext) => {
  if (typeof process.env.NOTION_INDEX_PAGE !== "string")
    throw new Error("Missing NOTION_INDEX_PAGE environment variable");
  const page = await getPage(process.env.NOTION_INDEX_PAGE);
  const blocks = await getAllBlocks(process.env.NOTION_INDEX_PAGE);
  const blocksWithAllChildren = await getBlocksWithChildren(blocks);
  return {
    props: {
      page,
      blocks: blocksWithAllChildren,
    },
    revalidate: 64,
  };
};

const indexPage = ({
  page,
  blocks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export default indexPage;
