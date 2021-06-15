import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
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
import API from "../../../../consts/API"
import MY_AXIOS from "../../../../consts/MY_AXIOS"
import { SkillDto } from "../../../../dtos/skillbase/SkillDto"
import { TagDto } from "../../../../interfaces/dtos/relearn/TagDto"
import MyAxiosError from "../../../../interfaces/MyAxiosError"
import {
  setEditingSkill,
  setSkills,
} from "../../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../../store/store"
import {
  setErrorMessage,
  setSuccessMessage,
} from "../../../../store/utils/utilsActions"
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

  const [isChangingPriority, setIsChangingPriority] = useState(false)

  const togglePriority = () => {
    setIsChangingPriority(true)
    const changedSkill: SkillDto = {
      ...props.skill,
      isPriority: !props.skill.isPriority,
    }
    MY_AXIOS.post(API.skillbase.skill, changedSkill)
      .then((res) => {
        props.setSkills(res.data)
        props.setSuccessMessage("Priority changed!")
      })
      .catch((err: MyAxiosError) => {
        props.setErrorMessage(err.response.data.errors[0].message)
      })
      .finally(() => {
        setIsChangingPriority(false)
      })
  }

  const getUncheckedExpectations = () => {
    return props.skill.expectations.filter(
      (expectation) => !expectation.checked
    )
  }

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
        {isChangingPriority ? (
          <CircularProgress size={22} />
        ) : (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              togglePriority()
            }}
          >
            <StarIcon
              className={clsx({
                [classes.isPriority]: props.skill.isPriority,
                [classes.isNotPriority]: !props.skill.isPriority,
              })}
            />
          </IconButton>
        )}
      </TableCell>

      <TableCell width={180}>
        <Flex>
          {props.skill.isPriority ? (
            <span style={{ fontWeight: 900 }}>{props.skill.name}</span>
          ) : (
            props.skill.name
          )}
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

      <TableCell>
        {tag ? (
          <FlexVCenter>
            <LabelIcon style={{ color: tag.color }} />
            <Box ml={1}>{tag.name}</Box>
          </FlexVCenter>
        ) : null}
      </TableCell>

      <TableCell align="center">
        {props.skill.expectations.length > 0 && (
          <React.Fragment>
            {getUncheckedExpectations().length}/{props.skill.expectations.length} expectations
          </React.Fragment>
        )}
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
  setSkills: (skills: SkillDto[]) => dispatch(setSkills(skills)),
  setSuccessMessage: (message: string) => dispatch(setSuccessMessage(message)),
  setErrorMessage: (message: string) => dispatch(setErrorMessage(message)),
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
