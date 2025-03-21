import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, List, ListItem, Typography, useTheme } from "@mui/material"
import ListItemText from "@mui/material/ListItemText"
import Txt from "components/_UI/Text/Txt"
import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import useProfileStore from "store/zustand/domain/useProfileStore"
import { SkillDto, buildSkillDto } from "types/domain/skillbase/SkillDto"
import { urls } from "utils/urls"
import useElementSize from "../../../hooks/utils/useElementSize"
import Flex from "../../_UI/Flexboxes/Flex"
import FlexHCenter from "../../_UI/Flexboxes/FlexHCenter"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import TagListItem from "./TagListItem/TagListItem"
import UserRoadmapsDialog from "./UserRoadmapsDialog/UserRoadmapsDialog"

const UserPageSidebar = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const profileStore = useProfileStore()

  const [roadmapsDialog, setRoadmapsDialog] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<SkillDto>(buildSkillDto())

  const [rootRef, { width }] = useElementSize()

  const classes = useStyles()
  const {
    username,
    tagId,
    skillId: skillIdStr,
  } = useParams<{
    username: string
    tagId: string
    skillId: string
  }>()

  useEffect(() => {
    const skillId = Number(skillIdStr)
    const { publicSkills } = profileStore
    if (skillId > 0 && publicSkills.length > 0) {
      const skill = publicSkills.find((s) => s.id === skillId)
      if (skill) {
        setSelectedSkill(skill)
        setRoadmapsDialog(true)
        return
      }
    }
    setSelectedSkill(buildSkillDto())
    setRoadmapsDialog(false)
  }, [skillIdStr, profileStore.publicSkills])

  const ratedResourcesCount = useMemo(() => {
    return profileStore.resources.filter((r) => r.rating > 0).length
  }, [profileStore.resources])

  if (!username || !tagId) {
    return null
  }

  return (
    <Box maxWidth={300} {...({ ref: rootRef } as any)}>
      <List component="nav" aria-label="User resource lists">
        <ListItem
          button
          component={Link}
          to={urls.pages.user.index(username)}
          selected={tagId === undefined}
        >
          <ListItemText>
            <Flex>
              <Box width={width - 90}>
                <Typography noWrap style={{ maxWidth: "inherit" }}>
                  All resources
                </Typography>
              </Box>
            </Flex>
          </ListItemText>

          <FlexHCenter mt={0.5} width={24}>
            <Typography className={classes.resourcesCount}>
              {ratedResourcesCount}
            </Typography>
          </FlexHCenter>
        </ListItem>

        {profileStore.publicTags.map((tag) => (
          <TagListItem
            key={tag.id}
            tag={tag}
            width={width}
            username={username}
            selectedTagId={tagId}
          />
        ))}
      </List>
      {profileStore.privateTags.length > 0 && (
        <Box mt={2}>
          <FlexVCenter pl={2}>
            <FontAwesomeIcon icon={faLock} />
            <Box ml={1}>
              <Typography>Private tags</Typography>
            </Box>
          </FlexVCenter>

          <List component="nav" aria-label="User resource lists">
            {profileStore.privateTags.map((tag) => (
              <TagListItem
                key={tag.id}
                tag={tag}
                width={width}
                username={username}
                selectedTagId={tagId}
              />
            ))}
          </List>
        </Box>
      )}

      {profileStore.publicSkills.length > 0 && (
        <div style={{ marginTop: theme.spacing(3) }}>
          <div
            style={{
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
            }}
          >
            <Txt>Roadmaps</Txt>
          </div>
          <hr style={{ marginTop: theme.spacing(2) }} />
          <List component="nav">
            {profileStore.publicSkills.map((skill) => (
              <ListItem
                key={skill.id}
                button
                component={Link}
                to={urls.pages.user.roadmap(username, Number(skill.id))}
                selected={skill.id === Number(skillIdStr)}
              >
                <ListItemText title={skill.name}>{skill.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      )}

      <UserRoadmapsDialog
        open={roadmapsDialog}
        skill={selectedSkill}
        onClose={() => {
          navigate(urls.pages.user.index(username))
        }}
      />
    </Box>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  resourcesCount: {
    fontSize: 12,
    color: theme.palette.grey[400],
  },
}))

export default UserPageSidebar
