import { Box, makeStyles } from "@material-ui/core"
import clsx from "clsx"
import React, { useEffect } from "react"
import { GlobalHotKeys } from "react-hotkeys"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../components/shared/Flexboxes/Flex"
import API from "../../consts/API"
import MY_AXIOS from "../../consts/MY_AXIOS"
import { ProgressDto } from "../../dtos/skillbase/ProgressDto"
import { newSkillDto, SkillDto } from "../../dtos/skillbase/SkillDto"
import {
  setEditingSkill,
  setProgresses,
  setSkills,
} from "../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../store/store"
import { sleep } from "../../utils/sleep"
import ProgressSidebar from "./ProgressSidebar/ProgressSidebar"
import SkillbaseTable from "./SkillTable/SkillbaseTable"
import { getCurrentTagId } from "../../utils/skillbase/getCurrentTagId"
import { useLocation } from "react-router"

// PE 3/3
const SkillbasePage = (props: Props) => {
  const location = useLocation()
  const classes = useStyles()

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

  const keyMap = { openModal: "q" }
  const handlers = {
    openModal: async () => {
      await sleep(100) // required so it doesn't add 'q' at the title field immediately
      props.setEditingSkill(newSkillDto(getCurrentTagId(location.pathname)))
    },
  }

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Flex height="100%" pt={5}>
        <ProgressSidebar />

        <Box
          className={clsx(classes.content, {
            [classes.contentShift]: props.sidebarIsOpen,
          })}
        >
          <SkillbaseTable />
        </Box>

        {/* <RelearnSidebar /> */}
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
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 300,
  },
}))

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  sidebarIsOpen: state.skillbase.sidebarIsOpen,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSkills: (skills: SkillDto[]) => dispatch(setSkills(skills)),
  setProgresses: (progresses: ProgressDto[]) =>
    dispatch(setProgresses(progresses)),
  setEditingSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SkillbasePage)
