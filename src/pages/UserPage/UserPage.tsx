import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Grid, makeStyles, Typography } from "@material-ui/core"
import LabelIcon from "@material-ui/icons/Label"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { Dispatch } from "redux"
import MinRatingButton from "../../components/resources/MinRatingButton/MinRatingButton"
import Flex from "../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../components/shared/Flexboxes/FlexVCenter"
import API from "../../consts/API"
import MY_AXIOS from "../../consts/MY_AXIOS"
import { UserInfoDto } from "../../dtos/UserInfoDto"
import { ResourceDto } from "../../interfaces/dtos/relearn/ResourceDto"
import {
  clearProfile,
  setProfileResources,
  setUserInfo,
} from "../../store/profile/profileActions"
import { ApplicationState } from "../../store/store"
import FeedResources from "./FeedResources/FeedResources"
import ProfileHeader from "./ProfileHeader/ProfileHeader"
import ResourcesChart from "./ResourcesChart/ResourcesChart"

// PE 3/3
const UserPage = (props: Props) => {
  const classes = useStyles()
  const { username } = useParams<{ username: string }>()

  const [filteredResources, setFilteredResources] = useState<ResourceDto[]>([])
  const [minRating, setMinRating] = useState(4)

  // filtering resources by min rating
  useEffect(() => {
    const filtered = [...props.resources].filter((r) => r.rating >= minRating)
    setFilteredResources(filtered)
  }, [props.resources, minRating])

  useEffect(
    () => {
      props.clearProfile()

      MY_AXIOS.get<UserInfoDto>(API.user.userInfo(username)).then((res) => {
        props.setUserInfo(res.data)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username]
  )

  const getResourcesFromListId = (listId: number) => {
    return props.resources.filter((r) => r.tag?.id === listId)
  }

  return (
    <Box p={5}>
      <Grid container>
        <Grid item xs={3}>
          <Box>
            <Box>All resources {props.resources.length}</Box>
            {props.publicLists.map((list) => (
              <Flex key={list.id}>
                <LabelIcon style={{ color: list.color }} />
                <Box ml={1}>{list.name}</Box>
                <Box ml={1}>
                  {getResourcesFromListId(list.id).length} resources
                </Box>
              </Flex>
            ))}
          </Box>

          {props.privateLists.length > 0 && (
            <Box mt={2}>
              <FlexVCenter>
                <FontAwesomeIcon icon={faLock} />
                <Box ml={1}>Private lists</Box>
              </FlexVCenter>
              {props.privateLists.map((list) => (
                <Flex key={list.id}>
                  <LabelIcon style={{ color: list.color }} />
                  <Box ml={1}>{list.name}</Box>
                  <Box ml={1}>
                    {getResourcesFromListId(list.id).length} resources
                  </Box>
                </Flex>
              ))}
            </Box>
          )}
        </Grid>
        <Grid item xs={9} lg={6}>
          <ProfileHeader />

          <Box mt={5} />
          <ResourcesChart resources={props.resources} />

          <Flex mt={3} justifyContent="space-between">
            <Typography variant="h5">All resources</Typography>
            <MinRatingButton onChange={setMinRating} value={minRating} />
          </Flex>
          <FeedResources resources={filteredResources} />
        </Grid>
        <Grid item lg={3}></Grid>
      </Grid>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({}))

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  authUser: state.auth.user,
  resources: state.profile.resources,
  profile: state.profile.profile,
  publicLists: state.profile.publicLists,
  privateLists: state.profile.privateLists,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearProfile: () => dispatch(clearProfile()),

  setProfileResources: (resources: ResourceDto[]) =>
    dispatch(setProfileResources(resources)),

  setUserInfo: (userInfo: UserInfoDto) => dispatch(setUserInfo(userInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
