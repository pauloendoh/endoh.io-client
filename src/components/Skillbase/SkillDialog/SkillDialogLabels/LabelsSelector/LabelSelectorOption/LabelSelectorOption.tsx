import { IconButton, Typography } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { MdCircle, MdEdit } from "react-icons/md"
import { LabelDto } from "types/domain/skillbase/LabelDto"

interface Props {
  label: LabelDto
  onClickEdit: (label: LabelDto) => void
  liProps: React.HTMLAttributes<HTMLLIElement>
}

const LabelSelectorOption = ({ label, onClickEdit, liProps }: Props) => {
  if (Number(label.id) > 0)
    return (
      <li
        {...liProps}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <FlexVCenter style={{ gap: 8 }}>
          <MdCircle style={{ color: label.bgColor }} />
          <Typography>{label.name}</Typography>
        </FlexVCenter>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()

            onClickEdit(label)
          }}
        >
          <MdEdit />
        </IconButton>
      </li>
    )

  return (
    <li {...liProps}>
      <FlexVCenter style={{ gap: 8 }}>+ Add label</FlexVCenter>
    </li>
  )
}

export default LabelSelectorOption
