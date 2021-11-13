import { GetPagePropertyResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";

type RichTextOf<T> = T extends { type: "rich_text" } ? T : never;

type RichText = RichTextOf<GetPagePropertyResponse>;
type RichTextTextOf<T> = T extends { type: "text" } ? T : never;
type RichTextText = RichTextTextOf<RichText["rich_text"]>;

export interface TextProps {
  value: RichTextText;
}

const Text: React.FC<TextProps> = ({ value }) => {
  const { text } = value;
  if (text.link) {
    return (
      <a href={text.link.url} target="_blank" rel="noopener noreferrer">
        {text.content}
      </a>
    );
  }
  return <>{text.content}</>;
};

export default Text;
