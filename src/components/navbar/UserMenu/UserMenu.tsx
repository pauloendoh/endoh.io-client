import { faCog, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import theme from "consts/theme";
import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { logoutActionCreator } from "../../../store/auth/authActions";
import { ApplicationState } from "../../../store/store";
import ProfilePicture from "../../shared/ProfilePicture/ProfilePicture";

// PE 2/3
const UserMenu = (props: Props) => {
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let settingsHref = "/settings";
  if (location.pathname.startsWith("/monerate")) {
    settingsHref = "/settings/monerate/places";
  }

  return (
    <div>
      <Button
        id="user-menu-btn"
        onClick={handleClick}
        fullWidth
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        {props.profile && (
          <ProfilePicture
            isLink={false}
            pictureUrl={props.profile.pictureUrl}
            username={props.authUser.username}
            size="1.875rem"
          />
        )}
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          component={Link}
          to={"/user/" + props.authUser.username}
          id="profile-user-menu-option"
          onClick={handleClose}
        >
          <Box mr={2}>
            <FontAwesomeIcon icon={faUser} />
          </Box>
          Profile
        </MenuItem>

        <MenuItem component={Link} to={settingsHref} id="settings-user-menu">
          <Box mr={2}>
            <FontAwesomeIcon icon={faCog} />
          </Box>
          Settings
        </MenuItem>

        <MenuItem className="logout-option" onClick={() => props.logout()}>
          <Box mr={2}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              color={theme.palette.error.main}
            />
          </Box>
          <Typography variant="inherit" noWrap color="error">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  authUser: state.auth.user,
  profile: state.auth.profile,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logoutActionCreator(dispatch)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
