import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "../../../../store/store";
import FollowersDialog from "../../../_common/FollowersDialog/FollowersDialog";

// PE 2/3
const FollowersButtonDialog = (props: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Box>
      <Button size="small" onClick={() => setOpenDialog(true)}>
        {props.followers.length} Followers
      </Button>
      <FollowersDialog
        followers={props.followers}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Box>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  followers: state.profile.followers,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowersButtonDialog);
