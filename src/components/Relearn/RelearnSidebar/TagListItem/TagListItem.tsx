import LabelIcon from "@mui/icons-material/Label"
import { ListItem, ListItemText, Typography, useTheme } from "@mui/material"
import useUpdateTagLastOpenedAtMutation from "hooks/react-query/relearn/useUpdateTagLastOpenedAtMutation"
import { useEffect, useState } from "react"
import { Link, Redirect, useLocation } from "react-router-dom"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import { pushOrReplace } from "utils/array/pushOrReplace"
import { urls } from "utils/urls"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import { getTodoResources as filterTodoResources } from "../../../../utils/relearn/getTodoResources"
import S from "./TagListItem.styles"
import TagMoreIcon from "./TagMoreIcon/TagMoreIcon"

interface Props {
  tag: TagDto
}

// PE 2/3 - MenuItem could be shorter?
function TagListItem(props: Props) {
  const location = useLocation()

  const { resources: allResources, tags: allTags, setTags } = useRelearnStore()

  // PE 2/3 -  desnecessário?
  const [pathName, setPathName] = useState(location.pathname)
  useEffect(() => {
    setPathName(location.pathname)
  }, [location])

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const { mutate: saveTagLastOpenedAt } = useUpdateTagLastOpenedAtMutation()
  const handleSaveTagLastOpenedAt = (tagId: number) => {
    saveTagLastOpenedAt(tagId, {
      onSuccess: (savedTag) => {
        const tags = pushOrReplace([...allTags], savedTag, "id")
        setTags(tags)
      },
    })
  }

  const [redirectTo, setRedirectTo] = useState("")
  const theme = useTheme()

  return (
    <ListItem
      key={props.tag.id}
      className={"tag-item"}
      style={{ justifyContent: "flex-start", minHeight: 48 }}
      button
      component={Link}
      to={urls.pages.resources.tag + "/" + props.tag.id}
      onClick={() => {
        if (props.tag.id) {
          handleSaveTagLastOpenedAt(props.tag.id)
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      selected={pathName === urls.pages.resources.tag + "/" + props.tag.id}
    >
      <ListItemText>
        <S.IconTitleWrapper>
          <LabelIcon style={{ color: props.tag.color }} />
          <Typography noWrap style={{ maxWidth: 210 }}>
            {props.tag.name}
          </Typography>
        </S.IconTitleWrapper>
      </ListItemText>

      {isHovered ? (
        <TagMoreIcon
          afterDelete={() => {
            if (props.tag.id && pathName.endsWith(props.tag.id.toString()))
              setRedirectTo(urls.pages.resources.index)
          }}
          tag={props.tag}
        />
      ) : (
        <S.ResourcesCountWrapper>
          <Typography
            style={{
              fontSize: 12,
              position: "relative",
              right: 2,
              color: theme.palette.grey[400],
            }}
          >
            {
              filterTodoResources(
                allResources.filter((r) => r.tag?.id === props.tag.id)
              ).length
            }
          </Typography>
        </S.ResourcesCountWrapper>
      )}
      {redirectTo.length > 0 && <Redirect to={redirectTo} />}
    </ListItem>
  )
}

export default TagListItem
