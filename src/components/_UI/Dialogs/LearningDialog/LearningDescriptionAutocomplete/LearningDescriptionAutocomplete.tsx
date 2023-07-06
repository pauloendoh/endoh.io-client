import { Autocomplete } from "@mui/material"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import Span from "components/_UI/Text/Span"
import { upToNDecimals } from "endoh-utils"
import {
  RecurrentLearningDto,
  buildRecurrentLearningDto,
} from "hooks/react-query/learning-diary/recurrent-learning/types/RecurrentLearningDto"
import { useRecurrentLearningsQuery } from "hooks/react-query/learning-diary/recurrent-learning/useRecurrentLearningsQuery"
import useRecurrentLearningDialogStore from "store/zustand/dialogs/useRecurrentLearningDialogStore"

type Props = {
  stringValue: string
  onChangeStringValue: (value: string) => void
  onChangePoints: (value: number) => void
  inputRef: React.Ref<HTMLInputElement>
}

const LearningDescriptionAutocomplete = ({ ...props }: Props) => {
  const { openDialog } = useRecurrentLearningDialogStore()
  const handleSelect = (value: NonNullable<string | RecurrentLearningDto>) => {
    if (typeof value === "string") {
      props.onChangeStringValue(value)
      return
    }

    if (value.id === 0) {
      openDialog(buildRecurrentLearningDto(), {
        onSuccess: (saved) => {
          props.onChangeStringValue(saved.description)
          props.onChangePoints(saved.points)
        },
      })
    } else {
      props.onChangeStringValue(value.description)
      props.onChangePoints(value.points)
    }
  }

  const { data } = useRecurrentLearningsQuery()

  return (
    <Autocomplete
      options={[...(data || []), buildRecurrentLearningDto()]}
      clearOnBlur={false}
      // value={props.stringValue}
      filterOptions={(options, state) => {
        return options
          .filter((option) => {
            if (state.inputValue === "") {
              return option.id === 0
            }
            return (
              option.description
                .toLowerCase()
                .indexOf(state.inputValue.toLowerCase()) !== -1 ||
              option.id === 0
            )
          })
          .sort((a, b) => {
            // option.id === 0 goes last
            if (a.id === 0) {
              return 1
            }

            // sort by points asc
            return a.points - b.points
          })
      }}
      isOptionEqualToValue={(option, value) => {
        if (typeof value === "string") {
          return option === value
        }

        return option?.id === value?.id
      }}
      sx={{ width: 300 }}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option
        }
        return option.description
      }}
      size="small"
      onChange={(e, value) => {
        handleSelect(value)
      }}
      renderInput={(params) => (
        <MyTextField
          size="small"
          label="Description"
          fullWidth
          sx={{ mt: 1 }}
          inputRef={props.inputRef}
          {...params}
          value={props.stringValue}
          onChange={(e) => {
            props.onChangeStringValue(e.target.value)
          }}
        />
      )}
      renderOption={(liProps, option) => {
        if (option.id === 0) {
          return (
            <li
              {...liProps}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontStyle: "italic",
              }}
            >
              + Add recurrent learning
            </li>
          )
        }

        return (
          <li {...liProps} style={{ display: "flex", alignItems: "center" }}>
            <FlexVCenter>
              <FlexCol>
                <Span>{option.description}</Span>
                <Span fontSize={10}>{upToNDecimals(option.points)} pts</Span>
              </FlexCol>
            </FlexVCenter>
          </li>
        )
      }}
    />
  )
}

export default LearningDescriptionAutocomplete
