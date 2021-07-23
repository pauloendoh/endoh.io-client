import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from "@material-ui/icons/Search"
import React, { useState } from "react"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import MyTextField from "../../../components/shared/MyInputs/MyTextField"
import MySidebar from "../../../components/shared/MySidebar"
import { newDecisionDto } from "../../../dtos/BigDecisions/DecisionDto"
import useDecisionsQuery from "../../../hooks/BigDecisions/Decision/useDecisionsQuery"
import useDialogsStore from "../../../store/zustand/useDialogsStore"
import stringsAreVerySimilar from "../../../utils/text/stringsAreVerySimilar"
import LoadingPage from "../../index/LoadingPage"
import DecisionSidebarItem from "./DecisionSidebarItem/DecisionSidebarItem"

type Props = { selectedDecisionId: number }

const DecisionSidebar = (props: Props) => {
  const [textFilter, setTextFilter] = useState("")
  const { openDecisionDialog } = useDialogsStore()

  const { data: decisions, isLoading } = useDecisionsQuery()

  const getFilteredDecisions = () => {
    if (textFilter.length) {
      return decisions.filter((d) => stringsAreVerySimilar(d.title, textFilter))
    }
    return decisions
  }

  return (
    <MySidebar>
      <Box>
        <Box pt={4} px={2}>
          <MyTextField
            fullWidth
            style={{ marginLeft: "auto", marginRight: "auto" }}
            label={
              <FlexVCenter>
                <SearchIcon style={{ fontSize: "0.95rem" }} />
                <Box ml={0.5}>Filter Decisions</Box>
              </FlexVCenter>
            }
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
                    <Box>{getFilteredDecisions()?.length} decisions</Box>
                    <IconButton
                      size="small"
                      onClick={() => openDecisionDialog(newDecisionDto())}
                    >
                      <AddIcon />
                    </IconButton>
                  </FlexVCenter>
                </ListItemText>
              </ListItem>
              {getFilteredDecisions().map((decision) => (
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
    </MySidebar>
  )
}

export default DecisionSidebar
