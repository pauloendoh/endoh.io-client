import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import useProfileStore from "store/zustand/domain/useProfileStore";
import FollowersDialog from "../../../_common/FollowersDialog/FollowersDialog";

// PE 2/3
const FollowersButtonDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const profileStore = useProfileStore();

  return (
    <Box>
      <Button size="small" onClick={() => setOpenDialog(true)}>
        {profileStore.followers.length} Followers
      </Button>
      <FollowersDialog
        followers={profileStore.followers}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Box>
  );
};

export default FollowersButtonDialog;
