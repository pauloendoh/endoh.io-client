import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { startNewResource } from "store/relearn/relearnActions";
import theme from "utils/consts/theme";
import Icons from "utils/styles/Icons";
import { ApplicationState } from "../../../store/store";

// PE 2/3
const NavbarAddButton = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddResource = () => {
    props.startNewResource();
    handleClose();
  };

  return (
    <>
      <IconButton
        id="navbar-add-btn"
        onClick={handleClick}
        aria-controls="simple-menu"
        aria-haspopup="true"
        size="small"
        style={{ background: theme.palette.primary.main }}
      >
        <Icons.Add fontSize="small" />
      </IconButton>

      <Menu
        id="navbar-add-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem id="navbar-add-menu-option" onClick={handleAddResource}>
          <Box mr={2}>
            <FontAwesomeIcon icon={faLink} />
          </Box>
          Add resource
        </MenuItem>
      </Menu>
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startNewResource: () => dispatch(startNewResource()),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(NavbarAddButton);
