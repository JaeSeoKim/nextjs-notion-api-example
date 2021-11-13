import React from "react";
import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import styles from "./Image.module.scss";
import classes from "../../../lib/classes";

type TypeImageOf<T> = T extends { type: "image" } ? T : never;
type TypeImageExternalOf<T> = T extends { type: "external" } ? T : never;
type ImgeBlock = TypeImageOf<GetBlockResponse>;
type ImageExternalBlock = TypeImageExternalOf<ImgeBlock["image"]>;

export interface ImageBlockProps {
  value: ImgeBlock;
  className?: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ value, className }) => {
  const image = value.image as ImageExternalBlock;
  const url = image.external.url;
  return (
    <h1 className={classes([className, styles["image-container"]])}>
      <Image className={styles.image} src={url} alt="external" layout="fill" unoptimized />
    </h1>
  );
};
export default ImageBlock;
