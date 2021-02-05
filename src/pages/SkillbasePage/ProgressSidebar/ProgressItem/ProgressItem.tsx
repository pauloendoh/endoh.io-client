import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"

import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter"
import API from "../../../../consts/API"
import MY_AXIOS from "../../../../consts/MY_AXIOS"
import { ProgressDto } from "../../../../dtos/skillbase/ProgressDto"
import { setProgresses } from "../../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../../store/store"
import SkillLevelChip from "../../../../components/skillbase/SkillLevelChip/SkillLevelChip"
import Flex from "../../../../components/shared/Flexboxes/Flex"

function ProgressItem(props: Props) {
  const classes = useStyles()

  const [hovering, setHovering] = useState(false)

  const handleDelete = (progressId: number) => {
    if (window.confirm("Confirm delete?")) {
      MY_AXIOS.delete<ProgressDto[]>(
        API.skillbase.progress + "/" + progressId
      ).then((res) => {
        props.setProgresses(res.data)
      })
    }
  }

  return (
    <FlexVCenter
    flexWrap="wrap"
      key={props.progress.id}
      mt={props.index > 0 ? 2 : 0}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {props.progress.skill.name}
      <SkillLevelChip
        currentLevel={props.progress.oldLevel}
        goalLevel={props.progress.goalLevel}
      />
      <Flex ml={1} />
      <ArrowRightAltIcon />
      <SkillLevelChip
        currentLevel={props.progress.newLevel}
        goalLevel={props.progress.goalLevel}
      />

      {hovering && (
        <IconButton
          onClick={() => handleDelete(props.progress.id)}
          size="small"
          className={classes.deleteProgressIcon}
        >
          <DeleteIcon fontSize={"small"} />
        </IconButton>
      )}
    </FlexVCenter>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: 12,
    },
    deleteProgressIcon: {
      position: "absolute",
      right: -24
    },
  })
)

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProgresses: (progresses: ProgressDto[]) =>
    dispatch(setProgresses(progresses)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    progress: ProgressDto
    index: number
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProgressItem)
