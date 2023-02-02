import DocTitleDialog from "components/Questions/DocTitleDialog/DocTitleDialog"
import LearningsPerDayDialog from "components/Questions/LearningsPerDayDialog/LearningsPerDayDialog"
import QuestionDialog from "components/Questions/QuestionsContent/FlashcardDialog/StartedFlashcardDialogChild/QuestionDialog/QuestionDialog"
import FolderDialog from "components/Questions/QuestionsSidebar/QuestionsFileSystem/FolderDialog/FolderDialog"
import ResourceDialog from "components/Relearn/Dialogs/ResourceDialog/ResourceDialog"
import SkillDialog from "components/Skillbase/SkillDialog/SkillDialog"
import ConfirmDialog from "components/_UI/Dialogs/ConfirmationDialog"
import LearningDialog from "components/_UI/Dialogs/LearningDialog/LearningDialog"
import useDocDialogStore from "store/zustand/dialogs/useDocDialogStore"
import useLearningDialogStore from "store/zustand/dialogs/useLearningDialogStore"
import useLearningsPerDayDialogStore from "store/zustand/dialogs/useLearningsPerDayDialogStore"

interface Props {
  test?: string
}

const GlobalDialogs = (props: Props) => {
  const { isOpen: docDialogIsOpen, onClose: closeDocDialog } =
    useDocDialogStore()

  const {
    isOpen: learningsPerDayDialogIsOpen,
    onClose: closeLearningsPerDayDialog,
  } = useLearningsPerDayDialogStore()

  const learningModal = useLearningDialogStore()

  return (
    <>
      <ConfirmDialog />
      <ResourceDialog />
      <SkillDialog />
      <QuestionDialog />
      <FolderDialog />

      <DocTitleDialog
        open={docDialogIsOpen}
        afterSave={closeDocDialog}
        onClose={closeDocDialog}
        initialValue={{ title: "" }}
      />

      <LearningsPerDayDialog
        open={learningsPerDayDialogIsOpen}
        onClose={closeLearningsPerDayDialog}
      />

      <LearningDialog
        initialValue={learningModal.initialValue}
        isOpen={learningModal.isOpen}
        onClose={learningModal.closeDialog}
      />
    </>
  )
}

export default GlobalDialogs
