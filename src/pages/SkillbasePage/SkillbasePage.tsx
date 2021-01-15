import { Box, Grid, makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../components/shared/Flexboxes/Flex"
import API from "../../consts/API"
import MY_AXIOS from "../../consts/MY_AXIOS"
import { SkillDto } from "../../dtos/skillbase/SkillDto"
import { setSkills } from "../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../store/store"
import ProgressSidebar from "./ProgressSidebar/ProgressSidebar"
import SkillbaseTable from "./SkillTable/SkillbaseTable"
import SkillDialog from './SkillDialog/SkillDialog'
import clsx from "clsx"
// PE 3/3
const SkillbasePage = (props: Props) => {
  const [isFetching, setIsFetching] = useState(true)
  const classes = useStyles()

  useEffect(
    () => {
      MY_AXIOS.get<SkillDto[]>(API.skillbase.skill)
        .then((res) => {
          props.setSkills(res.data)
        })
        .finally(() => {
          setIsFetching(false)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Flex height="100%" pt={5}>
      <Box
        className={clsx(classes.content, {
          [classes.contentShift]: props.sidebarIsOpen,
        })}
      >
        <SkillbaseTable />
      </Box>

      <ProgressSidebar />

      <SkillDialog/>
      {/* <RelearnSidebar /> */}
    </Flex>
  )
}

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
    marginRight: 300,
  },
}))

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  sidebarIsOpen: state.skillbase.sidebarIsOpen,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSkills: (skills: SkillDto[]) => dispatch(setSkills(skills)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SkillbasePage)
