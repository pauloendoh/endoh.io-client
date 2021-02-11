import { Box, Button, Link, makeStyles, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import { ApplicationState } from "../../../store/store"
import EditProfileDialog from "../EditProfileDialog/EditProfileDialog"

// PE 3/3
const ProfileHeader = (props: Props) => {
  const classes = useStyles()
  const { username } = useParams<{ username: string }>()

  const [openProfileDialog, setOpenProfileDialog] = useState(false)

  return (
    <Box>
      <Flex>
        {props.profile?.fullName.length > 0 && (
          <Box mr={3}>
            <Typography variant="h5">{props.profile.fullName}</Typography>
          </Box>
        )}
        {props.profile?.userId === props.authUser.id && (
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenProfileDialog(true)}
            >
              Edit Profile
            </Button>
            <EditProfileDialog
              open={openProfileDialog}
              onClose={() => setOpenProfileDialog(false)}
            />
          </Box>
        )}
      </Flex>

      <Box style={{ opacity: 0.75 }}>@{username}</Box>

      <Box mt={2}>{props.profile?.bio}</Box>
      <Box mt={1}>
        <Link href={props.profile?.website}>{props.profile?.website}</Link>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({}))

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  authUser: state.auth.user,
  profile: state.profile.profile,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader)
