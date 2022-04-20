import React from "react";
import linkPng from "../../../static/images/link.png";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
  fallbackSrc?: string;
};

const MyImage = (props: Props) => {
  return (
    <img
      {...props}
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.src = props.fallbackSrc || linkPng;
      }}
      alt={props.alt}
    />
  );
};

export default MyImage;
