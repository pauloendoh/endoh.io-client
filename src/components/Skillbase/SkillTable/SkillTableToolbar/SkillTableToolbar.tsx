import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import DeleteIcon from "@mui/icons-material/Delete"
import { Box } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import { lighten } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import clsx from "clsx"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import Txt from "components/_UI/Text/Txt"
import useDebounce from "hooks/utils/useDebounce"
import { useEffect, useState } from "react"
import { MdSearch } from "react-icons/md"
import { connect } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { ApplicationState } from "../../../../store/store"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import { getCurrentTag } from "../../../../utils/skillbase/getCurrentTag"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"
import TagIcon from "../../../_UI/Icon/TagIcon"
import SkillbaseFilterButton from "./SkillbaseFilterButton/SkillbaseFilterButton"
import { optionTypes } from "./SkillbaseTagSelector/SkillbaseTagSelector"

const SkillTableToolbar = (props: Props) => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const { setErrorMessage } = useSnackbarStore()
  const { setFilterByText } = useSkillbaseStore()

  const [searchSkillName, setSearchSkillName] = useState("")

  const debouncedSearchSkillName = useDebounce(searchSkillName, 250)

  useEffect(() => {
    setFilterByText(debouncedSearchSkillName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchSkillName])

  const [tagSelectorValue, setTagSelectorValue] = useState<optionTypes>("All")
  const handleTagChange = (value: optionTypes) => {
    if (value === "All") history.push(urls.pages.skills.index)
    else if (value === "Untagged") history.push(urls.pages.skills.untagged)
    else history.push(urls.pages.skills.tag + "/" + value.id)
  }

  useEffect(() => {
    const { pathname } = location
    if (pathname.includes(urls.pages.skills.untagged))
      setTagSelectorValue("Untagged")
    else if (pathname.includes(urls.pages.skills.tag)) {
      const currentTag = getCurrentTag(pathname, props.allTags)
      if (currentTag) {
        setTagSelectorValue(currentTag)
        return
      }
      setErrorMessage("Could not find tag")
      history.push(urls.pages.skills.index)
    } else setTagSelectorValue("All")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: props.numSelected > 0,
      })}
    >
      {props.numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {props.numSelected} selected
        </Typography>
      ) : (
        <Box width="100%">
          {props.fixedTag ? (
            <Typography variant="h4">
              <FlexVCenter>
                <TagIcon tag={props.fixedTag} />
                <Box ml={1} />
                {props.fixedTag.name}
              </FlexVCenter>
            </Typography>
          ) : (
            <FlexVCenter justifyContent="space-between" width="100%">
              <FlexVCenter style={{ gap: 24 }}>
                {/* <SkillbaseTagSelector
                  value={tagSelectorValue}
                  onChange={handleTagChange}
                /> */}

                <MyTextField
                  label={
                    <FlexVCenter style={{ gap: 4 }}>
                      <MdSearch />
                      <Txt>Search skill</Txt>
                    </FlexVCenter>
                  }
                  inputProps={{ style: { minHeight: 21 } }}
                  value={searchSkillName}
                  onChange={(e) => setSearchSkillName(e.target.value)}
                  onClickClearIcon={() => setSearchSkillName("")}
                />
              </FlexVCenter>

              <SkillbaseFilterButton />
            </FlexVCenter>
          )}
        </Box>
      )}
      {props.numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton
            id="delete-skills-icon"
            onClick={props.onClickDelete}
            aria-label="delete"
            size="large"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.mode === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}))

type Props = {
  fixedTag: TagDto
  numSelected: number
  onClickDelete: () => void
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SkillTableToolbar)
