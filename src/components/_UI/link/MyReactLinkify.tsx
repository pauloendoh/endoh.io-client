import React from "react";
import ReactLinkify from "react-linkify";
import { useTheme } from "styled-components";

type Props = React.ComponentProps<typeof ReactLinkify> & {
  openNewTab?: boolean;
};

const MyReactLinkify = (props: Props) => {
  const theme = useTheme();
  const componentDecorator = (href: string, text: string, key: number) => (
    <a
      href={href}
      key={key}
      target={props.openNewTab && "_blank"}
      rel={props.openNewTab && "noopener noreferrer"}
      style={{
        color: theme.palette.primary.main,
        fontWeight: "inherit",
        textDecoration: "underline",
      }}
    >
      {text}
    </a>
  );

  return <ReactLinkify componentDecorator={componentDecorator} {...props} />;
};

export default MyReactLinkify;
