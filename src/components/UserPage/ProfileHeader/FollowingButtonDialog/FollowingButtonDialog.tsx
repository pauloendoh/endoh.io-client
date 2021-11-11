import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "../../../../store/store";
import FollowingUsersDialog from "../../../_common/FollowingUsersDialog/FollowingUsersDialog";
// PE 2/3
const FollowingButtonDialog = (props: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Box>
      <Button size="small" onClick={() => setOpenDialog(true)}>
        {props.followingUsers.length} Following
      </Button>
      <FollowingUsersDialog
        followingUsers={props.followingUsers}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Box>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  followingUsers: state.profile.followingUsers,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowingButtonDialog);
