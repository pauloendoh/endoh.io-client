import { Typography } from "@material-ui/core";
import React from "react";

const H5 = (props: Props) => {
  return (
    <Typography variant="h5" {...props}>
      {props.children}
    </Typography>
  );
};

type Props = React.ComponentProps<typeof Typography>;

export default H5;
