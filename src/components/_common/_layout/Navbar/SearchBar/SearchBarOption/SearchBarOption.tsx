import { useTheme } from "@material-ui/core";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import MyImage from "components/_UI/images/MyImage";
import Txt from "components/_UI/Text/Txt";
import React from "react";
import { useLocation } from "react-router-dom";
import { ResourceDto } from "types/domain/relearn/ResourceDto";
import { getColorByRating } from "utils/relearn/getColorByRating";
import Icons from "utils/styles/Icons";
import { urls } from "utils/urls";

type Props = {
  resource: ResourceDto;
  handleClick: () => void;
};

const SearchBarOption = ({ resource, handleClick }: Props) => {
  const theme = useTheme();

  const location = useLocation();

  return (
    <FlexVCenter
      style={{ justifyContent: "space-between", width: "100%" }}
      onClick={handleClick}
      onMouseDown={(e) => {
        if (e.button === 1)
          window
            .open(
              urls.pages.openResourceId(resource.id, location.pathname),
              "_blank"
            )
            .focus();
      }}
    >
      {resource.thumbnail?.length ? (
        <MyImage
          src={resource.thumbnail}
          style={{ width: 50 }}
          alt={`search-preview-thumbnail: ${resource.title}`}
        />
      ) : (
        <div style={{ minWidth: 50 }} />
      )}
      <Txt noWrap style={{ width: 350, marginLeft: 8 }} title={resource.title}>
        {resource.title}
      </Txt>
      <FlexVCenter style={{ gap: theme.spacing(2) }}>
        {resource.rating > 0 ? (
          <FlexVCenter style={{ gap: theme.spacing(0.5), width: 30 }}>
            <Icons.Star style={{ color: getColorByRating(resource.rating) }} />
            <Txt>{resource.rating}</Txt>
          </FlexVCenter>
        ) : (
          <div style={{ width: 30 }} />
        )}

        {resource.tag && (
          <FlexVCenter style={{ gap: theme.spacing(0.5) }}>
            <Icons.Label style={{ color: resource.tag.color }} />
            <Txt noWrap style={{ width: 125 }}>
              {resource.tag.name}
            </Txt>
          </FlexVCenter>
        )}
      </FlexVCenter>
    </FlexVCenter>
  );
};

export default SearchBarOption;
