import { faCog, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, Typography } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useLogout } from "hooks/auth/useLogout";
import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import theme from "utils/consts/theme";
import { ApplicationState } from "../../../../../store/store";
import ProfilePicture from "../../../../_UI/ProfilePicture/ProfilePicture";

// PE 2/3
const NavbarUserMenu = (props: Props) => {
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

  const logout = useLogout(props.dispatch);

  return (
    <div>
      <IconButton
        size="small"
        id="user-menu-btn"
        onClick={handleClick}
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
      </IconButton>

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

        <MenuItem className="logout-option" onClick={logout}>
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
  dispatch,
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(NavbarUserMenu);