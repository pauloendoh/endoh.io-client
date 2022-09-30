import {
  IconButton,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useDeleteDocMutation from "hooks/react-query/define/doc/useDeleteDocMutation";
import React, { useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useHistory } from "react-router-dom";
import useDocsStore from "store/zustand/domain/useDocsStore";
import useDialogsStore from "store/zustand/useDialogsStore";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import { NoteDto } from "types/domain/define/NoteDto";
import myAxios from "utils/consts/myAxios";
import { urls } from "utils/urls";
import { DocDto } from "../../../../types/domain/define/DocDto";
import DocTitleDialog from "../../DocTitleDialog/DocTitleDialog";

interface Props {
  doc: DocDto;
  afterDelete?: () => void;
}

function DocMoreMenu(props: Props) {
  const classes = useStyles();

  const { setNotes } = useDocsStore();
  const { openConfirmDialog } = useDialogsStore();
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openTitleDialog, setOpenTitleDialog] = useState(false);

  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorEl(null); // avoids error "The `anchorEl` prop provided to the component is invalid"
  };

  const handleClearEmptyNotes = () => {
    openConfirmDialog({
      title: "Clear empty notes?",
      onConfirm: () => {
        myAxios
          .delete<NoteDto[]>(urls.api.clearEmptyNotes(props.doc.id))
          .then((res) => {
            setSuccessMessage("Cleared empty notes");
            setNotes(res.data);
          })
          .catch((err) => setErrorMessage(err.response.data.message));
      },
    });
  };

  const { mutate: submitDeleteDoc } = useDeleteDocMutation();
  const history = useHistory();

  return (
    <React.Fragment>
      <IconButton
        id="doc-title-more"
        size="small"
        onClick={(e) => {
          e.preventDefault();
          handleOpenMore(e);
        }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="doc-title-more"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(e) => {
          const event = e as any;
          event.preventDefault();
          handleCloseMore();
        }}
      >
        <MenuItem
          onClick={(e) => {
            setOpenTitleDialog(true);
            handleCloseMore();
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Edit
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            if (window.confirm("Delete doc?")) {
              submitDeleteDoc(props.doc.id);
            }
            handleCloseMore();
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <MdDelete />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Delete doc
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClearEmptyNotes();
            handleCloseMore();
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <AiOutlineClear />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Clear empty notes
          </Typography>
        </MenuItem>
      </Menu>

      <DocTitleDialog
        initialValue={{ title: props.doc.title }}
        open={openTitleDialog}
        afterSave={() => {
          setOpenTitleDialog(false);
        }}
        onClose={() => {
          setOpenTitleDialog(false);
        }}
        docId={props.doc.id}
      />
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  listItemIcon: {
    width: 16,
  },
}));

export default DocMoreMenu;
