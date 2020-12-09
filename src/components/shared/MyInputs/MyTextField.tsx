import { TextField } from "@material-ui/core";
import React from "react";

const MyTextField = (props: Props) => {

  return (
    <TextField size="small" autoComplete="off" variant="outlined" {...props} />
  );
};

type Props = React.ComponentProps<typeof TextField>;

export default MyTextField;
