import NotificationsIcon from "@mui/icons-material/Notifications"
import { Badge, IconButton, Menu } from "@mui/material"
import React from "react"
import useAuthStore from "store/zustand/useAuthStore"
import { NotificationDto } from "../../../../../types/domain/utils/NotificationDto"
import myAxios from "../../../../../utils/consts/myAxios"
import apiUrls from "../../../../../utils/url/urls/apiUrls"
import NotificationItem from "./NotificationItem/NotificationItem"

// PE 2/3 - Change to "NotificationButtonMenu"
const Notification = () => {
  const { notifications, setNotifications } = useAuthStore()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    // set notifications.seen = true
    myAxios
      .post<NotificationDto[]>(apiUrls.utils.notificationsSeeAll)
      .then((res) => {
        setNotifications(res.data)
      })

    setAnchorEl(null)
  }

  const getUnseenNotificationsLength = () =>
    notifications.filter((n) => !n.seen).length

  const getBadgeVariant = () =>
    notifications.filter((n) => !n.seen).length > 0 ? "dot" : "standard"

  return (
    <React.Fragment>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <Badge
          color="primary"
          badgeContent={getUnseenNotificationsLength()}
          variant={getBadgeVariant()}
        >
          <NotificationsIcon fontSize="large" />
        </Badge>
      </IconButton>
      {notifications.length > 0 && (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={Boolean(anchorEl)}
          onClick={handleClose}
          onClose={handleClose}
        >
          {notifications.map((notification) => (
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

export default Notification
