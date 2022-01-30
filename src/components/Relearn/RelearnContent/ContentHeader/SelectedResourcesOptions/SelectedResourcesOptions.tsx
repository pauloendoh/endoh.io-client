import { faArrowCircleRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import Txt from "components/_UI/Text/Txt";
import useMultiSelectResource from "hooks/relearn/useMultiSelectResource";
import React, { useState } from "react";
import useRelearnStore from "store/zustand/domain/useRelearnStore";
import { useTheme } from "styled-components";
import MoveResourcesToTagDialog from "./MoveResourcesToTagDialog/MoveResourcesToTagDialog";

// PE 2/3
const SelectedResourcesOptions = () => {
  const theme = useTheme();
  const { selectedResourceIds } = useRelearnStore();
  const { clearSelectedIds } = useMultiSelectResource();

  const [moveToTagDialog, setMoveToTagDialog] = useState(false);

  return (
    <FlexVCenter my={2} justifyContent="space-between">
      <FlexVCenter style={{ gap: 24 }}>
        <Txt>{selectedResourceIds.length} selected</Txt>
        <Button onClick={() => setMoveToTagDialog(true)}>
          <FlexVCenter style={{ color: theme.palette.secondary.main, gap: 4 }}>
            <FontAwesomeIcon icon={faArrowCircleRight} />
            <Txt>Move to tag</Txt>
          </FlexVCenter>
        </Button>
      </FlexVCenter>

      <Button variant="outlined" onClick={clearSelectedIds}>
        <FlexVCenter style={{ gap: 4 }}>
          <FontAwesomeIcon icon={faTimes} />
          <Txt>Unselect all</Txt>
        </FlexVCenter>
      </Button>
      <MoveResourcesToTagDialog
        resourceIds={selectedResourceIds}
        isOpen={moveToTagDialog}
        onClose={() => setMoveToTagDialog(false)}
      />
    </FlexVCenter>
  );
};

export default SelectedResourcesOptions;
