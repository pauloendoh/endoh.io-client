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
  const handleAddResource = () => {
    props.startNewResource();
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
          style={{
            width: "1.875rem",
            height: "1.875rem",
            minHeight: "1.875rem",
          }}
        >
          <Icons.Add />
        </Fab>
      </Tooltip>
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
