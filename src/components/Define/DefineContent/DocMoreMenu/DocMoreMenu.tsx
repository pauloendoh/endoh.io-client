import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import EditIcon from "@mui/icons-material/Edit"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import useDeleteDocMutation from "hooks/react-query/define/doc/useDeleteDocMutation"
import { useAxios } from "hooks/utils/useAxios"
import React, { useMemo, useState } from "react"
import { AiOutlineClear } from "react-icons/ai"
import { IoMdPlayCircle } from "react-icons/io"
import { MdDelete } from "react-icons/md"
import { useHistory } from "react-router-dom"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useDialogsStore from "store/zustand/useDialogsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { NoteDto } from "types/domain/define/NoteDto"
import { urls } from "utils/urls"
import { DocDto } from "../../../../types/domain/define/DocDto"
import DocTitleDialog from "../../DocTitleDialog/DocTitleDialog"
import FlashcardDialog from "../FlashcardDialog/FlashcardDialog"

interface Props {
  doc: DocDto
  afterDelete?: () => void
}

function DocMoreMenu(props: Props) {
  const classes = useStyles()

  const myAxios = useAxios()

  const { setNotes, notes } = useDocsStore()
  const { openConfirmDialog } = useDialogsStore()
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [openTitleDialog, setOpenTitleDialog] = useState(false)

  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const [flashcardDialog, setFlashcardDialog] = useState(false)

  const docAvailableQuestions = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.docId === props.doc?.id &&
          note.question.trim().length > 0 &&
          note.description.trim().length > 0
      ),

    [notes, props.doc?.id]
  )

  const emptyNotes = useMemo(
    () =>
      notes?.filter(
        (n) =>
          n.question.trim().length === 0 &&
          n.description.trim().length === 0 &&
          n.docId === props.doc?.id
      ) || [],

    [notes, props.doc?.id]
  )

  const handleCloseMore = () => {
    setAnchorEl(null) // avoids error "The `anchorEl` prop provided to the component is invalid"
  }

  const handleClearEmptyNotes = () => {
    openConfirmDialog({
      title: `Clear ${emptyNotes.length} empty notes?`,
      onConfirm: () => {
        myAxios
          .delete<NoteDto[]>(urls.api.clearEmptyNotes(props.doc.id))
          .then((res) => {
            setSuccessMessage("Cleared empty notes")
            setNotes(res.data)
          })
          .catch((err) => setErrorMessage(err.response.data.message))
      },
    })
  }

  const { mutate: submitDeleteDoc } = useDeleteDocMutation()
  const history = useHistory()

  return (
    <React.Fragment>
      <IconButton
        id="doc-title-more"
        size="small"
        onClick={(e) => {
          e.preventDefault()
          handleOpenMore(e)
        }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="doc-title-more"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(e) => {
          const event = e as any
          event.preventDefault()
          handleCloseMore()
        }}
      >
        <MenuItem
          onClick={(e) => {
            setFlashcardDialog(true)
            handleCloseMore()
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <IoMdPlayCircle />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Exercise your memory
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            setOpenTitleDialog(true)
            handleCloseMore()
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Edit doc
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            handleClearEmptyNotes()
            handleCloseMore()
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <AiOutlineClear />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Clear empty notes
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            if (window.confirm("Delete doc?")) {
              submitDeleteDoc(props.doc.id)
            }
            handleCloseMore()
          }}
          style={{ color: "red" }}
        >
          <ListItemIcon
            className={classes.listItemIcon}
            style={{ color: "red" }}
          >
            <MdDelete />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Delete doc
          </Typography>
        </MenuItem>
      </Menu>

      <DocTitleDialog
        initialValue={{ title: props.doc.title }}
        open={openTitleDialog}
        afterSave={(doc) => {
          history.push(urls.pages.defineDoc(doc.id))
          setOpenTitleDialog(false)
        }}
        onClose={() => {
          setOpenTitleDialog(false)
        }}
        docId={props.doc.id}
      />

      {flashcardDialog && (
        <FlashcardDialog
          availableNotes={docAvailableQuestions}
          open={flashcardDialog}
          onClose={() => setFlashcardDialog(false)}
        />
      )}
    </React.Fragment>
  )
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  listItemIcon: {
    width: 16,
  },
}))

export default DocMoreMenu
