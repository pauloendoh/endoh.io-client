import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import FlexCenter from "components/_UI/Flexboxes/FlexCenter";
import React, { useState } from "react";
import useDecisionsQuery from "../../../hooks/BigDecisions/Decision/useDecisionsQuery";
import useDialogsStore from "../../../store/zustand/useDialogsStore";
import { newDecisionDto } from "../../../types/domain/big-decisions/DecisionDto";
import stringsAreVerySimilar from "../../../utils/text/stringsAreVerySimilar";
import LoadingPage from "../../_common/LoadingPage/LoadingPage";
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter";
import MyTextField from "../../_UI/MyInputs/MyTextField";
import MySidebar from "../../_UI/MySidebar";
import DecisionSidebarItem from "./DecisionSidebarItem/DecisionSidebarItem";

type Props = { selectedDecisionId: number };

const DecisionSidebar = (props: Props) => {
  const [textFilter, setTextFilter] = useState("");
  const { openDecisionDialog } = useDialogsStore();

  const { data: decisions, isLoading } = useDecisionsQuery();

  const getFilteredDecisions = () => {
    if (!decisions) return [];

    const sortedDecisions = decisions.sort((a, b) =>
      a.isPriority && !b.isPriority ? -1 : 1
    );

    if (textFilter.length) {
      return sortedDecisions.filter((d) =>
        stringsAreVerySimilar(d.title, textFilter)
      );
    }

    return sortedDecisions;
  };

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
  );
};

export default DecisionSidebar;
