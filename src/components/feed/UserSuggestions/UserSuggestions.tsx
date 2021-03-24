import {
  Avatar,
  Box,
  Button,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { Dispatch } from "redux"
import PATHS from "../../../consts/PATHS"
import { FollowingUserDto } from "../../../dtos/feed/FollowingUserDto"
import { UserSuggestionDto } from "../../../dtos/feed/UserSuggestionDto"
import { ApplicationState } from "../../../store/store"
import Flex from "../../shared/Flexboxes/Flex"
import FlexVCenter from "../../shared/Flexboxes/FlexVCenter"
import ProfilePicture from "../../shared/ProfilePicture/ProfilePicture"
import UserSuggestionsDialog from "./UserSuggestionsDialog/UserSuggestionsDialog"

function UserSuggestions(props: Props) {
  const classes = useStyles()

  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const [filteredSuggestions, setFilteredSuggestions] = useState<
    UserSuggestionDto[]
  >([])

  useEffect(() => {
    console.log("filtering user suggestions")

    // guarantees that you're not showing users you already follow (or yourself)
    const userIds = props.followingUsers.map(
      (user) => user.followingUser.userId
    )
    userIds.push(props.authUser.id)

    const filteredSuggestions = props.userSuggestions.filter(
      (sug) => userIds.includes(sug.suggestedUserId) === false
    )
    setFilteredSuggestions(filteredSuggestions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.followingUsers, props.userSuggestions])

  return (
    <Box width={250}>
      <FlexVCenter justifyContent="space-between">
        <Typography>Suggestions for You</Typography>
        <Button size="small" onClick={() => setDialogIsOpen(true)}>
          See All
        </Button>
        <UserSuggestionsDialog
          userSuggestions={filteredSuggestions}
          onClose={() => setDialogIsOpen(false)}
          open={dialogIsOpen}
        />
      </FlexVCenter>
      {filteredSuggestions.slice(0, 3).map((userSuggestion) => (
        <FlexVCenter key={userSuggestion.id} my={1}>
          <ProfilePicture
            isLink
            pictureUrl={userSuggestion.pictureUrl}
            username={userSuggestion.username}
            size={32}
          />

          <Box ml={1}>
            <Link
              variant="button"
              color="inherit"
              component={RouterLink}
              to={PATHS.user.index(userSuggestion.username)}
            >
              {userSuggestion.username}
            </Link>
            <Box>{userSuggestion.description}</Box>
          </Box>
        </FlexVCenter>
      ))}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({}))

const mapStateToProps = (state: ApplicationState) => ({
  authUser: state.auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  userSuggestions: UserSuggestionDto[]
  followingUsers: FollowingUserDto[]
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(UserSuggestions)
