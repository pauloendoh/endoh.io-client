import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Form, Formik } from "formik";
import isEqual from "lodash/isEqual";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { scroller } from "react-scroll";
import { Dispatch } from "redux";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import { useTheme } from "styled-components";
import {
  setEditingSkill,
  setSkills,
} from "../../../store/skillbase/skillbaseActions";
import { ApplicationState } from "../../../store/store";
import { SkillDto } from "../../../types/domain/skillbase/SkillDto";
import MyAxiosError from "../../../types/MyAxiosError";
import myAxios from "../../../utils/consts/myAxios";
import { getCurrentTagId } from "../../../utils/skillbase/getCurrentTagId";
import apiUrls from "../../../utils/url/urls/apiUrls";
import SaveCancelButtons from "../../_UI/Buttons/SaveCancelButtons";
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter";
import PriorityStarIcon from "./PriorityStarIcon/PriorityStarIcon";
import SelectSkillLevel from "./SelectSkillLevel/SelectSkillLevel";
import TagSelector from "./SkillDialogTagSelector/SkillDialogTagSelector";
import TitleTextField from "./SkillDialogTitleTextField/SkillDialogTitleTextField";
import SkillExpectations from "./SkillExpectations/SkillExpectations";
import SkillMoreIcon from "./SkillMoreIcon/SkillMoreIcon";

// PE 2/3
const SkillDialog = (props: Props) => {
  const location = useLocation();
  const theme = useTheme();

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setHasChanged(false);
    if (props.skill?.currentLevel > 0) {
      scrollToExpectation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.skill]);

  const scrollToExpectation = () => {
    setTimeout(() => {
      scroller.scrollTo("expectation-title-" + props.skill?.currentLevel, {
        containerId: "skill-dialog-content",
        duration: 500,
        smooth: true,
      });
    }, 0);
  };

  const confirmClose = () => {
    if (hasChanged) {
      if (window.confirm("Discard changes?")) {
        props.setEditingSkill(null);
      }
    } else {
      props.setEditingSkill(null);
    }
  };

  // PE 2/3
  const handleSubmit = (
    skill: SkillDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);

    // E.g;: if you change from 5 to ""
    if ((skill.currentLevel as unknown) === "") skill.currentLevel = null;
    if ((skill.currentGoal as unknown) === "") skill.currentGoal = null;
    if ((skill.goalLevel as unknown) === "") skill.goalLevel = null;

    myAxios
      .post<SkillDto[]>(apiUrls.skillbase.skill, skill)
      .then((res) => {
        props.setSkills(res.data);
        props.setEditingSkill(null);
        setSuccessMessage("Skill saved successfully!");
      })
      .catch((err: MyAxiosError) => {
        setErrorMessage(err.response.data.errors[0].message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const getInitialValues = (): SkillDto => {
    return {
      ...props.skill,
      tagId: props.skill?.tagId // why not use simply props.skill.tagId ?
        ? props.skill.tagId
        : getCurrentTagId(location.pathname),
    };
  };

  return (
    <Dialog // PE 2/3
      onClose={confirmClose}
      open={props.skill !== null}
      fullWidth
      maxWidth="sm"
      aria-labelledby="skill-dialog"
    >
      {/* Maybe I should make a MyDialog or something? With default paddings */}
      <Box pb={1} px={1}>
        <Formik
          initialValues={getInitialValues()}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues, setSubmitting);
          }}
          validateOnChange
          validate={(newValues) => {
            setHasChanged(!isEqual(props.skill, newValues));
          }}
        >
          {({ values, setFieldValue, isSubmitting, handleChange }) => (
            <Form>
              {/* Separate into <SkillDialogTitle skill={skill}/> */}
              <DialogTitle id="skill-dialog-title">
                <FlexVCenter justifyContent="space-between">
                  <FlexVCenter width="80%">
                    <Box mr={2}>
                      <PriorityStarIcon
                        isPriority={values.isPriority}
                        tooltipText="This skill is a priority in your life right now"
                        onClick={() => {
                          setFieldValue("isPriority", !values.isPriority);
                        }}
                      />
                    </Box>

                    <TitleTextField
                      value={values.name}
                      onChange={(newValue) => setFieldValue("name", newValue)}
                    />
                  </FlexVCenter>

                  {values.id > 0 && (
                    <SkillMoreIcon
                      skillId={values.id}
                      afterDelete={() => props.setEditingSkill(null)}
                    />
                  )}
                </FlexVCenter>

                {/* Separate into <SkillLevelSelectors/> */}
                <FlexVCenter
                  mt={3}
                  style={{
                    fontSize: 14,
                    fontWeight: "normal",
                    gap: theme.spacing(2),
                  }}
                >
                  <SelectSkillLevel
                    type="Current Level"
                    value={values.currentLevel}
                    onChange={(newValue: number) => {
                      setFieldValue("currentLevel", newValue);
                    }}
                  />
                  <SelectSkillLevel
                    type="Current Goal"
                    value={values.currentGoal}
                    onChange={(newValue: number) => {
                      setFieldValue("currentGoal", newValue);
                    }}
                  />

                  <SelectSkillLevel
                    type="End Goal"
                    value={values.goalLevel}
                    onChange={(newValue: number) => {
                      setFieldValue("goalLevel", newValue);
                    }}
                  />
                </FlexVCenter>
              </DialogTitle>

              <DialogContent id="skill-dialog-content">
                <TagSelector
                  valueTagId={values.tagId}
                  onChange={(e, value) => {
                    setFieldValue("tagId", value);
                  }}
                />

                <SkillExpectations
                  currentLevel={values.currentLevel}
                  expectations={values.expectations}
                  onChangeExpectations={(expectations) =>
                    setFieldValue("expectations", expectations)
                  }
                />
              </DialogContent>
              <DialogTitle id="skill-dialog-footer">
                <SaveCancelButtons
                  submitButtonId="save-skill-btn"
                  disabled={isSubmitting}
                  onCancel={confirmClose}
                />
              </DialogTitle>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  skill: state.skillbase.editingSkill,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSkills: (skills: SkillDto[]) => dispatch(setSkills(skills)),
  setEditingSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(SkillDialog);
