import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Button } from "@mui/material"

import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import { urls } from "utils/urls"
import { TagDto } from "../../../../../../types/domain/relearn/TagDto"
import FlexVCenter from "../../../../../_UI/Flexboxes/FlexVCenter"
import EditSkillsDialog from "./EditSkillsDialog/EditSkillsDialog"

// PE 2/3
function EditSkillsButton() {
  const { tags: allTags } = useRelearnStore()

  const classes = useStyles()
  const history = useHistory()
  const { skills: allSkills } = useSkillbaseStore()
  const { pathname } = useLocation()

  const [tagForDialog, setTagForDialog] = useState<TagDto | null>(null)

  const getSkillsFromCurrentTag = () => {
    const tagId = Number(pathname.split("/").pop())
    if (tagId) {
      return allSkills.filter((skill) => skill.tagId === tagId)
    }
    return []
  }

  const handleEditSkillsClick = () => {
    const tagId = Number(pathname.split("/").pop())
    if (tagId) {
      const currentTag = allTags.find((t) => t.id === tagId)
      setTagForDialog(currentTag || null)
    } else history.push(urls.pages.skills.index)
  }

  const handleCloseDialog = () => {
    setTagForDialog(null)
  }

  return (
    <React.Fragment>
      <Button
        onClick={handleEditSkillsClick}
        variant="outlined"
        size="small"
        color="secondary"
        className={classes.editSkillsButton}
      >
        Edit Skills
        <FlexVCenter ml={1} className={classes.innerChip}>
          {getSkillsFromCurrentTag().length}
        </FlexVCenter>
      </Button>

      <EditSkillsDialog tag={tagForDialog} onClose={handleCloseDialog} />
    </React.Fragment>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  innerChip: {
    background: theme.palette.secondary.main,
    color: "#fff",
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 3,
  },
  editSkillsButton: {
    marginBottom: 8,
    marginRight: 8,
  },
}))

export default EditSkillsButton
