import LabelIcon from "@material-ui/icons/Label";
import React from "react";
import { TagDto } from "../../../types/domain/relearn/TagDto";

const TagIcon = (props: Props) => {
  return <LabelIcon style={{ color: props.tag.color }} fontSize="inherit" />;
};

interface Props {
  tag: TagDto;
}

export default TagIcon;
