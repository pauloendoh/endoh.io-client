import { faArrowCircleRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import Txt from "components/_UI/Text/Txt";
import useMultiSelectResource from "hooks/relearn/useMultiSelectResource";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setResources } from "store/relearn/relearnActions";
import { ApplicationState } from "store/store";
import useRelearnStore from "store/zustand/domain/useRelearnStore";
import useDialogsStore from "store/zustand/useDialogsStore";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import { useTheme } from "styled-components";
import { ResourceDto } from "types/domain/relearn/ResourceDto";
import myAxios from "utils/consts/myAxios";
import apiUrls from "utils/url/urls/apiUrls";
import MoveResourcesToTagDialog from "./MoveResourcesToTagDialog/MoveResourcesToTagDialog";
// PE 2/3
const SelectedResourcesOptions = (props: Props) => {
  const theme = useTheme();

  const { openConfirmDialog } = useDialogsStore();
  const { selectedResourceIds } = useRelearnStore();
  const { clearSelectedIds } = useMultiSelectResource();
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const [moveToTagDialog, setMoveToTagDialog] = useState(false);

  const deleteResources = () => {
    myAxios
      .delete<ResourceDto[]>(apiUrls.relearn.deleteManyResources, {
        data: {
          ids: selectedResourceIds,
        },
      })
      .then((res) => {
        console.log(res.data);
        props.setResources(res.data);
        clearSelectedIds();
        setSuccessMessage("Resources deleted!");
      })
      .catch(() => {
        setErrorMessage("Error while deleting resources!");
      });
  };

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

        <Button
          onClick={() => {
            openConfirmDialog({
              title: "Delete resources",
              description: `Are you sure you want to delete ${selectedResourceIds.length} resource(s)?`,
              onConfirm: deleteResources,
            });
          }}
        >
          <FlexVCenter style={{ color: theme.palette.error.main, gap: 4 }}>
            <MdDeleteForever size={16} />
            <Txt>Delete</Txt>
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

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setResources: (resources: ResourceDto[]) => dispatch(setResources(resources)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedResourcesOptions);
