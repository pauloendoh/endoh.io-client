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
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React, { useState } from "react"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import MyTextField from "../../../components/shared/MyInputs/MyTextField"
import { newDecisionDto } from "../../../dtos/BigDecisions/DecisionDto"
import useDecisionsQuery from "../../../hooks/BigDecisions/Decision/useDecisionsQuery"
import useDialogsStore from "../../../store/zustand/useDialogsStore"
import useSidebarStore from "../../../store/zustand/useSidebarStore"
import LoadingPage from "../../index/LoadingPage"
import DecisionSidebarItem from "./DecisionSidebarItem/DecisionSidebarItem"

type Props = { selectedDecisionId: number }

const DecisionSidebar = (props: Props) => {
  const classes = useStyles()

  const [textFilter, setTextFilter] = useState("")
  const { openDecisionDialog } = useDialogsStore()
  const { sidebarIsOpen } = useSidebarStore()

  const { data: decisions, isLoading } = useDecisionsQuery()

  return (
    <Drawer
      anchor="left"
      className={classes.root}
      variant="persistent"
      open={sidebarIsOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Box>
        <Box pt={4} px={2}>
          <MyTextField
            fullWidth
            style={{ marginLeft: "auto", marginRight: "auto" }}
            label="Filter decisions"
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
          />
        </Box>
        <List disablePadding>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <React.Fragment>
              <ListItem>
                <ListItemText>
                  <FlexVCenter justifyContent="space-between">
                    <Box>{decisions?.length} decisions</Box>
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
      flexShrink: 0,
    },

    drawerPaper: {
      width: 300,
      background: "#202020",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    },
  })
)

export default DecisionSidebar
