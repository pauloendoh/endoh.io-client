import {
  Box,
  createStyles,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import DescriptionIcon from "@material-ui/icons/Description"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import FlexHCenter from "../../../components/shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import MyTextField from "../../../components/shared/MyInputs/MyTextField"
import PATHS from "../../../consts/PATHS"
import { DocDto } from "../../../dtos/define/DocDto"
import { ApplicationState } from "../../../store/store"
import DocTitleDialog from "../DocTitleDialog/DocTitleDialog"

function DefineSidebar(props: Props) {
  const history = useHistory()
  const classes = useStyles()

  const [openTitleDialog, setOpenTitleDialog] = useState(false)

  const getNotesCount = (doc: DocDto) => {
    return props.allNotes.filter((note) => note.docId === doc.id).length
  }

  const [textFilter, setTextFilter] = useState("")

  const filterAndSortDocs = () => {
    let filtered = props.allDocs.filter((d) =>
      d.title.toUpperCase().includes(textFilter.toUpperCase().trim())
    )

    return filtered.sort((a, b) => a.title.localeCompare(b.title))
  }

  return (
    <Drawer
      className={classes.root}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Box className={classes.drawerContainer}>
        <Box pt={4} px={2}>
          <MyTextField
            fullWidth
            style={{ marginLeft: "auto", marginRight: "auto" }}
            label="Filter docs"
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
          />
        </Box>
        <List disablePadding>
          <ListItem>
            <ListItemText>
              <FlexVCenter justifyContent="space-between">
                <Box>{filterAndSortDocs().length} Docs</Box>
                <IconButton
                  size="small"
                  onClick={() => setOpenTitleDialog(true)}
                >
                  <AddIcon />
                </IconButton>
                <DocTitleDialog
                  open={openTitleDialog}
                  initialValue=""
                  onClose={() => setOpenTitleDialog(false)}
                  afterSave={(doc) => {
                    history.push(PATHS.define.doc(doc.id))
                    setOpenTitleDialog(false)
                  }}
                />
              </FlexVCenter>
            </ListItemText>
          </ListItem>
          {filterAndSortDocs().map((doc) => (
            <ListItem
              key={doc.id}
              button
              component={Link}
              to={PATHS.define.doc(doc.id)}
              selected={props.selectedDocId === doc.id}
            >
              <ListItemText>
                <Flex>
                  <DescriptionIcon />
                  <Box ml={1} width={210}>
                    <Typography style={{ maxWidth: "inherit" }}>
                      {doc.title}
                    </Typography>
                  </Box>
                  <FlexHCenter width={24}>
                    <Typography className={classes.resourcesCount}>
                      {getNotesCount(doc)}
                    </Typography>
                  </FlexHCenter>
                </Flex>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
      flexShrink: 0,
    },

    drawerPaper: {
      width: 300,
      background: "#202020",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    },
    drawerContainer: {
      // overflow: "auto",
    },
    resourcesCount: {
      fontSize: 12,
      color: theme.palette.grey[400],
    },
  })
)

const mapStateToProps = (state: ApplicationState) => ({
  allDocs: state.define.docs,
  allNotes: state.define.notes,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  selectedDocId: number
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(DefineSidebar)
