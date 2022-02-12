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
import useAuthStore from "store/zustand/useAuthStore";
import theme from "utils/consts/theme";
import ProfilePicture from "../../../../_UI/ProfilePicture/ProfilePicture";

// PE 2/3
const NavbarUserMenu = (props: Props) => {
  const location = useLocation();
  const { profile, authUser: user } = useAuthStore();

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
        {profile && (
          <ProfilePicture
            isLink={false}
            pictureUrl={profile.pictureUrl}
            username={user.username}
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
          to={"/user/" + user.username}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch,
});

type Props = ReturnType<typeof mapDispatchToProps>;

export default connect(undefined, mapDispatchToProps)(NavbarUserMenu);
