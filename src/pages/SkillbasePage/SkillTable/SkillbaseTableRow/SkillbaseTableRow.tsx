import {
  Box,
  Checkbox,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core"
import LabelIcon from "@material-ui/icons/Label"
import StarIcon from "@material-ui/icons/Star"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter"
import { SkillDto } from "../../../../dtos/skillbase/SkillDto"
import { TagDto } from "../../../../interfaces/dtos/relearn/TagDto"
import {
  setEditingSkill,
  setSkill,
} from "../../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../../store/store"
import SkillLevelTD from "./SkillLevelTd/SkillLevelTd"

// PE 3/3
const SkillbaseTableRow = (props: Props) => {
  const classes = useStyles()
  const labelId = `enhanced-table-checkbox-${props.index}`

  const findTagById = (id: number) => {
    return props.allTags.find((tag) => tag.id === props.skill.tagId)
  }

  const [tag, setTag] = useState<TagDto>(findTagById(props.skill.tagId))

  useEffect(
    () => {
      if (props.skill.tagId) {
        setTag(findTagById(props.skill.tagId))
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
    [props.skill.tagId, props.allTags]
  )

  return (
    <TableRow
      hover
      role="checkbox"
      onClick={() => props.setEditingSkill(props.skill)}
      aria-checked={props.isSelected}
      tabIndex={-1}
      selected={props.isSelected}
      className={classes.root}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={props.isSelected}
          onClick={(event) => {
            event.stopPropagation()
            props.onCheck(event, props.skill.id)
          }}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>
      <TableCell align="center" width={100}>
        <StarIcon
          className={clsx({
            [classes.isPriority]: props.skill.isPriority,
            [classes.isNotPriority]: !props.skill.isPriority,
          })}
        />
      </TableCell>

      <TableCell width={180}>
        <Flex>
          {props.skill.isPriority ? (
            <span style={{ fontWeight: 900 }}>{props.skill.name}</span>
          ) : (
            props.skill.name
          )}

          {/* {(props.skill.currentLevel || props.skill.goalLevel) && (
            <SkillLevelChip
              currentLevel={props.skill.currentLevel}
              goalLevel={props.skill.goalLevel}
            />
          )} */}
        </Flex>
      </TableCell>

      <SkillLevelTD
        value={props.skill.currentLevel}
        isPriority={props.skill.isPriority}
      />
      <SkillLevelTD
        value={props.skill.goalLevel}
        isPriority={props.skill.isPriority}
      />
      {/* 
      <TableCell>
        <DependenciesTableCell values={props.skill.dependencies} />
      </TableCell> */}
      <TableCell>
        {tag ? (
          <FlexVCenter>
            <LabelIcon style={{ color: tag.color }} />
            <Box ml={1}>{tag.name}</Box>
          </FlexVCenter>
        ) : null}
      </TableCell>
    </TableRow>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
  },
  isPriority: {
    color: "#ffb400",
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

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setEditingSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),

  setSkill: (skill: SkillDto) => dispatch(setSkill(skill)),
})

interface OwnProps {
  skill: SkillDto
  index: number
  isSelected: boolean
  onCheck: (e: React.MouseEvent, skillId: number) => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(SkillbaseTableRow)
