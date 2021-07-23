import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Block from "../components/notion/Block";
import { getBlocks, getPage, getTitleFromPage } from "../lib/notion";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  if (typeof process.env.NOTION_INDEX_PAGE !== "string")
    throw new Error("Missing NOTION_INDEX_PAGE environment variable");
  const page = await getPage(process.env.NOTION_INDEX_PAGE);
  const blocks = await getBlocks(process.env.NOTION_INDEX_PAGE);

  return {
    props: {
      page,
      blocks,
    },
    revalidate: 60,
  };
};

const indexPage = ({
  page,
  blocks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = getTitleFromPage(page);
  return (
    <div
      className={["container", "px-2"].join(" ").trim()}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={["text-4xl", "py-3", "font-bold"].join(" ").trim()}>
          {title}
        </h1>
        <hr />
        {blocks.map((block) => (
          <Block key={block.id} value={block} />
        ))}
      </article>
    </div>
  );
};

export default indexPage;
