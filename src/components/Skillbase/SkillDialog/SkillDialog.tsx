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
import Flex from "components/_UI/Flexboxes/Flex"
import Txt from "components/_UI/Text/Txt"
import { useFormik } from "formik"
import useSaveSkill from "hooks/skillbase/useSaveSkill"
import useConfirmTabClose from "hooks/utils/useConfirmTabClose"
import { useEffect, useState } from "react"
import { MdOutlineArrowRightAlt } from "react-icons/md"
import { useLocation } from "react-router-dom"
import { scroller } from "react-scroll"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import useDialogsStore from "store/zustand/useDialogsStore"
import { newLabelDto } from "types/domain/skillbase/LabelDto"
import Icons from "utils/styles/Icons"
import { SkillDto } from "../../../types/domain/skillbase/SkillDto"
import { getCurrentTagId } from "../../../utils/skillbase/getCurrentTagId"
import SaveCancelButtons from "../../_UI/Buttons/SaveCancelButtons"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import SelectSkillLevel from "./SelectSkillLevel/SelectSkillLevel"
import LabelsSelectorV2 from "./SkillDialogLabels/LabelsSelectorV2/LabelsSelectorV2"
import EditLabelDialog from "./SkillDialogLabels/SelectSkillLabelsDialog/EditLabelDialog/EditLabelDialog"
import TagSelector from "./SkillDialogTagSelector/SkillDialogTagSelector"
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
  const { openConfirmDialog } = useDialogsStore()

  const [labelDialogOpen, setLabelDialogOpen] = useState(false)
  const [labelDialogInitialValue, setLabelDialogInitialValue] = useState(
    newLabelDto()
  )

  useEffect(() => {
    if (initialValue?.currentLevel > 0) scrollToNextLevel()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  const getInitialValues = (): SkillDto => {
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

              {formik.values.id > 0 && (
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
                value={formik.values.currentLevel}
                onChange={(newValue: number) => {
                  formik.setFieldValue("currentLevel", newValue)
                }}
              />
              <MdOutlineArrowRightAlt
                fontSize={24}
                style={{ marginRight: 20, marginTop: 8 }}
              />

              <SelectSkillLevel
                type="goalLevel"
                value={formik.values.goalLevel}
                onChange={(newValue: number) => {
                  formik.setFieldValue("goalLevel", newValue)
                }}
              />
            </FlexVCenter>

            {initialValue && (
              <Box mt={2}>
                {/* <SkillDialogLabels
                  skill={formik.values}
                  onOpenLabelsDialog={() => setLabelsDialog(true)}
                /> */}
                <LabelsSelectorV2
                  selectedLabels={formik.values.labels}
                  onChange={(labels) => formik.setFieldValue("labels", labels)}
                  skillId={getInitialValues().id}
                  setLabelDialogOpen={setLabelDialogOpen}
                  setLabelDialogInitialValue={setLabelDialogInitialValue}
                />
              </Box>
            )}
          </DialogTitle>

          <DialogContent
            id="skill-dialog-content"
            style={{
              height: `calc(100vh - 410px)`,
            }}
          >
            <Box mt={1}>
              <TagSelector
                selectedTagId={formik.values.tagId}
                onChange={(e, value) => {
                  formik.setFieldValue("tagId", value)
                }}
              />
            </Box>

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
                disabled={isEditingRoadmapItem}
                isLoading={formik.isSubmitting}
                onCancel={handleClose}
                onEnabledAndCtrlEnter={() => formik.handleSubmit()}
                onEnableAndCtrlS={() => {
                  submitSaveSkill(formik.values, formik.setSubmitting, false)
                }}
              />
            </Flex>
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
        skillId={getInitialValues().id}
        initialValue={labelDialogInitialValue}
        onClose={() => setLabelDialogOpen(false)}
      />
    </Dialog>
  )
}

export default SkillDialog
