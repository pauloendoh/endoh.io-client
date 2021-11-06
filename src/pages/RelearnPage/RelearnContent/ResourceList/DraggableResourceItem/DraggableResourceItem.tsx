import { Box, makeStyles } from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as relearnActions from "../../../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../../../store/store";
import * as utilsActions from "../../../../../store/utils/utilsActions";
import { IMoveResource } from "../../../../../types/domain/relearn/IMoveResource";
import { ResourceDto } from "../../../../../types/domain/relearn/ResourceDto";
import ResourceItem from "./ResourceItem/ResourceItem";

// PE 1/3
function DraggableResourceItem(props: Props) {
  const classes = useStyles();

  const [collected, dragRef] = useDrag({
    type: "CARD",
    item: { index: props.index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const ref = useRef<HTMLDivElement>();

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedItem = item as any;
      const draggedIndex = draggedItem.index as number;
      const targetIndex = props.index;

      if (draggedIndex === targetIndex) return;

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffSet = monitor.getClientOffset();
      const draggedTop = draggedOffSet.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return; // ex: tentar arrastar o primeiro antes do segundo
      }
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      // Disable dnd for completed items
      if (props.resource.completedAt.length > 0) {
        props.setErrorMessage("Completed items can't be moved");
        return;
      }

      props.moveResource({
        tagId: props.resource.tag ? props.resource.tag.id : null,
        fromIndex: draggedIndex,
        toIndex: targetIndex,
      });

      draggedItem.index = targetIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <RootRef rootRef={ref}>
      <Box
        p={1}
        borderBottom="1px solid rgb(255 255 255 / 0.1)" // Could be a const?
        className={
          props.className +
          " resource-item " +
          (collected.isDragging ? classes.isDragging : "")
        }
      >
        <ResourceItem resource={props.resource} />
      </Box>
    </RootRef>
  );
}

const useStyles = makeStyles((theme) => ({
  isDragging: {
    border: "1px dashed rgba(255, 255, 255, 0.2)",
  },
}));

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  moveResource: (params: IMoveResource) =>
    dispatch(relearnActions.moveResource(params)),

  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
});

interface OwnProps {
  resource: ResourceDto;
  className?: string;
  index: number;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraggableResourceItem);