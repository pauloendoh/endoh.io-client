import { Box } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import DeleteIcon from "@material-ui/icons/Delete"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import {
  IWithRedirectProps,
  withRedirect,
} from "../../../../components/hocs/withRedirect"
import PATHS from "../../../../consts/PATHS"
import { ApplicationState } from "../../../../store/store"
import { getCurrentTag } from "../../../../utils/skillbase/getCurrentTag"
import SkillbaseTagSelector, {
  optionTypes,
} from "./SkillbaseTagSelector/SkillbaseTagSelector"

const SkillTableToolbar = (props: Props) => {
  const location = useLocation()
  const classes = useStyles()
  const { numSelected } = props

  const [tagSelectorValue, setTagSelectorValue] = useState<optionTypes>("All")
  const handleTagChange = (value: optionTypes) => {
    if (value === "All") props.redirectTo(PATHS.skillbase.index)
    else if (value === "Untagged") props.redirectTo(PATHS.skillbase.untagged)
    else props.redirectTo(PATHS.skillbase.tag + "/" + value.id)
  }

  useEffect(() => {
    const { pathname } = location
    if (pathname.includes(PATHS.skillbase.untagged))
      setTagSelectorValue("Untagged")
    else if (pathname.includes(PATHS.skillbase.tag))
      setTagSelectorValue(getCurrentTag(pathname, props.allTags))
    else setTagSelectorValue("All")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Box>
          <SkillbaseTagSelector
            value={tagSelectorValue}
            onChange={handleTagChange}
          />
        </Box>
      )}
      {
        numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton
              id="delete-skills-icon"
              onClick={props.onClickDelete}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )
        // : (
        //   <Box mr={2} width={450}>
        //     <SkillListSelect />
        //     {/* <MyTextField
        //       label="Filter by name or tag"
        //       value={props.textFilter}
        //       onChange={(e) => props.onChangeFilter(e.target.value)}
        //       fullWidth
        //     /> */}
        //   </Box>
        // )
      }
    </Toolbar>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
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
  })
)

type Props = {
  numSelected: number
  textFilter: string
  onChangeFilter: (text: string) => void
  onClickDelete: () => void
} & IWithRedirectProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRedirect(SkillTableToolbar))
