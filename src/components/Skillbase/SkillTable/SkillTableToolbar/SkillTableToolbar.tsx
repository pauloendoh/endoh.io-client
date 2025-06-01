import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import DeleteIcon from "@mui/icons-material/Delete"
import { Box } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { lighten } from "@mui/material/styles"
import clsx from "clsx"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import Txt from "components/_UI/Text/Txt"
import useDebounce from "hooks/utils/useDebounce"
import { useEffect, useState } from "react"
import { MdSearch } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import { getCurrentTag } from "../../../../utils/skillbase/getCurrentTag"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"
import TagIcon from "../../../_UI/Icon/TagIcon"
import SkillbaseFilterButton from "./SkillbaseFilterButton/SkillbaseFilterButton"
import { optionTypes } from "./SkillbaseTagSelector/SkillbaseTagSelector"

type Props = {
  fixedTag: TagDto | null
  numSelected: number
  onClickDelete: () => void
}

const SkillTableToolbar = (props: Props) => {
  const { tags: allTags } = useRelearnStore()

  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const { setErrorMessage } = useSnackbarStore()
  const { setFilterByText } = useSkillbaseStore()

  const [searchSkillName, setSearchSkillName] = useState("")

  const debouncedSearchSkillName = useDebounce(searchSkillName, 250)

  useEffect(() => {
    setFilterByText(debouncedSearchSkillName)
  }, [debouncedSearchSkillName])

  // PE 1/3 - 20241030 -- considerar remover essas coisas referentes a tag e label
  const [tagSelectorValue, setTagSelectorValue] = useState<optionTypes>("All")
  const handleTagChange = (value: optionTypes) => {
    if (value === "All") navigate(urls.pages.skills.index)
    else if (value === "Untagged") navigate(urls.pages.skills.untagged)
    else navigate(urls.pages.skills.tag + "/" + value.id)
  }

  useEffect(() => {
    const { pathname } = location
    if (pathname.includes(urls.pages.skills.untagged))
      setTagSelectorValue("Untagged")
    else if (pathname.includes(urls.pages.skills.tag)) {
      const currentTag = getCurrentTag(pathname, allTags)
      if (currentTag) {
        setTagSelectorValue(currentTag)
        return
      }
      setErrorMessage("Could not find tag")
      navigate(urls.pages.skills.index)
    } else setTagSelectorValue("All")
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

export default SkillTableToolbar
