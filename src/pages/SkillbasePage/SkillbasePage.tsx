import SkillTable from './SkillTable/SkillTable'
import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../components/shared/Flexboxes/Flex"
import { ResourceDto } from "../../interfaces/dtos/relearn/ResourceDto"
import { TagDto } from "../../interfaces/dtos/relearn/TagDto"
import * as relearnActions from "../../store/relearn/relearnActions"
import { ApplicationState } from "../../store/store"
import ProgressSidebar from './ProgressSidebar/ProgressSidebar'
// PE 3/3
const SkillbasePage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(
    () => {
      // MY_AXIOS.get<ResourceDto[]>(API.relearn.resource)
      //   .then((res) => {
      //     props.setResources(res.data)
      //   })
      //   .finally(() => {
      //     setIsLoadingResources(false)
      //   })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Flex height="100%" px={5} pt={5}>

      <Grid container>
        <Grid item xs>
          <SkillTable/>
        </Grid>
      </Grid>
      <ProgressSidebar/>
      {/* <RelearnSidebar /> */}
    </Flex>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  resources: state.relearn.resources,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
  startNewResource: () => dispatch(relearnActions.startNewResource()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SkillbasePage)
