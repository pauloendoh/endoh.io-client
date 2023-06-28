import ResourceMoreIcon from "components/Relearn/RelearnContent/ResourceList/DraggableResourceItem/ResourceMoreIcon/ResourceMoreIcon"
import LearningDialog from "components/_UI/Dialogs/LearningDialog/LearningDialog"
import { useRecurrentLearningsQuery } from "hooks/react-query/learning-diary/recurrent-learning/useRecurrentLearningsQuery"
import { useSaveRecurrentLearningMutation } from "hooks/react-query/learning-diary/recurrent-learning/useSaveRecurrentLearningMutation"
import useLearningDialogStore from "store/zustand/dialogs/useLearningDialogStore"

const moreMenu = ResourceMoreIcon

const dialogStore = useLearningDialogStore
const dialog = LearningDialog

const mutation = useSaveRecurrentLearningMutation
const query = useRecurrentLearningsQuery
