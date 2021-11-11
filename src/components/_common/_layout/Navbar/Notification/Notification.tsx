import { Badge, IconButton, Menu } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setNotifications } from "../../../../../store/auth/authActions";
import { ApplicationState } from "../../../../../store/store";
import { NotificationDto } from "../../../../../types/domain/utils/NotificationDto";
import apiUrls from "../../../../../utils/consts/apiUrls";
import myAxios from "../../../../../utils/consts/myAxios";
import NotificationItem from "./NotificationItem/NotificationItem";

// PE 2/3 - Change to "NotificationButtonMenu"
const Notification = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // set notifications.seen = true
    myAxios
      .post<NotificationDto[]>(apiUrls.utils.notificationsSeeAll)
      .then((res) => {
        props.setNotifications(res.data);
      });

    setAnchorEl(null);
  };

  const getUnseenNotificationsLength = () =>
    props.allNotifications.filter((n) => !n.seen).length;

  const getBadgeVariant = () =>
    props.allNotifications.filter((n) => !n.seen).length > 0
      ? "dot"
      : "standard";

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
      {props.allNotifications.length > 0 && (
        <Menu
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
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  allNotifications: state.auth.notifications,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNotifications: (not: NotificationDto[]) => dispatch(setNotifications(not)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
