import { IconButton, Typography } from "@material-ui/core";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import { MdCircle, MdEdit } from "react-icons/md";
import { LabelDto } from "types/domain/skillbase/LabelDto";

interface Props {
  label: LabelDto;
  onClickEdit: (label: LabelDto) => void;
}

const LabelsSelectorV2Option = ({ label, onClickEdit }: Props) => {
  if (label.id > 0)
    return (
      <FlexVCenter key={label.id} justifyContent="space-between" width="100%">
        <FlexVCenter style={{ gap: 8 }}>
          <MdCircle style={{ color: label.bgColor }} />
          <Typography>{label.name}</Typography>
        </FlexVCenter>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();

            onClickEdit(label);
          }}
        >
          <MdEdit />
        </IconButton>
      </FlexVCenter>
    );

  return <FlexVCenter style={{ gap: 8 }}>+ Add label</FlexVCenter>;
};

export default LabelsSelectorV2Option;
