import {
  Avatar,
  Box,
  Button,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { Dispatch } from "redux"
import PATHS from "../../../consts/PATHS"
import { UserSuggestionDto } from "../../../dtos/feed/UserSuggestionDto"
import { ApplicationState } from "../../../store/store"
import Flex from "../../shared/Flexboxes/Flex"
import FlexVCenter from "../../shared/Flexboxes/FlexVCenter"
import UserSuggestionsDialog from "./UserSuggestionsDialog/UserSuggestionsDialog"

function UserSuggestions(props: Props) {
  const classes = useStyles()

  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <Box width={250}>
      <FlexVCenter justifyContent="space-between">
        <Typography>Suggestions for You</Typography>
        <Button size="small" onClick={() => setDialogIsOpen(true)}>
          See All
        </Button>
        <UserSuggestionsDialog
          userSuggestions={props.userSuggestions}
          onClose={() => setDialogIsOpen(false)}
          open={dialogIsOpen}
        />
      </FlexVCenter>
      {props.userSuggestions.slice(0, 3).map((userSuggestion) => (
        <Flex key={userSuggestion.id} my={1}>
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
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  userSuggestions: UserSuggestionDto[]
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(UserSuggestions)
