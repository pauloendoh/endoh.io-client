import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import SkillExpectations from "components/Skillbase/SkillDialog/SkillExpectations/SkillExpectations";
import React from "react";
import { SkillDto } from "types/domain/skillbase/SkillDto";

interface Props {
  open: boolean;
  skill: SkillDto;
  onClose: () => void;
}

const UserRoadmapsDialog = (props: Props) => {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="user-roadmaps-dialog"
    >
      <DialogTitle id="user-roadmaps-dialog-title">
        {props.skill.name}
      </DialogTitle>
      <DialogContent>
        <SkillExpectations
          currentLevel={0}
          expectations={props.skill.expectations}
          disabled
          onChangeExpectations={() => null}
        />
      </DialogContent>
      <DialogTitle>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </DialogTitle>
    </Dialog>
  );
};

export default UserRoadmapsDialog;
