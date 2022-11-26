import {
  IconButton,
  TableCell,
  TableRow,
  TextareaAutosize,
  Theme,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { TD } from "components/_UI/Table/MyTableWrappers"
import {
  LearningsQuery,
  useLearningsQuery,
  useUpdateLearningMutation,
} from "generated/graphql"
import useDebounce from "hooks/utils/useDebounce"
import { createRef, useEffect, useState } from "react"
import { MdStar } from "react-icons/md"
import { useQueryClient } from "react-query"
import { pushOrReplace } from "utils/array/pushOrReplace"
import buildGraphqlClient from "utils/consts/buildGraphqlClient"
import colors from "utils/consts/colors"

interface Props {
  initialValue: LearningsQuery["learnings"][0]
  index: number
}

const DiaryTableRow = (props: Props) => {
  const classes = useStyles()

  const qc = useQueryClient()
  const { data } = useLearningsQuery(buildGraphqlClient())

  const {
    mutate: updateLearning,
    isLoading: isUpdating,
  } = useUpdateLearningMutation(buildGraphqlClient(), {
    onSuccess: (res) => {
      const prevLearnings = [...data.learnings]
      const newLearnings = pushOrReplace(
        prevLearnings,
        res.updateLearning,
        "id"
      )
      qc.setQueryData(useLearningsQuery.getKey(), {
        ...data,
        learnings: newLearnings,
      })
    },
  })

  const [learning, setLearning] = useState(props.initialValue)
  const debouncedLearning = useDebounce(learning, 500)

  const changeDescription = (newValue: string) => {
    setLearning((prev) => ({
      ...prev,
      description: newValue,
    }))
  }

  const toggleHighlight = () => {
    setLearning((prev) => ({
      ...prev,
      isHighlight: !prev.isHighlight,
    }))
  }

  const handleChangeDatetime = (newValue: Date) => {
    setLearning((prev) => ({
      ...prev,
      datetime: newValue.toISOString(),
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
        },
      })
    }
  }, [debouncedLearning])

  const descriptionRef = createRef<HTMLTextAreaElement>()

  const focusDescription = () => descriptionRef.current.focus()
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
      <TD align="center" className={classes.td}>
        {new Date(learning.datetime).toLocaleString()}
        {/* <DateTimePicker
          value={new Date(learning.datetime)}
          onChange={handleChangeDatetime}
        /> */}
      </TD>
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
