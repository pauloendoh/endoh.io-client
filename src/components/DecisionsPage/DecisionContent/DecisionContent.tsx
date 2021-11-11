import { Button, Container, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import useDecisionsQuery from "../../../hooks/BigDecisions/Decision/useDecisionsQuery";
import useDialogsStore from "../../../store/zustand/useDialogsStore";
import { newDecisionTableDto } from "../../../types/domain/big-decisions/DecisionTableDto";
import getWinnerTable from "../../../utils/domain/BigDecision/getWinnerTable";
import Flex from "../../_UI/Flexboxes/Flex";
import DecisionMoreIcon from "../DecisionSidebar/DecisionSidebarItem/DecisionMoreIcon/DecisionMoreIcon";
import DecisionTable from "./DecisionTable/DecisionTable";

type Props = { decisionId: number };

const DecisionContent = (props: Props) => {
  const { data: allDecisions } = useDecisionsQuery();

  const decision = allDecisions?.find((d) => d.id === props.decisionId);

  const getTables = () =>
    [...decision.tables].sort((a, b) => a.index - b.index);

  const winnerTable = decision ? getWinnerTable(getTables()) : null;

  const { openDecisionTableDialog } = useDialogsStore();

  if (!decision) return null;
  return (
    <Container>
      <Flex justifyContent="space-between">
        <Typography variant="h4">{decision.title}</Typography>
        <DecisionMoreIcon decision={decision} />
      </Flex>

      <Flex mt={4}>
        <Button
          onClick={() =>
            openDecisionTableDialog(newDecisionTableDto(props.decisionId))
          }
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
        >
          Add table
        </Button>
      </Flex>
      <Flex flexWrap="wrap">
        {getTables().map((table) => (
          <DecisionTable
            key={table.id}
            table={table}
            isWinner={winnerTable?.id === table.id}
          />
        ))}
      </Flex>
    </Container>
  );
};

export default DecisionContent;
