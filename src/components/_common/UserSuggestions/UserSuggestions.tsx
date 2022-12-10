import { Box, Button, Link, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { Dispatch } from "redux"
import useAuthStore from "store/zustand/useAuthStore"
import { FollowingUserDto } from "types/domain/feed/FollowingUserDto"
import { urls } from "utils/urls"
import { UserSuggestionDto } from "../../../types/domain/feed/UserSuggestionDto"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import ProfilePicture from "../../_UI/ProfilePicture/ProfilePicture"
import UserSuggestionsDialog from "./UserSuggestionsDialog/UserSuggestionsDialog"

// PE 2/3 - Change to UserSuggestionsSection ?
function UserSuggestions(props: Props) {
  const { authUser } = useAuthStore()
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const [suggestions, setSuggestions] = useState<UserSuggestionDto[]>([])

  // PE 2/3
  useEffect(() => {
    // guarantees that it won't suggest users you already follow and yourself
    // BUT, it shouldn't be this component responsibility. It should be its parent!

    const dontShowIds = props.followingTags.map(
      (fol) => fol.followingUser.userId
    )
    dontShowIds.push(authUser.id)

    const filteredSuggestions = props.userSuggestions.filter(
      (suggestion) => dontShowIds.includes(suggestion.suggestedUserId) === false
    )
    setSuggestions(filteredSuggestions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.followingTags, props.userSuggestions])

  return (
    <Box width={250}>
      <FlexVCenter justifyContent="space-between">
        <Typography>Suggestions for You</Typography>
        <Button size="small" onClick={() => setDialogIsOpen(true)}>
          See All
        </Button>
        <UserSuggestionsDialog
          userSuggestions={suggestions}
          onClose={() => setDialogIsOpen(false)}
          open={dialogIsOpen}
        />
      </FlexVCenter>

      {/* Mini list (top 3) */}
      {suggestions.slice(0, 3).map((userSuggestion) => (
        <FlexVCenter
          key={userSuggestion.id}
          my={1}
          className="suggested-user-item"
        >
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
              to={urls.pages.user.index(userSuggestion.username)}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  userSuggestions: UserSuggestionDto[]
  followingTags: FollowingUserDto[]
}

type Props = ReturnType<typeof mapDispatchToProps> & OwnProps

export default connect(undefined, mapDispatchToProps)(UserSuggestions)
