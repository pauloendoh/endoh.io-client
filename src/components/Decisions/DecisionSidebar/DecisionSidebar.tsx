import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material"
import FlexCenter from "components/_UI/Flexboxes/FlexCenter"
import React, { useState } from "react"
import { MdAdd, MdSearch } from "react-icons/md"
import useDialogsStore from "store/zustand/useDialogsStore"
import useDecisionsQuery from "../../../hooks/BigDecisions/Decision/useDecisionsQuery"
import { newDecisionDto } from "../../../types/domain/big-decisions/DecisionDto"
import stringsAreVerySimilar from "../../../utils/text/stringsAreVerySimilar"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import MyTextField from "../../_UI/MyInputs/MyTextField"
import MySidebar from "../../_UI/MySidebar/MySidebar"
import LoadingPage from "../../_common/LoadingPage/LoadingPage"
import DecisionSidebarItem from "./DecisionSidebarItem/DecisionSidebarItem"

type Props = { selectedDecisionId: number }

const DecisionSidebar = (props: Props) => {
  const [textFilter, setTextFilter] = useState("")
  const { openDecisionDialog } = useDialogsStore()

  const { data: decisions, isLoading } = useDecisionsQuery()

  const getFilteredDecisions = () => {
    if (!decisions) return []

    const sortedDecisions = decisions.sort((a, b) =>
      a.isPriority && !b.isPriority ? -1 : 1
    )

    if (textFilter.length) {
      return sortedDecisions.filter((d) =>
        stringsAreVerySimilar(d.title, textFilter)
      )
    }

    return sortedDecisions
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
                <MdSearch style={{ fontSize: "0.95rem" }} />
                <Box ml={0.5}>Filter Decisions</Box>
              </FlexVCenter>
            }
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
          />
        </Box>
        <List disablePadding>
          {isLoading ? (
            <FlexCenter mt={2}>
              <LoadingPage />
            </FlexCenter>
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
                      <MdAdd />
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
