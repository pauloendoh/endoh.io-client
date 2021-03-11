import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
} from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { Link as RouterLink, useParams } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import PATHS from "../../../consts/PATHS"
import { FollowerDto } from "../../../dtos/feed/FollowerDto"
import { ApplicationState } from "../../../store/store"

// PE 2/3
const FollowersDialog = (props: Props) => {
  const { username } = useParams<{ username: string }>()

  const onClose = () => {
    props.onClose()
  }

  return (
    <Dialog
      onClose={onClose}
      open={props.open}
      fullWidth
      maxWidth="sm"
      aria-labelledby="followers-dialog"
    >
      <Box pb={1} px={1}>
        <DialogTitle id="followers-title">@{username}'s followers</DialogTitle>

        <DialogContent>
          {props.followers.map((follower) => (
            <Box key={follower.follower.userId} mb={3}>
              <Flex>
                <Avatar alt={follower.follower.username}>
                  {follower.follower.username[0]}
                </Avatar>
                <Box ml={2}>
                  <Box>
                    <Link
                      component={RouterLink}
                      variant="body1"
                      color="inherit"
                      to={PATHS.user.index(follower.follower.username)}
                    >
                      <b>{follower.follower.username}</b>
                    </Link>
                  </Box>
                  <Box>{follower.follower.fullName}</Box>
                  <Box>
                    Following {follower.tags.length}{" "}
                    {follower.tags.length > 1 ? "tags" : "tag"}
                  </Box>
                </Box>
              </Flex>
            </Box>
          ))}
        </DialogContent>
      </Box>
    </Dialog>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  open: boolean
  onClose: () => void
  followers: FollowerDto[]
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(FollowersDialog)
