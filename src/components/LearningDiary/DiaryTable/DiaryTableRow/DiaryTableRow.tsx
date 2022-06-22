import {
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
  TextareaAutosize,
} from "@material-ui/core";
import { LearningsQuery } from "generated/graphql";
import useDebounce from "hooks/utils/useDebounce";
import { createRef, useEffect, useState } from "react";
import { MdStar } from "react-icons/md";
import colors from "utils/consts/colors";

interface Props {
  initialValue: LearningsQuery["learnings"][0];
  index: number;
}

const DiaryTableRow = (props: Props) => {
  const classes = useStyles();

  const [learning, setLearning] = useState(props.initialValue);
  const debouncedLearning = useDebounce(learning, 500);

  const changeDescription = (newValue: string) => {
    setLearning((prev) => ({
      ...prev,
      description: newValue,
    }));
  };

  const toggleHighlight = () => {
    setLearning((prev) => ({
      ...prev,
      isHighlight: !prev.isHighlight,
    }));
  };

  useEffect(() => {
    console.log(debouncedLearning);
  }, [debouncedLearning]);

  const descriptionRef = createRef<HTMLTextAreaElement>();

  const focusDescription = () => descriptionRef.current.focus();
  return (
    <TableRow>
      <TableCell className={classes.td} align="center">
        {props.index + 1}
      </TableCell>
      <TableCell className={classes.textareaCell} onClick={focusDescription}>
        <TextareaAutosize
          ref={descriptionRef}
          onChange={(e) => changeDescription(e.target.value)}
          value={learning.description}
          className={classes.textarea}
          autoFocus
        />
      </TableCell>

      <TableCell align="center" className={classes.td}>
        <IconButton size="small" onClick={toggleHighlight}>
          <MdStar
            style={{
              color: learning.isHighlight
                ? colors.ratingYellow[5]
                : colors.ratingYellow[1],
            }}
          />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const useStyles = makeStyles((theme) => ({
  textareaCell: {
    cursor: "pointer !important",
  },
  td: {
    fontSize: 13,
  },
  textarea: {
    resize: "none",
    border: "none",
    minWidth: 125,
    width: "-webkit-fill-available",
    background: "none",
    fontSize: 13,
    fontFamily: theme.typography.fontFamily,
    color: "white",
    cursor: "pointer",
  },
}));

export default DiaryTableRow;
