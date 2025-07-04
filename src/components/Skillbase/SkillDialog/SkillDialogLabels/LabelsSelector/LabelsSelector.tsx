import { Autocomplete, Chip } from "@mui/material"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import useLabelsQuery from "hooks/react-query/skillbase/labels/useLabelsQuery"
import { useMemo } from "react"
import { LabelDto, newLabelDto } from "types/domain/skillbase/LabelDto"
import LabelSelectorOption from "./LabelSelectorOption/LabelSelectorOption"

interface Props {
  selectedLabels: LabelDto[]
  onChange: (labels: LabelDto[]) => void
  skillId: number

  setLabelDialogOpen: (value: boolean) => void
  setLabelDialogInitialValue: (label: LabelDto) => void
}

export const LabelsSelector = (props: Props) => {
  const { data: labels } = useLabelsQuery()

  const sortedLabels = useMemo(() => {
    const sorted =
      labels?.sort((a, b) => {
        if (Number(a.id) < Number(b.id)) return -1
        if (Number(a.id) > Number(b.id)) return 1
        return 0
      }) || []

    return [...sorted, newLabelDto({ id: -1 })]
  }, [labels])

  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={sortedLabels}
      value={props.selectedLabels}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(e, values) => {
        if (typeof values === "string") return
        const labels = values as LabelDto[]
        if (labels.find((l) => l.id === -1)) {
          props.setLabelDialogOpen(true)

          props.setLabelDialogInitialValue(newLabelDto())
          return
        }

        props.onChange(labels)
      }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      renderInput={(params) => (
        <MyTextField {...params} label="Labels" size="small" />
      )}
      renderOption={(liProps, label) => (
        <LabelSelectorOption
          liProps={liProps}
          label={label}
          onClickEdit={() => {
            props.setLabelDialogOpen(true)
            props.setLabelDialogInitialValue(label)
          }}
        />
      )}
      renderTags={(labels, getTagProps) =>
        labels.map((label, index) => (
          <Chip
            {...getTagProps({ index })}
            size="small"
            label={label.name}
            style={{ backgroundColor: label.bgColor }}
          />
        ))
      }
      fullWidth
    />
  )
}
