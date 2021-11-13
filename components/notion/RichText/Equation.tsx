import React from "react";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import { GetPagePropertyResponse } from "@notionhq/client/build/src/api-endpoints";

type RichTextOf<T> = T extends { type: "rich_text" } ? T : never;

type RichText = RichTextOf<GetPagePropertyResponse>;
type RichTextType = RichText["rich_text"];
type RichTextEquationOf<T> = T extends { type: "equation" } ? T : never;
type RichTextEquation = RichTextEquationOf<RichTextType>;
export interface EquationProps {
  value: RichTextEquation;
}

const Equation: React.FC<EquationProps> = ({ value }) => {
  return <TeX math={value.equation.expression} />;
};

export default Equation;
