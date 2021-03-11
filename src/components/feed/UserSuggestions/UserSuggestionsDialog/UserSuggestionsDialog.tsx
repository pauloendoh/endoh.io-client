import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
} from "@material-ui/core"
import React from "react"
import { UserSuggestionDto } from "../../../../dtos/feed/UserSuggestionDto"
import Flex from "../../../shared/Flexboxes/Flex"
import { Link as RouterLink } from "react-router-dom"
import PATHS from "../../../../consts/PATHS"
// PE 2/3
const UserSuggestionsDialog = (props: Props) => {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="sm"
      aria-labelledby="followers-dialog"
    >
      <Box pb={1} px={1}>
        <DialogTitle id="followers-title">Suggested Users</DialogTitle>

        <DialogContent>
          {props.userSuggestions.map((userSuggestion) => (
            <Flex key={userSuggestion.id} mb={2}>
              <Avatar>{userSuggestion.username[0].toUpperCase()}</Avatar>
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
            </Flex>
          ))}
        </DialogContent>
      </Box>
    </Dialog>
  )
}

type Props = {
  userSuggestions: UserSuggestionDto[]
  open: boolean
  onClose: () => void
}

export default UserSuggestionsDialog
