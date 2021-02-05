import { Box, makeStyles } from "@material-ui/core"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { Dispatch } from "redux"
import API from "../../consts/API"
import MY_AXIOS from "../../consts/MY_AXIOS"
import { ResourceDto } from "../../interfaces/dtos/relearn/ResourceDto"
import { clearProfile, setProfileResources } from "../../store/profile/profileActions"
import { ApplicationState } from "../../store/store"
// PE 3/3
const UserPage = (props: Props) => {
  const classes = useStyles()
  const { username } = useParams<{ username: string }>()

  useEffect(() => {
    props.clearProfile()

    MY_AXIOS.get<ResourceDto[]>(API.user.ratedResources(username)).then(
      (res) => {
        console.log(res.data)
        props.setProfileResources(res.data)
      }
    )
  })

  return <Box>User: {username}</Box>
}

const useStyles = makeStyles((theme) => ({}))

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearProfile: () =>
  dispatch(clearProfile()),
  
  setProfileResources: (resources: ResourceDto[]) =>
    dispatch(setProfileResources(resources)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
