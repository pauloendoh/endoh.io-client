import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Tooltip,
  useTheme,
} from "@mui/material"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import Txt from "components/_UI/Text/Txt"
import { useFormik } from "formik"
import useSaveSkill from "hooks/skillbase/useSaveSkill"
import useConfirmTabClose from "hooks/utils/useConfirmTabClose"
import { useEffect, useState } from "react"
import { MdOutlineArrowRightAlt } from "react-icons/md"
import { useLocation } from "react-router-dom"
import { scroller } from "react-scroll"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import { newLabelDto } from "types/domain/skillbase/LabelDto"
import Icons from "utils/styles/Icons"
import {
  SkillDto,
  buildSkillDto,
} from "../../../types/domain/skillbase/SkillDto"
import { getCurrentTagId } from "../../../utils/skillbase/getCurrentTagId"
import SaveCancelButtons from "../../_UI/Buttons/SaveCancelButtons"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import SelectSkillLevel from "./SelectSkillLevel/SelectSkillLevel"
import LabelsSelector from "./SkillDialogLabels/LabelsSelector/LabelsSelector"
import EditLabelDialog from "./SkillDialogLabels/SelectSkillLabelsDialog/EditLabelDialog/EditLabelDialog"
import TitleTextField from "./SkillDialogTitleTextField/SkillDialogTitleTextField"
import SkillExpectations from "./SkillExpectations/SkillExpectations"
import SkillMoreIcon from "./SkillMoreIcon/SkillMoreIcon"

// PE 2/3
const SkillDialog = () => {
  const theme = useTheme()
  const location = useLocation()
  const submitSaveSkill = useSaveSkill()

  const {
    setEditingSkill,
    editingSkill: initialValue,
    isEditingRoadmapItem,
  } = useSkillbaseStore()
  const { openConfirmDialog } = useConfirmDialogStore()

  const [labelDialogOpen, setLabelDialogOpen] = useState(false)
  const [labelDialogInitialValue, setLabelDialogInitialValue] = useState(
    newLabelDto()
  )

  useEffect(() => {
    if (initialValue?.currentLevel && initialValue?.currentLevel > 0)
      scrollToNextLevel()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  const getInitialValues = (): SkillDto => {
    if (!initialValue) return buildSkillDto()
    return {
      ...initialValue,
      tagId: initialValue?.tagId // why not use simply props.skill.tagId ?
        ? initialValue.tagId
        : getCurrentTagId(location.pathname),
    }
  }

  const formik = useFormik<SkillDto>({
    initialValues: getInitialValues(),
    onSubmit: (formikValues, { setSubmitting }) => {
      submitSaveSkill(formikValues, setSubmitting)
    },
    enableReinitialize: true,
  })

  const scrollToNextLevel = () => {
    // had to add this in order to work properly...
    setTimeout(() => {
      scroller.scrollTo("expectation-title-" + initialValue?.currentLevel, {
        containerId: "skill-dialog-content",
        duration: 500,
        smooth: true,
      })
    }, 0)
  }
  useConfirmTabClose(formik.dirty)

  const handleClose = () => {
    if (formik.dirty) {
      return openConfirmDialog({
        title: "Discard changes?",
        onConfirm: () => setEditingSkill(null),
      })
    }

    return setEditingSkill(null)
  }

  return (
    <Dialog // PE 2/3
      onClose={handleClose}
      open={initialValue !== null}
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

              {!!formik.values.id && (
                <SkillMoreIcon
                  skillId={formik.values.id}
                  afterDelete={() => setEditingSkill(null)}
                />
              )}
            </FlexVCenter>

            {/* Separate into <SkillLevelSelectors/> */}
            <FlexVCenter mt={3} style={{ fontSize: 14, fontWeight: "normal" }}>
              <SelectSkillLevel
                type="currentLevel"
                value={formik.values.currentLevel || 0}
                onChange={(newValue: number | null) => {
                  formik.setFieldValue("currentLevel", newValue)
                }}
              />
              <MdOutlineArrowRightAlt
                fontSize={24}
                style={{ marginRight: 20, marginTop: 8 }}
              />

              <SelectSkillLevel
                type="goalLevel"
                value={formik.values.goalLevel || 0}
                onChange={(newValue: number | null) => {
                  formik.setFieldValue("goalLevel", newValue)
                }}
              />
            </FlexVCenter>

            {initialValue && (
              <FlexVCenter mt={2} gap={2}>
                <LabelsSelector
                  selectedLabels={formik.values.labels || []}
                  onChange={(labels) => formik.setFieldValue("labels", labels)}
                  skillId={getInitialValues().id || 0}
                  setLabelDialogOpen={setLabelDialogOpen}
                  setLabelDialogInitialValue={setLabelDialogInitialValue}
                />
                <MyTextField
                  label="Priority"
                  type="number"
                  value={formik.values.priority}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      formik.setFieldValue("priority", Number(e.target.value))
                    } else {
                      formik.setFieldValue("priority", null)
                    }
                  }}
                  size="medium"
                  style={{
                    width: 100,
                  }}
                  inputProps={{
                    step: 0.1,
                  }}
                />
              </FlexVCenter>
            )}
          </DialogTitle>

          <DialogContent
            id="skill-dialog-content"
            style={{
              height: `calc(100vh - 410px)`,
            }}
          >
            <SkillExpectations
              currentLevel={formik.values.currentLevel || 0}
              expectations={formik.values.expectations}
              onChangeExpectations={(expectations) =>
                formik.setFieldValue("expectations", expectations)
              }
            />
          </DialogContent>
          <DialogTitle id="skill-dialog-footer" sx={{ paddingRight: 0 }}>
            <FlexVCenter justifyContent={"space-between"}>
              <SaveCancelButtons
                submitButtonId="save-skill-btn"
                disabled={isEditingRoadmapItem}
                isLoading={formik.isSubmitting}
                onCancel={handleClose}
                onEnabledAndCtrlEnter={() => formik.handleSubmit()}
                onEnableAndCtrlS={() => {
                  submitSaveSkill(formik.values, formik.setSubmitting, false)
                }}
              />
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
            </FlexVCenter>
          </DialogTitle>
        </form>
      </Box>

      {/* <SelectSkillLabelsDialog
        open={labelsDialog}
        onClose={() => setLabelsDialog(false)}
        selectedLabels={formik.values.labels}
        onChange={(labels) => formik.setFieldValue("labels", labels)}
        skillId={getInitialValues().id}
      /> */}

      <EditLabelDialog
        open={labelDialogOpen}
        skillId={getInitialValues().id || 0}
        initialValue={labelDialogInitialValue}
        onClose={() => setLabelDialogOpen(false)}
      />
    </Dialog>
  )
}

export default SkillDialog
