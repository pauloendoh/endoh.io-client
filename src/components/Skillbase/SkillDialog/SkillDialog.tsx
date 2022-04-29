import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Tooltip,
} from "@material-ui/core";
import Flex from "components/_UI/Flexboxes/Flex";
import Txt from "components/_UI/Text/Txt";
import { useFormik } from "formik";
import useConfirmTabClose from "hooks/utils/useConfirmTabClose";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { Dispatch } from "redux";
import useDialogsStore from "store/zustand/useDialogsStore";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import { useTheme } from "styled-components";
import Icons from "utils/styles/Icons";
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
import SelectSkillLevel from "./SelectSkillLevel/SelectSkillLevel";
import SelectSkillLabelsDialog from "./SkillDialogLabels/SelectSkillLabelsDialog/SelectSkillLabelsDialog";
import SkillDialogLabels from "./SkillDialogLabels/SkillDialogLabels";
import TagSelector from "./SkillDialogTagSelector/SkillDialogTagSelector";
import TitleTextField from "./SkillDialogTitleTextField/SkillDialogTitleTextField";
import SkillExpectations from "./SkillExpectations/SkillExpectations";
import SkillMoreIcon from "./SkillMoreIcon/SkillMoreIcon";

const mapStateToProps = (state: ApplicationState) => ({
  initialValue: state.skillbase.editingSkill,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSkills: (skills: SkillDto[]) => dispatch(setSkills(skills)),
  setEditingSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

// PE 2/3
const SkillDialog = (props: Props) => {
  const theme = useTheme();
  const location = useLocation();
  const { openConfirmDialog } = useDialogsStore();

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const [labelsDialog, setLabelsDialog] = useState(false);

  useEffect(() => {
    if (props.initialValue?.currentLevel > 0) scrollToNextLevel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialValue]);

  const getInitialValues = (): SkillDto => {
    return {
      ...props.initialValue,
      tagId: props.initialValue?.tagId // why not use simply props.skill.tagId ?
        ? props.initialValue.tagId
        : getCurrentTagId(location.pathname),
    };
  };

  const formik = useFormik<SkillDto>({
    initialValues: getInitialValues(),
    onSubmit: (formikValues, { setSubmitting }) => {
      handleSubmit(formikValues, setSubmitting);
    },
    enableReinitialize: true,
  });

  const scrollToNextLevel = () => {
    // had to add this in order to work properly...
    setTimeout(() => {
      scroller.scrollTo(
        "expectation-title-" + props.initialValue?.currentLevel,
        {
          containerId: "skill-dialog-content",
          duration: 500,
          smooth: true,
        }
      );
    }, 0);
  };
  useConfirmTabClose(formik.dirty);

  const handleClose = () => {
    if (formik.dirty) {
      return openConfirmDialog({
        title: "Discard changes?",
        onConfirm: () => props.setEditingSkill(null),
      });
    }

    return props.setEditingSkill(null);
  };

  // PE 2/3
  const handleSubmit = (
    skill: SkillDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);

    // E.g;: if you change from 5 to ""
    if ((skill.currentLevel as unknown) === "") skill.currentLevel = null;
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

  return (
    <Dialog // PE 2/3
      onClose={handleClose}
      open={props.initialValue !== null}
      fullWidth
      maxWidth="sm"
      aria-labelledby="skill-dialog"
    >
      {/* Maybe I should make a MyDialog or something? With default paddings */}
      <Box pb={1} px={1}>
        <form onSubmit={formik.handleSubmit}>
          {/* Separate into <SkillDialogTitle skill={skill}/> */}
          <DialogTitle id="skill-dialog-title">
            <FlexVCenter justifyContent="space-between">
              <FlexVCenter width="80%">
                <TitleTextField
                  value={formik.values.name}
                  onChange={(newValue) =>
                    formik.setFieldValue("name", newValue)
                  }
                />
              </FlexVCenter>

              {formik.values.id > 0 && (
                <SkillMoreIcon
                  skillId={formik.values.id}
                  afterDelete={() => props.setEditingSkill(null)}
                />
              )}
            </FlexVCenter>

            {/* Separate into <SkillLevelSelectors/> */}
            <FlexVCenter mt={3} style={{ fontSize: 14, fontWeight: "normal" }}>
              <SelectSkillLevel
                type="currentLevel"
                value={formik.values.currentLevel}
                onChange={(newValue: number) => {
                  formik.setFieldValue("currentLevel", newValue);
                }}
              />
              <Box ml={4} />
              <SelectSkillLevel
                type="goalLevel"
                value={formik.values.goalLevel}
                onChange={(newValue: number) => {
                  formik.setFieldValue("goalLevel", newValue);
                }}
              />
            </FlexVCenter>

            {props.initialValue && (
              <SkillDialogLabels
                skill={formik.values}
                onOpenLabelsDialog={() => setLabelsDialog(true)}
              />
            )}
          </DialogTitle>

          <DialogContent
            id="skill-dialog-content"
            style={{
              height: `calc(100vh - 410px)`,
            }}
          >
            <TagSelector
              selectedTagId={formik.values.tagId}
              required
              onChange={(e, value) => {
                formik.setFieldValue("tagId", value);
              }}
            />

            <SkillExpectations
              currentLevel={formik.values.currentLevel}
              expectations={formik.values.expectations}
              onChangeExpectations={(expectations) =>
                formik.setFieldValue("expectations", expectations)
              }
            />
          </DialogContent>
          <DialogTitle id="skill-dialog-footer">
            <Flex style={{ flexDirection: "column", gap: theme.spacing(2) }}>
              <FormControlLabel
                label={
                  <FlexVCenter style={{ gap: theme.spacing(1) }}>
                    <Txt>Public roadmap</Txt>
                    <Tooltip
                      title="Public roadmaps will be available in your profile"
                      placement="top"
                    >
                      <Icons.Info />
                    </Tooltip>
                  </FlexVCenter>
                }
                control={
                  <Checkbox
                    color="primary"
                    name="isPublic"
                    checked={formik.values.isPublic}
                    onChange={formik.handleChange}
                  />
                }
              />
              <SaveCancelButtons
                submitButtonId="save-skill-btn"
                disabled={formik.isSubmitting}
                onCancel={handleClose}
              />
            </Flex>
          </DialogTitle>
        </form>
      </Box>

      <SelectSkillLabelsDialog
        open={labelsDialog}
        onClose={() => setLabelsDialog(false)}
        selectedLabels={formik.values.labels}
        onChange={(labels) => formik.setFieldValue("labels", labels)}
        skillId={getInitialValues().id}
      />
    </Dialog>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillDialog);
