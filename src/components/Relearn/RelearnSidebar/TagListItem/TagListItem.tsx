import LabelIcon from "@mui/icons-material/Label"
import { ListItem, ListItemText, Typography, useTheme } from "@mui/material"
import useSaveTagLastOpenedAt from "hooks/react-query/relearn/useSaveTagLastOpenedAt"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, Redirect, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import { pushOrReplace } from "utils/array/pushOrReplace"
import { urls } from "utils/urls"
import * as relearnActions from "../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../store/store"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import { getTodoResources as filterTodoResources } from "../../../../utils/relearn/getTodoResources"
import S from "./TagListItem.styles"
import TagMoreIcon from "./TagMoreIcon/TagMoreIcon"

// PE 2/3 - MenuItem could be shorter?
function TagListItem(props: Props) {
  const location = useLocation()

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

  const { mutate: saveTagLastOpenedAt } = useSaveTagLastOpenedAt()
  const handleSaveTagLastOpenedAt = (tagId: number) => {
    saveTagLastOpenedAt(tagId, {
      onSuccess: (savedTag) => {
        const tags = pushOrReplace([...props.allTags], savedTag, "id")
        props.setTags(tags)
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
      to={urls.pages.relearn.tag + "/" + props.tag.id}
      onClick={() => handleSaveTagLastOpenedAt(props.tag.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      selected={pathName === urls.pages.relearn.tag + "/" + props.tag.id}
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
            if (pathName.endsWith(props.tag.id.toString()))
              setRedirectTo(urls.pages.relearn.index)
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
                props.allResources.filter((r) => r.tag?.id === props.tag.id)
              ).length
            }
          </Typography>
        </S.ResourcesCountWrapper>
      )}
      {redirectTo.length > 0 && <Redirect to={redirectTo} />}
    </ListItem>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  allResources: state.relearn.resources,
  allTags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editTag: (tag: TagDto) => dispatch(relearnActions.editTag(tag)),
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
  removeTag: (id: number) => dispatch(relearnActions.removeTag(id)),
})

interface OwnProps {
  tag: TagDto
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(TagListItem)
