import QuestionDialog from "components/Define/DefineContent/FlashcardDialog/StartedFlashcardDialogChild/QuestionDialog/QuestionDialog"
import FolderDialog from "components/Define/DefineSidebar/FileSystem/FolderDialog/FolderDialog"
import ResourceDialog from "components/Relearn/Dialogs/ResourceDialog/ResourceDialog"
import SkillDialog from "components/Skillbase/SkillDialog/SkillDialog"
import ConfirmDialog from "components/_UI/Dialogs/ConfirmationDialog"

interface Props {
  test?: string
}

const ConfirmationDialog = (props: Props) => {
  return (
    <>
      <ConfirmDialog />
      <ResourceDialog />
      <SkillDialog />
      <QuestionDialog />
      <FolderDialog />
    </>
  )
}

export default ConfirmationDialog
