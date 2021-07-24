import React from "react";
import {
  RichText as RichTextType,
} from "@notionhq/client/build/src/api-types";
import RichText from "./";

export interface RichTextsProps {
  value: RichTextType[];
}

const RichTexts: React.FC<RichTextsProps> = ({ value }) => {
  return (
    <>
      {value.map((richText, index) => {
        return (
          <RichText
            key={`${richText.type}-${richText.plain_text}-${index}`}
            value={richText}
          />
        );
      })}
    </>
  );
};

export default RichTexts;
