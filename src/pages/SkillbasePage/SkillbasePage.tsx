import { Box, makeStyles, Paper } from "@material-ui/core"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import { GlobalHotKeys } from "react-hotkeys"
import { connect } from "react-redux"
import { useLocation } from "react-router"
import { Dispatch } from "redux"
import Flex from "../../components/shared/Flexboxes/Flex"
import API from "../../consts/API"
import MY_AXIOS from "../../consts/MY_AXIOS"
import PATHS from "../../consts/PATHS"
import { ProgressDto } from "../../dtos/skillbase/ProgressDto"
import { newSkillDto, SkillDto } from "../../dtos/skillbase/SkillDto"
import { TagDto } from "../../interfaces/dtos/relearn/TagDto"
import {
  setEditingSkill,
  setProgresses,
  setSkills,
} from "../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../store/store"
import { sleep } from "../../utils/sleep"
import ProgressSidebar from "./ProgressSidebar/ProgressSidebar"
import SkillbaseTable from "./SkillTable/SkillbaseTable"

// PE 3/3
const SkillbasePage = (props: Props) => {
  const classes = useStyles()
  const { pathname } = useLocation()

  const [selectedTag, setSelectedTag] = useState<TagDto | "Untagged">()

  useEffect(
    () => {
      document.title = "Skills - Endoh.io"

      MY_AXIOS.get<SkillDto[]>(API.skillbase.skill).then((res) => {
        props.setSkills(res.data)
      })

      MY_AXIOS.get<ProgressDto[]>(API.skillbase.progress).then((res) => {
        props.setProgresses(res.data)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (pathname.startsWith(PATHS.skillbase.untagged)) {
      setSelectedTag("Untagged")
    } else if (pathname.startsWith(PATHS.skillbase.tag + "/")) {
      const tagId = Number(pathname.split("/").pop())
      if (tagId) {
        const tag = props.allTags.find((tag) => tag.id === tagId)
        setSelectedTag(tag)
      }
    } else setSelectedTag(null)
  }, [pathname])

  const keyMap = { openModal: "q" }
  const handlers = {
    openModal: async () => {
      await sleep(100) // required so it doesn't add 'q' at the title field
      props.setEditingSkill(newSkillDto())
    },
  }

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Flex height="100%" pt={5} justifyContent="center">
        <ProgressSidebar />

        <Box
          className={clsx(classes.content, {
            [classes.contentShift]: props.sidebarIsOpen,
          })}
        >
          <Box width="100%">
            <Paper className={classes.paper}>
              <SkillbaseTable tag={selectedTag} fixedTag={null} />
            </Paper>
          </Box>
        </Box>
      </Flex>
    </GlobalHotKeys>
  )
}

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: 1200,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 300,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}))

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  sidebarIsOpen: state.skillbase.sidebarIsOpen,
  allTags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSkills: (skills: SkillDto[]) => dispatch(setSkills(skills)),
  setProgresses: (progresses: ProgressDto[]) =>
    dispatch(setProgresses(progresses)),
  setEditingSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SkillbasePage)
