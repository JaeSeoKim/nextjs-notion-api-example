import { RichTextText } from "@notionhq/client/build/src/api-types";
import React from "react";

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
