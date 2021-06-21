import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, makeStyles, MenuItem, Typography } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import ReactTimeago from "react-timeago"
import { Dispatch } from "redux"
import { NotificationDto } from "../../../../dtos/utils/NotificationDto"
import { setNotifications } from "../../../../store/auth/authActions"
import { ApplicationState } from "../../../../store/store"
import Flex from "../../../shared/Flexboxes/Flex"
import FlexHCenter from "../../../shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../shared/Flexboxes/FlexVCenter"
import ProfilePicture from "../../../shared/ProfilePicture/ProfilePicture"

// PE 2/3 - Change to "NotificationButtonMenu"
const NotificationItem = (props: Props) => {
  const classes = useStyles()

  return (
    <MenuItem key={props.notification.id} className={classes.menuItem}>
      <Flex>
        <FlexVCenter mt={1} height="fit-content">
          <FlexHCenter width={20}>
            {!props.notification.seen && (
              <FontAwesomeIcon icon={faCircle} className={classes.dot} />
            )}
          </FlexHCenter>

          <ProfilePicture
            pictureUrl={props.notification.pictureUrl}
            isLink
            username={props.notification.username}
          />
        </FlexVCenter>

        <Box ml={2}>
          <Box>
            <Typography>{props.notification.message}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="primary">
              <ReactTimeago date={props.notification.createdAt} live={false} />
            </Typography>
          </Box>
        </Box>
      </Flex>
    </MenuItem>
  )
}

const useStyles = makeStyles((theme) => ({
  menuItem: {
    whiteSpace: "normal",
    width: 450,
    paddingLeft: 8,
  },
  dot: {
    fontSize: 8,
    color: theme.palette.primary.main,
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNotifications: (not: NotificationDto[]) => dispatch(setNotifications(not)),
})

interface OwnProps {
  notification: NotificationDto
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem)
