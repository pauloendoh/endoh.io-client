import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import { ResourceDto } from "types/domain/relearn/ResourceDto";

interface Props {
  resource: ResourceDto;
  onChange: (checked: boolean) => void;
}

function ResourceItemTaskCheckbox({ resource, onChange }: Props) {
  const isCompleted = resource.completedAt?.length > 0;
  const label = isCompleted ? "Uncomplete this task" : "Complete this task";

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isCompleted}
          color="primary"
          onChange={(e) => {
            console.log(e.target.checked);
            onChange(e.target.checked);
          }}
        />
      }
      label={label}
    />
  );
}

export default ResourceItemTaskCheckbox;
