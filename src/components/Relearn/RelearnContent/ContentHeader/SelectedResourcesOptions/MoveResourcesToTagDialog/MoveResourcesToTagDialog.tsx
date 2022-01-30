import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import SkillDialogTagSelector from "components/Skillbase/SkillDialog/SkillDialogTagSelector/SkillDialogTagSelector";
import SaveCancelButtons from "components/_UI/Buttons/SaveCancelButtons";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setResources } from "store/relearn/relearnActions";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import { ResourceDto } from "types/domain/relearn/ResourceDto";
import myAxios from "utils/consts/myAxios";
import apiUrls from "utils/url/urls/apiUrls";
import { ApplicationState } from "../../../../../../store/store";

// PE 2/3
const MoveResourcesToTagDialog = (props: Props) => {
  const [selectedTagId, setSelectedTagId] = useState<number>(null);
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const onSubmit = () => {
    myAxios
      .put<ResourceDto[]>(apiUrls.relearn.resourceMoveToTag, {
        resourceIds: props.resourceIds,
        toTagId: selectedTagId,
      })
      .then((res) => {
        console.log(res.data);
        props.setResources(res.data);
        props.onClose();
        setSuccessMessage("Resources saved!");
      })
      .catch(() => {
        setErrorMessage("Error while failing resources!");
      });
  };

  return (
    <Dialog
      onClose={props.onClose}
      open={props.isOpen}
      fullWidth
      maxWidth="xs"
      aria-labelledby="move-resources-to-tag-dialog"
    >
      <DialogTitle id="move-resources-to-tag-dialog-title">
        Move resources to tag
      </DialogTitle>
      <DialogContent>
        <Box>
          <SkillDialogTagSelector
            valueTagId={selectedTagId}
            onChange={(_, tagId) => setSelectedTagId(tagId)}
            required
          />
        </Box>
      </DialogContent>
      <DialogTitle>
        <SaveCancelButtons onSave={onSubmit} onCancel={props.onClose} />
      </DialogTitle>
    </Dialog>
  );
};

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setResources: (resources: ResourceDto[]) => dispatch(setResources(resources)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    resourceIds: number[];
    isOpen: boolean;
    onClose: () => void;
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveResourcesToTagDialog);
