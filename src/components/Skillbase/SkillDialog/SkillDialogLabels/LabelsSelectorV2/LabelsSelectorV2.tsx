import { Chip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import MyTextField from "components/_UI/MyInputs/MyTextField";
import useLabelsQuery from "hooks/react-query/skillbase/labels/useLabelsQuery";
import { useMemo } from "react";
import { LabelDto, newLabelDto } from "types/domain/skillbase/LabelDto";
import LabelsSelectorV2Option from "./LabelsSelectorV2Option/LabelsSelectorV2Option";

interface Props {
  selectedLabels: LabelDto[];
  onChange: (labels: LabelDto[]) => void;
  skillId: number;

  setLabelDialogOpen: (value: boolean) => void;
  setLabelDialogInitialValue: (label: LabelDto) => void;
}

const LabelsSelectorV2 = (props: Props) => {
  const { data: labels } = useLabelsQuery();

  const sortedLabels = useMemo(() => {
    const sorted =
      labels?.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      }) || [];

    return [...sorted, newLabelDto({ id: -1 })];
  }, [labels]);

  return (
    <>
      <Autocomplete
        multiple
        id="tags-standard"
        options={sortedLabels}
        value={props.selectedLabels}
        getOptionSelected={(option, value) => option.id === value.id}
        onChange={(e, values) => {
          if (typeof values === "string") return;
          const labels = values as LabelDto[];
          if (labels.find((l) => l.id === -1)) {
            props.setLabelDialogOpen(true);

            props.setLabelDialogInitialValue(newLabelDto());
            return;
          }

          props.onChange(labels);
        }}
        getOptionLabel={(option: LabelDto) => option.name}
        renderInput={(params) => <MyTextField {...params} label="Labels" />}
        renderOption={(label) => (
          <LabelsSelectorV2Option
            label={label}
            onClickEdit={() => {
              props.setLabelDialogOpen(true);
              props.setLabelDialogInitialValue(label);
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
      />
    </>
  );
};

export default LabelsSelectorV2;
