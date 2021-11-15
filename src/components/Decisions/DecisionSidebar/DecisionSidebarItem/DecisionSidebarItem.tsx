import { Box, ListItem, ListItemText, Typography } from "@material-ui/core";
import produce from "immer";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import usePostDecisionMutation from "../../../../hooks/BigDecisions/Decision/usePostDecisionMutation";
import { DecisionDto } from "../../../../types/domain/big-decisions/DecisionDto";
import getWinnerTable from "../../../../utils/domain/BigDecision/getWinnerTable";
import pageUrls from "../../../../utils/url/urls/pageUrls";
import PriorityStarIcon from "../../../Skillbase/SkillDialog/PriorityStarIcon/PriorityStarIcon";
import Flex from "../../../_UI/Flexboxes/Flex";
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter";
import Txt from "../../../_UI/Text/Txt";
import DecisionMoreIcon from "./DecisionMoreIcon/DecisionMoreIcon";

type Props = { decision: DecisionDto; isSelected: boolean };

const DecisionSidebarItem = ({ decision, isSelected }: Props) => {
  const hoverRef = useRef(null);
  // const isHover = useHover(hoverRef)

  const postDecisionMutation = usePostDecisionMutation();

  const changePriority = (decision: DecisionDto) => {
    const newDecision = produce(decision, (newDecision) => {
      newDecision.isPriority = !decision.isPriority;
    });

    postDecisionMutation.mutate(newDecision);
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <ListItem
      ref={hoverRef}
      button
      key={decision.id}
      component={Link}
      to={pageUrls.BigDecisions.decision(decision.id)}
      selected={isSelected}
      disableGutters
      style={{ paddingLeft: 16, paddingRight: 16 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ListItemText>
        <Flex>
          <FlexVCenter>
            <PriorityStarIcon
              isPriority={decision.isPriority}
              tooltipText="Priority decision"
              onClick={() => {
                changePriority(decision);
              }}
            />
          </FlexVCenter>

          <Box ml={2} mt={0.5} width={180}>
            <Typography>
              <strong>{decision.title}</strong>
            </Typography>
            {getWinnerTable(decision.tables) && (
              <Box mt={1}>
                <Txt variant="body2">
                  {getWinnerTable(decision.tables).title}
                </Txt>
              </Box>
            )}
          </Box>
        </Flex>
      </ListItemText>
      {isHovered && <DecisionMoreIcon decision={decision} />}
    </ListItem>
  );
};

export default DecisionSidebarItem;
