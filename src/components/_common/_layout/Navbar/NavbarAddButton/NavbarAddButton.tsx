import { Fab, Tooltip } from "@material-ui/core";
import React from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { startNewResource } from "store/relearn/relearnActions";
import { sleep } from "utils/sleep";
import Icons from "utils/styles/Icons";
import { ApplicationState } from "../../../../../store/store";

// PE 2/3
const NavbarAddButton = (props: Props) => {
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event: any) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleAddResource = () => {
    props.startNewResource();
    // handleClose();
  };

  const keyMap = { openModal: "q" };
  const handlers = {
    openModal: async () => {
      await sleep(100); // required so it doesn't add 'q' at the title field immediately
      props.startNewResource();
    },
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Tooltip title="(q) Add resource">
        <Fab
          id="navbar-add-btn"
          onClick={handleAddResource}
          color="primary"
          size="small"
        >
          <Icons.Add />
        </Fab>
      </Tooltip>

      {/* <Menu
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
      </Menu> */}
    </GlobalHotKeys>
  );
};

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startNewResource: () => dispatch(startNewResource()),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(NavbarAddButton);
