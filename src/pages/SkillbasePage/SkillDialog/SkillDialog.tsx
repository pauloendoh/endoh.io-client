import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Tooltip,
} from "@material-ui/core"
import StarIcon from "@material-ui/icons/Star"
import clsx from "clsx"
import { Form, Formik } from "formik"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
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
import SelectSkillLevel from "./SelectSkillLevel/SelectSkillLevel"
import SelectTag from "./SelectTag/SelectTag"

// PE 2/3
const SkillDialog = (props: Props) => {
  const classes = useStyles()

  const handleSubmit = (
    skill: SkillDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true)

    // E.g;: if you change from 5 to ""
    if ((skill.currentLevel as unknown) === "") skill.currentLevel = null
    if ((skill.goalLevel as unknown) === "") skill.goalLevel = null

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
              <DialogTitle id="skill-dialog-title">
                <FlexVCenter justifyContent="space-between">
                  <FlexVCenter mr={2}>
                    {/* Divide into another component? */}
                    <Tooltip
                      title="This skill is a priority in your life right now"
                      enterDelay={500}
                      enterNextDelay={500}
                    >
                      <IconButton
                        size="small"
                        onClick={() => {
                          setFieldValue("isPriority", !values.isPriority)
                        }}
                      >
                        <StarIcon
                          className={clsx({
                            [classes.isNotPriority]: !values.isPriority,
                            [classes.isPriority]: values.isPriority,
                          })}
                        />
                      </IconButton>
                    </Tooltip>
                  </FlexVCenter>

                  <TextField
                    className={classes.nameTextField}
                    fullWidth
                    placeholder="Untitled skill"
                    InputProps={{
                      disableUnderline: true,
                      className: classes.nameInput,
                    }}
                    id={"name"}
                    name={"name"}
                    value={values.name}
                    onChange={handleChange}
                    autoFocus
                    required
                  />
                </FlexVCenter>
              </DialogTitle>

              <DialogContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={6}>
                    <SelectSkillLevel
                      type="currentLevel"
                      value={values.currentLevel}
                      onChange={(newValue: number) => {
                        setFieldValue("currentLevel", newValue)
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectSkillLevel
                      type="goalLevel"
                      value={values.goalLevel}
                      onChange={(newValue: number) => {
                        setFieldValue("goalLevel", newValue)
                      }}
                    />
                  </Grid>
                </Grid>

                <Box mt={2}>
                  {/* <SelectDependencies
                    parentSkillId={values.id}
                    selected={values.dependencies}
                    onChange={(e, values) => {
                      setFieldValue("dependencies", values)
                    }}
                  /> */}
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
                  {/* This save & cancel button is recurrent. Should I create one for it? */}
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

const useStyles = makeStyles((theme) => ({
  nameTextField: {
    background: "transparent",
  },
  nameInput: {
    fontSize: 24,
  },
  isNotPriority: {
    color: theme.palette.grey[800],
  },
  isPriority: {
    color: "#ffb400",
  },
}))

const mapStateToProps = (state: ApplicationState) => ({
  editingSkill: state.skillbase.editingSkill,
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
