import { TableCell, TableRow, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { TD } from "components/_UI/Table/MyTableWrappers"
import { LearningsQuery } from "generated/graphql"
import { useMyMediaQuery } from "hooks/utils/useMyMediaQuery"
import useLearningDialogStore from "store/zustand/dialogs/useLearningDialogStore"

interface Props {
  initialValue: LearningsQuery["learnings"][0]
  index: number
}

const DiaryTableRow = (props: Props) => {
  const classes = useStyles()

  const { downSm } = useMyMediaQuery()

  const { openDialog } = useLearningDialogStore()

  return (
    <TableRow
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        },
      }}
      onClick={() => openDialog(props.initialValue)}
    >
      {!downSm && (
        <TD align="center" className={classes.td}>
          {new Date(props.initialValue.datetime).toLocaleTimeString("en-GB", {
            // show 00:01 instead of 24:01
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </TD>
      )}

      <TableCell>{props.initialValue.description}</TableCell>

      <TableCell align="center" className={classes.td}>
        {props.initialValue.points}
      </TableCell>
    </TableRow>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
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
    fontSize: 14,
    fontFamily: theme.typography.fontFamily,
    color: "white",
    cursor: "pointer",
  },
}))

export default DiaryTableRow
