import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import LabelIcon from "@mui/icons-material/Label"
import { Box, Checkbox, TableCell, TableRow, useTheme } from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { MdCheckCircleOutline } from "react-icons/md"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import { SkillDto } from "../../../../types/domain/skillbase/SkillDto"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"
import SkillLevelTD from "./SkillLevelTd/SkillLevelTd"

interface Props {
  skill: SkillDto
  index: number
  isSelected: boolean
  onCheck: (e: React.MouseEvent, skillId: number) => void
  openLabelsDialog: (skill: SkillDto) => void
}

// PE 3/3
const SkillbaseTableRow = (props: Props) => {
  const { tags: allTags } = useRelearnStore()

  const theme = useTheme()
  const classes = useStyles()
  const { setEditingSkill } = useSkillbaseStore()

  const labelId = `enhanced-table-checkbox-${props.index}`

  const findTagById = (id: number) => {
    return allTags.find((tag) => tag.id === props.skill.tagId)
  }

  const [tag, setTag] = useState<TagDto | undefined>(
    findTagById(Number(props.skill.tagId))
  )

  const isCompleted = useMemo(() => {
    if (props.skill.goalLevel === null) return false
    return props.skill.currentLevel === props.skill.goalLevel
  }, [props.skill])

  useEffect(
    () => {
      if (props.skill.tagId) {
        setTag(findTagById(props.skill.tagId))
      }

      return () => {
        window.removeEventListener("keydown", openDialogShortcutEvent)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(
    () => {
      if (props.skill.tagId) {
        setTag(findTagById(props.skill.tagId))
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.skill.tagId, allTags]
  )

  const currentGoalStep = useMemo(() => {
    return props.skill.expectations?.find((e) => e.isCurrentGoal)
  }, [props.skill])

  const openDialogShortcutEvent = useCallback((e: KeyboardEvent) => {
    if (e.key === "l") props.openLabelsDialog(props.skill)
  }, [])

  return (
    <TableRow
      hover
      role="checkbox"
      onClick={() => setEditingSkill(props.skill)}
      aria-checked={props.isSelected}
      tabIndex={-1}
      selected={props.isSelected}
      className={classes.root}
      onMouseEnter={() => {
        window.addEventListener("keydown", openDialogShortcutEvent)
      }}
      onMouseLeave={() => {
        window.removeEventListener("keydown", openDialogShortcutEvent)
      }}
    >
      <TableCell align="center" width={50}>
        {props.index + 1}
      </TableCell>

      <TableCell width={280}>
        <FlexCol style={{ gap: 8 }}>
          {!!props.skill?.labels?.length && (
            <Flex style={{ flexWrap: "wrap", gap: 4 }}>
              {props.skill.labels.map((label) => (
                <div
                  key={label.id}
                  style={{
                    background: label.bgColor,
                    padding: "2px 4px",
                    borderRadius: 4,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {label.name}
                </div>
              ))}
            </Flex>
          )}

          <Box style={{ display: "inline-flex" }}>
            <span>
              {props.skill.name}
              {isCompleted && (
                <MdCheckCircleOutline
                  color={theme.palette.success.main}
                  style={{
                    position: "relative",
                    left: 4,
                    top: 3,
                    fontSize: 16,
                  }}
                />
              )}
            </span>
          </Box>
        </FlexCol>
      </TableCell>

      <SkillLevelTD
        value={Number(props.skill.currentLevel)}
        rightValue={currentGoalStep?.level}
      />
      <SkillLevelTD value={Number(props.skill.goalLevel)} />

      <TableCell>
        {tag ? (
          <FlexVCenter>
            <LabelIcon style={{ color: tag.color }} />
            <Box ml={1}>{tag.name}</Box>
          </FlexVCenter>
        ) : null}
      </TableCell>

      <TableCell padding="checkbox">
        <Checkbox
          checked={props.isSelected}
          onClick={(event) => {
            event.stopPropagation()
            props.onCheck(event, Number(props.skill.id))
          }}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>
    </TableRow>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    cursor: "pointer",
  },

  isNotPriority: {
    color: theme.palette.grey[800],
  },
  basicBg: {
    background: "#ffaa00",
  },
  intermediaryBg: {
    background: "#3DAC8D",
  },
  advancedBg: {
    background: "#C862AC",
  },
}))

export default SkillbaseTableRow
