import DocTitleDialog from "components/Questions/DocTitleDialog/DocTitleDialog"
import LearningsPerDayDialog from "components/Questions/LearningsPerDayDialog/LearningsPerDayDialog"
import QuestionDialog from "components/Questions/QuestionsContent/FlashcardDialog/StartedFlashcardDialogChild/QuestionDialog/QuestionDialog"
import FolderDialog from "components/Questions/QuestionsSidebar/DocsFolderSystem/FolderDialog/FolderDialog"
import ResourceDialog from "components/Relearn/Dialogs/ResourceDialog/ResourceDialog"
import SkillDialog from "components/Skillbase/SkillDialog/SkillDialog"
import ConfirmDialog from "components/_UI/Dialogs/ConfirmationDialog"
import LearningDialog from "components/_UI/Dialogs/LearningDialog/LearningDialog"
import { buildRecurrentLearningDto } from "hooks/react-query/learning-diary/recurrent-learning/types/RecurrentLearningDto"
import useDocDialogStore from "store/zustand/dialogs/useDocDialogStore"
import useFollowersDialogStore from "store/zustand/dialogs/useFollowersDialogStore"
import useLearningDialogStore from "store/zustand/dialogs/useLearningDialogStore"
import useLearningsPerDayDialogStore from "store/zustand/dialogs/useLearningsPerDayDialogStore"
import useRecurrentLearningDialogStore from "store/zustand/dialogs/useRecurrentLearningDialogStore"
import { buildLearning } from "utils/builders"
import FollowersDialogV2 from "./FollowersDialogV2/FollowersDialogV2"
import NumberDialog from "./NumberDialog"
import RecurrentLearningDialog from "./RecurrentLearningDialog/RecurrentLearningDialog"

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
  const followersDialog = useFollowersDialogStore()
  const recurrentLearningDialog = useRecurrentLearningDialogStore()

  return (
    <>
      <ConfirmDialog />
      <NumberDialog />
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
        initialValue={learningModal.initialValue || buildLearning()}
        isOpen={learningModal.isOpen}
        onClose={learningModal.closeDialog}
      />

      <RecurrentLearningDialog
        initialValue={
          recurrentLearningDialog.initialValue || buildRecurrentLearningDto()
        }
        isOpen={recurrentLearningDialog.isOpen}
        onClose={recurrentLearningDialog.closeDialog}
      />

      <FollowersDialogV2
        initialValue={followersDialog.initialValue}
        isOpen={followersDialog.isOpen}
        onClose={followersDialog.closeDialog}
      />
    </>
  )
}

export default GlobalDialogs
