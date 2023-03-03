import { TableCell, TableRow, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { TD } from "components/_UI/Table/MyTableWrappers"
import {
  LearningsQuery,
  useLearningsQuery,
  useUpdateLearningMutation,
} from "generated/graphql"
import useDebounce from "hooks/utils/useDebounce"
import { useMyMediaQuery } from "hooks/utils/useMyMediaQuery"
import { createRef, useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import TextareaAutosize from "react-textarea-autosize"
import { pushOrReplace } from "utils/array/pushOrReplace"
import buildGraphqlClient from "utils/consts/buildGraphqlClient"

interface Props {
  initialValue: LearningsQuery["learnings"][0]
  index: number
}

const DiaryTableRow = (props: Props) => {
  const classes = useStyles()

  const qc = useQueryClient()

  const { downSm } = useMyMediaQuery()

  const { mutate: updateLearning } = useUpdateLearningMutation(
    buildGraphqlClient(),
    {
      onSuccess: (res) => {
        qc.setQueryData<LearningsQuery>(useLearningsQuery.getKey(), (curr) => ({
          ...curr,
          learnings: pushOrReplace(curr.learnings, res.updateLearning, "id"),
        }))
      },
    }
  )

  const [learning, setLearning] = useState(props.initialValue)
  const debouncedLearning = useDebounce(learning, 500)

  const changeDescription = (newValue: string) => {
    setLearning((prev) => ({
      ...prev,
      description: newValue,
    }))
  }

  const changePoints = (newValue: number) => {
    setLearning((prev) => ({
      ...prev,
      points: newValue,
    }))
  }

  useEffect(() => {
    if (
      JSON.stringify(props.initialValue) !== JSON.stringify(debouncedLearning)
    ) {
      updateLearning({
        input: {
          id: debouncedLearning.id,
          datetime: debouncedLearning.datetime,
          description: debouncedLearning.description,
          isHighlight: debouncedLearning.isHighlight,
          points: debouncedLearning.points,
        },
      })
    }
  }, [debouncedLearning])

  const descriptionRef = createRef<HTMLTextAreaElement>()

  const focusDescription = () => descriptionRef.current.focus()
  return (
    <TableRow>
      {!downSm && (
        <TD align="center" className={classes.td}>
          {new Date(learning.datetime).toLocaleTimeString("en-GB", {
            // show 00:01 instead of 24:01
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </TD>
      )}

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
        <input
          min={1}
          value={learning.points}
          onChange={(e) => {
            const num = parseInt(e.target.value)
            if (num > 0) {
              changePoints(num)
              return
            }
            changePoints(0)
          }}
          style={{
            background: "none",
            color: "white",
            border: "1px solid gray",
            borderRadius: 4,
            textAlign: "center",
            width: 40,
            padding: 4,
          }}
        />
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
