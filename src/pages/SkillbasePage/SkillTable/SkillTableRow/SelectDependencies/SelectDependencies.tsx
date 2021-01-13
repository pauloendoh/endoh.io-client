import { Box, Typography } from "@material-ui/core"
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason
} from "@material-ui/lab"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import FlexHCenter from "../../../../../components/shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
import MyTextField from "../../../../../components/shared/MyInputs/MyTextField"
import { SkillDto } from "../../../../../dtos/skillbase/SkillDto"
import { ApplicationState } from "../../../../../store/store"

const SelectDependencies = (props: Props) => {
  const [dependencies, setDependencies] = useState<SkillDto[]>(
    props.initialValues
  )

  return (
    <Box>
      <Autocomplete
        multiple
        id="select-dependencies-input"
        value={dependencies}
        options={[...props.skills]}
        renderOption={(option) => (
          <FlexVCenter>
            {option.id ? (
              <FlexVCenter>
                <Box ml={1}>
                  <Typography variant="body2">{option.name}</Typography>
                </Box>
              </FlexVCenter>
            ) : (
              <FlexHCenter>{option.name}</FlexHCenter>
            )}
          </FlexVCenter>
        )}
        getOptionLabel={(option) => option.name}
        style={{ width: 200 }}
        renderInput={(params) => (
          <MyTextField {...params} placeholder="e.g.: Amazon" size="small" />
        )}
        onChange={(e, value) => {
          const skills = value as SkillDto[]

          setDependencies(skills)
          props.onChange(e, skills, null)
        }}
      />
    </Box>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  skills: state.skillbase.skills,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  initialValues: SkillDto[]
  onChange?: (
    event: React.ChangeEvent<{}>,
    value: unknown,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown>
  ) => void
}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(SelectDependencies)
