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
import React, { useState } from "react";
import { DocDto } from "../../../../types/domain/define/DocDto";
import DocTitleDialog from "../../DocTitleDialog/DocTitleDialog";

interface Props {
  doc: DocDto;
  afterDelete?: () => void;
}

// PE 2/3 - MenuItem could be shorter?
function TitleMoreIcon(props: Props) {
  const classes = useStyles();

  const [openTitleDialog, setOpenTitleDialog] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMore = () => {
    setAnchorEl(null); // avoids error "The `anchorEl` prop provided to the component is invalid"
  };

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
            e.preventDefault();
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
      </Menu>

      <DocTitleDialog
        initialValue={props.doc.title}
        open={openTitleDialog}
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

export default TitleMoreIcon;
