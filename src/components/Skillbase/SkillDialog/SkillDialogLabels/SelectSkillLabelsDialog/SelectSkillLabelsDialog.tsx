import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import DarkButton from "components/_UI/Buttons/DarkButton/DarkButton";
import FlexCol from "components/_UI/Flexboxes/FlexCol";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import Txt from "components/_UI/Text/Txt";
import useLabelsQuery from "hooks/react-query/skillbase/labels/useLabelsQuery";
import React, { useMemo, useState } from "react";
import { MdClose } from "react-icons/md";
import { newLabelDto } from "types/domain/skillbase/LabelDto";
import EditLabelDialog from "./EditLabelDialog/EditLabelDialog";
import SkillLabelOption from "./SkillLabelOption/SkillLabelOption";

interface Props {
  open: boolean;
  // initialValue: DecisionDto;
  skillId: number;
  onClose: () => void;
  // afterSave?: (returned: DecisionDto) => void;
}

const SelectSkillLabelsDialog = (props: Props) => {
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const [labelDialogInitialValue, setLabelDialogInitialValue] = useState(
    newLabelDto()
  );
  const { data: labels } = useLabelsQuery();

  const sortedLabels = useMemo(() => {
    return labels?.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
  }, [labels]);

  // const [selectedLabelIds, setSelectedLabelIds] = useState<number[]>([]);

  const handleClose = () => {
    props.onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      // maxWidth="xs"

      PaperProps={{ style: { maxWidth: 320 } }}
      aria-labelledby="select-skill-labels-dialog"
    >
      <Box pb={1}>
        <DialogTitle id="select-skill-labels-dialog-title">
          <FlexVCenter justifyContent="space-between">
            <Txt variant="h6">Labels</Txt>
            <IconButton onClick={props.onClose} size="small">
              <MdClose />
            </IconButton>
          </FlexVCenter>
        </DialogTitle>
        <DialogContent>
          <FlexCol style={{ gap: 8 }}>
            {sortedLabels?.map((label) => (
              <SkillLabelOption
                label={label}
                skillId={props.skillId}
                onClickEdit={() => {
                  setLabelDialogOpen(true);
                  setLabelDialogInitialValue(label);
                }}
              />
            ))}
          </FlexCol>

          <DarkButton
            fullWidth
            onClick={() => {
              setLabelDialogOpen(true);
              setLabelDialogInitialValue(newLabelDto());
            }}
            style={{ marginTop: 16 }}
          >
            + New Label
          </DarkButton>
        </DialogContent>
      </Box>
      <EditLabelDialog
        open={labelDialogOpen}
        skillId={props.skillId}
        initialValue={labelDialogInitialValue}
        onClose={() => setLabelDialogOpen(false)}
      />
    </Dialog>
  );
};

export default SelectSkillLabelsDialog;
