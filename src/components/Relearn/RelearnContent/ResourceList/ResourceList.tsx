import { Box, makeStyles } from "@material-ui/core";
import useMultiSelectResource from "hooks/relearn/useMultiSelectResource";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Virtuoso } from "react-virtuoso";
import { ResourceDto } from "../../../../types/domain/relearn/ResourceDto";
import DraggableResourceItem from "./DraggableResourceItem/DraggableResourceItem";
import ResourceItem from "./DraggableResourceItem/ResourceItem/ResourceItem";

function ResourceList({
  resources,
  isDraggable,
}: {
  resources: ResourceDto[];
  isDraggable: boolean;
}) {
  const classes = useStyles();

  const { onCtrlClick, idIsSelected, onShiftClick } = useMultiSelectResource();

  if (isDraggable)
    return (
      <DndProvider backend={HTML5Backend}>
        {resources.map((resource, index) => (
          <div
            key={resource.id}
            onClick={(e) => {
              if (e.ctrlKey) {
                e.preventDefault();
                onCtrlClick(resource.id);
              }

              if (e.shiftKey) {
                e.preventDefault();
                onShiftClick(
                  resources.map((r) => r.id),
                  resource.id
                );
              }
            }}
          >
            <DraggableResourceItem
              resource={resource}
              index={index}
              className={classes.resourceItem}
            />
          </div>
        ))}
      </DndProvider>
    );

  return (
    <Virtuoso
      style={{ height: "calc(100vh - 384px)" }}
      totalCount={resources.length}
      itemContent={(index) => (
        <Box
          p={1}
          borderBottom="1px solid rgb(255 255 255 / 0.1)"
          style={{
            background: idIsSelected(resources[index].id)
              ? "rgb(255 255 255 / 0.1)"
              : "unset",
          }}
          onClick={(e) => {
            if (e.ctrlKey) {
              e.preventDefault();
              onCtrlClick(resources[index].id);
            }

            if (e.shiftKey) {
              e.preventDefault();
              onShiftClick(
                resources.map((r) => r.id),
                resources[index].id
              );
            }
          }}
        >
          <ResourceItem resource={resources[index]} />
        </Box>
      )}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  resourceItem: {
    cursor: "grab",
  },
}));

export default ResourceList;
