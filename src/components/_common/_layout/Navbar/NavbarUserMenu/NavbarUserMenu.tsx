import { faCog, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, IconButton, Typography } from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useLogout } from "hooks/auth/useLogout"
import { useState } from "react"
import { MdHelpOutline } from "react-icons/md"
import { connect } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import useAuthStore from "store/zustand/useAuthStore"
import theme from "utils/consts/theme"
import ProfilePicture from "../../../../_UI/ProfilePicture/ProfilePicture"
import KeyboardShortcutsDialog from "./KeyboardShortcutsDialog/KeyboardShortcutsDialog"

// PE 2/3
const NavbarUserMenu = (props: Props) => {
  const location = useLocation()
  const { profile, authUser } = useAuthStore()

  const [anchorEl, setAnchorEl] = useState(null)
  const [shortcutsDialog, setShortcutsDialog] = useState(false)

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  let settingsHref = "/settings"
  if (location.pathname.startsWith("/monerate")) {
    settingsHref = "/settings/monerate/places"
  }

  const logout = useLogout(props.dispatch)

  return (
    <div>
      <IconButton
        size="small"
        id="user-menu-btn"
        onClick={handleOpenMenu}
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        <ProfilePicture
          isLink={false}
          pictureUrl={profile?.pictureUrl}
          username={authUser?.username}
          size="1.875rem"
        />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          component={Link}
          to={"/user/" + authUser.username}
          id="profile-user-menu-option"
          onClick={handleCloseMenu}
        >
          <Box mr={2}>
            <FontAwesomeIcon icon={faUser} />
          </Box>
          Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleCloseMenu()
            setShortcutsDialog(true)
          }}
        >
          <FlexVCenter style={{ gap: 16 }}>
            <MdHelpOutline />
            Keyboard Shortcuts
          </FlexVCenter>
        </MenuItem>

        {authUser?.userExpiresAt ? (
          <MenuItem
            component={Link}
            to={settingsHref}
            id="settings-user-menu"
            sx={(theme) => ({ color: theme.palette.primary.main })}
          >
            <Box mr={2}>
              <FontAwesomeIcon icon={faCog} />
            </Box>
            Keep user
          </MenuItem>
        ) : (
          <MenuItem component={Link} to={settingsHref} id="settings-user-menu">
            <Box mr={2}>
              <FontAwesomeIcon icon={faCog} />
            </Box>
            Settings
          </MenuItem>
        )}

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

      <KeyboardShortcutsDialog
        open={shortcutsDialog}
        onClose={() => setShortcutsDialog(false)}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch,
})

type Props = ReturnType<typeof mapDispatchToProps>

export default connect(undefined, mapDispatchToProps)(NavbarUserMenu)
