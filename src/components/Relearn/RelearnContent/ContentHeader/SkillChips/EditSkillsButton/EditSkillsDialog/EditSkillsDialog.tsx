import { Box, Dialog, DialogContent } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../../../../../store/store";
import { TagDto } from "../../../../../../../types/domain/relearn/TagDto";
import SkillbaseTable from "../../../../../../Skillbase/SkillTable/SkillbaseTable";

// PE 2/3
function EditSkillsDialog(props: Props) {
  return (
    <Dialog
      onClose={props.onClose}
      open={!!props.tag}
      fullWidth
      maxWidth="md"
      aria-labelledby="edit-skills-dialog"
    >
      {props.tag && (
        <React.Fragment>
          <DialogContent style={{ padding: 0 }}>
            <Box width="100%">
              <SkillbaseTable fixedTag={props.tag} tag={props.tag} />
            </Box>
          </DialogContent>
        </React.Fragment>
      )}
    </Dialog>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
});

interface OwnProps {
  tag: TagDto;
  onClose: () => void;
}

type Props = ReturnType<typeof mapStateToProps> & OwnProps;

export default connect(mapStateToProps, undefined)(EditSkillsDialog);
