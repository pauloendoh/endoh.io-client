import { ListItemButton, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import LabelIcon from "@mui/icons-material/Label"
import { Box, Typography } from "@mui/material"
import ListItemText from "@mui/material/ListItemText"
import { useMemo } from "react"
import { Link } from "react-router-dom"
import useProfileStore from "store/zustand/domain/useProfileStore"
import { urls } from "utils/urls"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import Flex from "../../../_UI/Flexboxes/Flex"
import FlexHCenter from "../../../_UI/Flexboxes/FlexHCenter"

interface Props {
  tag: TagDto
  width: number
  username: string
  selectedTagId: string
}

const TagListItem = (props: Props) => {
  const classes = useStyles()
  const profileStore = useProfileStore()

  const resourcesCount = useMemo(() => {
    return profileStore.resources
      .filter((r) => r.tag?.id === props.tag.id)
      .filter((r) => r.rating > 0).length
  }, [profileStore.resources])

  return (
    <ListItemButton
      component={Link}
      to={urls.pages.user.tag(props.username, Number(props.tag.id))}
      selected={Number(props.selectedTagId) === props.tag.id}
    >
      <ListItemText>
        <Flex>
          <LabelIcon style={{ color: props.tag.color }} />
          <Box ml={1} width={props.width - 90}>
            <Typography
              noWrap
              style={{ maxWidth: "inherit" }}
              title={props.tag.name}
            >
              {props.tag.name}
            </Typography>
          </Box>
        </Flex>
      </ListItemText>

      <FlexHCenter mt={0.5} width={24}>
        <Typography className={classes.resourcesCount}>
          {resourcesCount}
        </Typography>
      </FlexHCenter>
    </ListItemButton>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  resourcesCount: {
    fontSize: 12,
    color: theme.palette.grey[400],
  },
}))

export default TagListItem
