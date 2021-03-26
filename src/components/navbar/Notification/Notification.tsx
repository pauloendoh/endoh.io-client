import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Badge,
  Box,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import NotificationsIcon from "@material-ui/icons/Notifications"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import ReactTimeago from "react-timeago"
import { Dispatch } from "redux"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import PATHS from "../../../consts/PATHS"
import { NotificationDto } from "../../../dtos/utils/NotificationDto"
import { setNotifications } from "../../../store/auth/authActions"
import { ApplicationState } from "../../../store/store"
import Flex from "../../shared/Flexboxes/Flex"
import FlexHCenter from "../../shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../../shared/Flexboxes/FlexVCenter"
import ProfilePicture from "../../shared/ProfilePicture/ProfilePicture"

const Notification = (props: Props) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    // set notifications.seen = true
    MY_AXIOS.post<NotificationDto[]>(API.utils.notificationsSeeAll).then(
      (res) => {
        props.setNotifications(res.data)
      }
    )

    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge
          color="primary"
          badgeContent={props.notifications.filter((n) => !n.seen).length}
          // if there's unseen notifications
          variant={
            props.notifications.filter((n) => !n.seen).length > 0
              ? "dot"
              : "standard"
          }
        >
          <NotificationsIcon />
        </Badge>
      </Button>
      {props.notifications.length > 0 && (
        <Menu
          className={classes.menu}
          id="simple-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={Boolean(anchorEl)}
          onClick={handleClose}
          onClose={handleClose}
        >
          {props.notifications.map((not) => (
            <MenuItem key={not.id} className={classes.menuItem}>
              <Flex>
                <FlexVCenter mt={1} height="fit-content">
                  <FlexHCenter width={20}>
                    {!not.seen && (
                      <FontAwesomeIcon
                        icon={faCircle}
                        className={classes.dot}
                      />
                    )}
                  </FlexHCenter>

                  <ProfilePicture
                    pictureUrl={not.pictureUrl}
                    isLink
                    username={not.username}
                  />
                </FlexVCenter>

                <Box ml={2}>
                  <Box>
                    <Typography>{not.message}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="primary">
                      <ReactTimeago date={not.createdAt} live={false} />
                    </Typography>
                  </Box>
                </Box>
              </Flex>
            </MenuItem>
          ))}
        </Menu>
      )}
    </React.Fragment>
  )
}

const useStyles = makeStyles((theme) => ({
  menu: {},
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

const mapStateToProps = (state: ApplicationState) => ({
  notifications: state.auth.notifications,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNotifications: (not: NotificationDto[]) => dispatch(setNotifications(not)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
