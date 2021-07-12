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
import React, { useState } from "react"
import { Link } from "react-router-dom"
import Flex from "../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import PATHS from "../../../consts/PATHS"
import { newDecisionDto } from "../../../dtos/BigDecisions/DecisionDto"
import useDecisionsQuery from "../../../utils/hooks/queryHooks/BigDecisions/useDecisionsQuery"
import LoadingPage from "../../index/LoadingPage"
import DecisionDialog from "../DecisionDialog/DecisionDialog"

type Props = { selectedDecisionId: number }

const BigDecisionsSidebar = (props: Props) => {
  const classes = useStyles()

  const [openDecisionDialog, setOpenDecisionDialog] = useState(false)

  const { data: decisions, isLoading } = useDecisionsQuery()

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
        <List disablePadding>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <React.Fragment>
              <ListItem>
                <ListItemText>
                  <FlexVCenter justifyContent="space-between">
                    <Box ml={2}>
                      <Typography variant="h6">
                        {decisions?.length} decisions
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => setOpenDecisionDialog(true)}
                    >
                      <AddIcon />
                    </IconButton>
                    <DecisionDialog
                      open={openDecisionDialog}
                      initialValue={newDecisionDto()}
                      onClose={() => setOpenDecisionDialog(false)}
                      // afterSave={(doc) => {
                      //   history.push(PATHS.define.doc(doc.id))
                      //   setOpenTitleDialog(false)
                      // }}
                    />
                  </FlexVCenter>
                </ListItemText>
              </ListItem>
              {decisions.map((decision) => (
                <ListItem
                  button
                  key={decision.id}
                  component={Link}
                  to={PATHS.BigDecisions.decision(decision.id)}
                  selected={props.selectedDecisionId === decision.id}
                >
                  <ListItemText>
                    <Flex ml={2}>
                      <Typography>{decision.title}</Typography>
                    </Flex>
                  </ListItemText>
                </ListItem>
              ))}
            </React.Fragment>
          )}
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

export default BigDecisionsSidebar
