import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import useProfileStore from "store/zustand/domain/useProfileStore";
import FollowingUsersDialog from "../../../_common/FollowingUsersDialog/FollowingUsersDialog";
// PE 2/3
const FollowingButtonDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const profileStore = useProfileStore();

  return (
    <Box>
      <Button size="small" onClick={() => setOpenDialog(true)}>
        {profileStore.followingUsers.length} Following
      </Button>
      <FollowingUsersDialog
        followingUsers={profileStore.followingUsers}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Box>
  );
};

export default FollowingButtonDialog;
