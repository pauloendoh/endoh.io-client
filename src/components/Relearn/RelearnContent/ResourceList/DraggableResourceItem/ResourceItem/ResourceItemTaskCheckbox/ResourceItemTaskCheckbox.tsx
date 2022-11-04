import { Checkbox, FormControlLabel } from "@mui/material"
import { ResourceDto } from "types/domain/relearn/ResourceDto"

interface Props {
  resource: ResourceDto
  onChange: (checked: boolean) => void
}

function ResourceItemTaskCheckbox({ resource, onChange }: Props) {
  const isCompleted = resource.completedAt?.length > 0

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isCompleted}
          color="primary"
          onChange={(e) => {
            onChange(e.target.checked)
          }}
        />
      }
      label={isCompleted ? "Uncomplete this task" : "Complete this task"}
    />
  )
}

export default ResourceItemTaskCheckbox
