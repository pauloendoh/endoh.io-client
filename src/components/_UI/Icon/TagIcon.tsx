import LabelIcon from "@mui/icons-material/Label"
import { TagDto } from "../../../types/domain/relearn/TagDto"

const TagIcon = (props: Props) => {
  return <LabelIcon style={{ color: props.tag.color }} fontSize="inherit" />
}

interface Props {
  tag: TagDto
}

export default TagIcon
