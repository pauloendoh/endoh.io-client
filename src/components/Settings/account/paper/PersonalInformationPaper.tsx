import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useAuthStore from "store/zustand/useAuthStore";
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter";
import ChangePasswordDialog from "./dialogs/ChangePasswordDialog";
import DeleteAccountDialog from "./dialogs/DeleteAccountDialog";
import EditUsernameDialog from "./dialogs/EditUsernameDialog";

// PE 2/3 - Maybe I should separate this into <UsernameRow/>, <EmailRow/>, <PasswordRow/> and <DeleteAccountRow>
const PersonalInformationPaper = () => {
  const classes = useStyles();
  const { authUser } = useAuthStore();

  const [editUsernameDialog, setEditUsernameDialog] = useState(false);
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);

  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h5">Personal Information</Typography>
        <Box mt={2} />

        <Grid container alignItems="center" spacing={3}>
          <Grid item className={classes.leftGrid}>
            Username
          </Grid>
          <Grid item>
            <FlexVCenter>
              <Box mr={2}>{authUser.username}</Box>
              <Button
                id="edit-username-btn"
                color="primary"
                onClick={() => setEditUsernameDialog(true)}
              >
                Edit
              </Button>
              <EditUsernameDialog
                open={editUsernameDialog}
                onClose={() => {
                  setEditUsernameDialog(false);
                }}
              />
            </FlexVCenter>
          </Grid>
        </Grid>

        <Box pt={1} />
        <Grid container>
          <Grid item className={classes.leftGrid}>
            Email
          </Grid>
          <Grid item>{authUser.email}</Grid>
        </Grid>

        <Box pt={1} />
        <Grid container alignItems="center">
          <Grid item className={classes.leftGrid}>
            Password
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => {
                setChangePasswordDialog(true);
              }}
            >
              Change Password
              <ChangePasswordDialog
                open={changePasswordDialog}
                onClose={() => {
                  // I need to add an small delay (why, tho?)
                  setTimeout(() => {
                    setChangePasswordDialog(false);
                  }, 25);
                }}
              />
            </Button>
          </Grid>
        </Grid>

        <Box pt={3} />

        <Divider />
        <FlexVCenter pt={3}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setDeleteAccountDialog(true);
            }}
          >
            Delete my account
          </Button>

          <DeleteAccountDialog
            open={deleteAccountDialog}
            onClose={() => {
              // ???? why is this not working?

              setTimeout(() => {
                setDeleteAccountDialog(false);
              }, 25);
            }}
          />

          <Box ml={3}>Requires password</Box>
        </FlexVCenter>
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  leftGrid: {
    width: 100,
  },
}));

export default PersonalInformationPaper;
