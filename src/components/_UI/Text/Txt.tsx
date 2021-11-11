import { Typography } from "@material-ui/core";
import React from "react";

const Txt = (props: Props) => {
  return (
    <Typography  {...props}>
      {props.children}
    </Typography>
  );
};

type Props = React.ComponentProps<typeof Typography>;

export default Txt;
