import { Grid } from "@material-ui/core"
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
import SkillTable from "./SkillTable/SkillTable"
// PE 3/3
const SkillbasePage = (props: Props) => {
  const [isFetching, setIsFetching] = useState(true)

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
    <Flex height="100%" px={5} pt={5}>
      <Grid container>
        <Grid item xs>
          <SkillTable />
        </Grid>
      </Grid>
      <ProgressSidebar />
      {/* <RelearnSidebar /> */}
    </Flex>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSkills: (skills: SkillDto[]) => dispatch(setSkills(skills)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SkillbasePage)
