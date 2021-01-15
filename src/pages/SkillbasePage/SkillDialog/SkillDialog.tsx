import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
} from "@material-ui/core"
import { Form, Formik } from "formik"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import MyTextField from "../../../components/shared/MyInputs/MyTextField"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import { SkillDto } from "../../../dtos/skillbase/SkillDto"
import MyAxiosError from "../../../interfaces/MyAxiosError"
import {
  setEditingSkill,
  setSkills,
} from "../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../store/store"
import * as utilsActions from "../../../store/utils/utilsActions"
import SelectDependencies from "./SelectDependencies/SelectDependencies"
import SelectTag from "./SelectTag/SelectTag"

const SkillDialog = (props: Props) => {
  const handleSubmit = (
    skill: SkillDto,

    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true)

    MY_AXIOS.post(API.skillbase.skill, skill)
      .then((res) => {
        props.setSkills(res.data)
        props.setEditingSkill(null)
        props.setSuccessMessage("Skill saved successfully!")
      })
      .catch((err: MyAxiosError) => {
        props.setErrorMessage(err.response.data.errors[0].message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Dialog
      onClose={() => {
        props.setEditingSkill(null)
      }}
      open={!!props.editingSkill}
      fullWidth
      maxWidth="xs"
      aria-labelledby="skill-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          initialValues={props.editingSkill}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues, setSubmitting)
          }}
        >
          {({ values, setFieldValue, isSubmitting, handleChange }) => (
            <Form>
              <DialogTitle id="skill-dialog-title">Add Skill</DialogTitle>
              <DialogContent>
                <Box>
                  <MyTextField
                    data-testid="skill-name-input"
                    id={"name" as keyof SkillDto}
                    name={"name" as keyof SkillDto}
                    value={values.name}
                    inputProps={{ "aria-label": "skill-name-input" }}
                    required
                    onChange={handleChange}
                    label="Skill Name"
                    fullWidth
                    autoFocus
                  />
                </Box>

                <Box my={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.isPriority}
                        onChange={(e) =>
                          setFieldValue("isPriority", e.target.checked)
                        }
                        name="isPriority"
                      />
                    }
                    label="Is Priority"
                  />
                </Box>

                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={6}>
                    <MyTextField
                      value={
                        values.currentLevel !== null ? values.currentLevel : ""
                      }
                      name="currentLevel"
                      id="currentLevel"
                      type="number"
                      onChange={handleChange}
                      label="Current Level"
                      InputProps={{
                        inputProps: {
                          min: 0,
                          max: 10,
                        },
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MyTextField
                      value={values.goalLevel !== null ? values.goalLevel : ""}
                      name="goalLevel"
                      id="goalLevel"
                      type="number"
                      onChange={handleChange}
                      label="Goal"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Box mt={2}>
                  <SelectDependencies
                    selected={values.dependencies}
                    onChange={(e, values) => {
                      setFieldValue("dependencies", values)
                    }}
                  />
                </Box>

                <Box mt={2}>
                  <SelectTag
                    tagId={values.tagId}
                    onChange={(e, value) => {
                      setFieldValue("tagId", value)
                    }}
                  />
                </Box>

                <Flex mt={2}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    id="save-skill-button"
                  >
                    Save
                  </Button>

                  <Box ml={1}>
                    <Button
                      onClick={() => props.setEditingSkill(null)}
                      variant="text"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Flex>
              </DialogContent>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  editingSkill: state.skillbase.editingSkill,
  tags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSkills: (skills: SkillDto[]) => dispatch(setSkills(skills)),
  setEditingSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(SkillDialog)
