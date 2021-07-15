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
  Typography
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React from "react"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import { newDecisionDto } from "../../../dtos/BigDecisions/DecisionDto"
import useDialogsStore from "../../../store/zustand/useDialogsStore"
import useDecisionsQuery from "../../../hooks/BigDecisions/Decision/useDecisionsQuery"
import LoadingPage from "../../index/LoadingPage"
import DecisionSidebarItem from "./DecisionSidebarItem/DecisionSidebarItem"

type Props = { selectedDecisionId: number }

const BigDecisionsSidebar = (props: Props) => {
  const classes = useStyles()

  const { data: decisions, isLoading } = useDecisionsQuery()

  const { openDecisionDialog } = useDialogsStore()

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
                      onClick={() => openDecisionDialog(newDecisionDto())}
                    >
                      <AddIcon />
                    </IconButton>
                  </FlexVCenter>
                </ListItemText>
              </ListItem>
              {decisions.map((decision) => (
                <DecisionSidebarItem
                  key={decision.id}
                  decision={decision}
                  isSelected={props.selectedDecisionId === decision.id}
                />
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
  })
)

export default BigDecisionsSidebar
