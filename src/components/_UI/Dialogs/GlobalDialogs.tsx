import DocTitleDialog from "components/Questions/DocTitleDialog/DocTitleDialog"
import QuestionDialog from "components/Questions/QuestionsContent/FlashcardDialog/StartedFlashcardDialogChild/QuestionDialog/QuestionDialog"
import FolderDialog from "components/Questions/QuestionsSidebar/QuestionsFileSystem/FolderDialog/FolderDialog"
import ResourceDialog from "components/Relearn/Dialogs/ResourceDialog/ResourceDialog"
import SkillDialog from "components/Skillbase/SkillDialog/SkillDialog"
import ConfirmDialog from "components/_UI/Dialogs/ConfirmationDialog"
import useDocDialogStore from "store/zustand/dialogs/useDocDialogStore"

interface Props {
  test?: string
}

const GlobalDialogs = (props: Props) => {
  const {
    isOpen: docDialogIsOpen,
    onClose: closeDocDialog,
  } = useDocDialogStore()
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
    </>
  )
}

export default GlobalDialogs
