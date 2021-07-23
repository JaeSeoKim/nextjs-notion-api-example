import React from "react";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import { RichTextEquation } from "@notionhq/client/build/src/api-types";

export interface EquationProps {
  value: RichTextEquation;
}

const Equation: React.FC<EquationProps> = ({ value }) => {
  return <TeX math={value.equation.expression} />;
};

export default Equation;
