import { makeStyles, TableCell } from "@material-ui/core";
import clsx from "clsx";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import React from "react";
import { useTheme } from "styled-components";
import Icons from "utils/styles/Icons";

// PE 2/3 - Not so easy to understand the classes logic
const SkillLevelTd = (props: { value: number; done?: boolean }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <TableCell
      align="center"
      className={clsx(classes.root, {
        [classes.basic]: props.value >= 1 && props.value <= 3,
        [classes.intermediary]: props.value >= 4 && props.value <= 6,
        [classes.advanced]: props.value >= 7 && props.value <= 10,
      })}
    >
      <FlexVCenter justifyContent="center" style={{ gap: theme.spacing(0.5) }}>
        {props.value}

        {props.done && <Icons.Done fontSize="small" />}
      </FlexVCenter>
    </TableCell>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
    width: 50,
  },

  basic: {
    background: "#FFF2CC",
    // color: "#ffaa00",
  },
  intermediary: {
    background: "#B6D7A8",
  },
  advanced: {
    background: "#B4A7D6",

    // color: "#C862AC",
  },
}));

export default SkillLevelTd;
