import { Badge, Button, makeStyles, Menu } from "@material-ui/core"
import NotificationsIcon from "@material-ui/icons/Notifications"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import { NotificationDto } from "../../../dtos/utils/NotificationDto"
import { setNotifications } from "../../../store/auth/authActions"
import { ApplicationState } from "../../../store/store"
import NotificationItem from "./NotificationItem/NotificationItem"

// PE 2/3 - Change to "NotificationButtonMenu"
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

  const getUnseenNotificationsLength = () =>
    props.allNotifications.filter((n) => !n.seen).length

  const getBadgeVariant = () =>
    props.allNotifications.filter((n) => !n.seen).length > 0
      ? "dot"
      : "standard"

  return (
    <React.Fragment>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge
          color="primary"
          badgeContent={getUnseenNotificationsLength()}
          variant={getBadgeVariant()}
        >
          <NotificationsIcon />
        </Badge>
      </Button>
      {props.allNotifications.length > 0 && (
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
          {props.allNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
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
  allNotifications: state.auth.notifications,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNotifications: (not: NotificationDto[]) => dispatch(setNotifications(not)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
