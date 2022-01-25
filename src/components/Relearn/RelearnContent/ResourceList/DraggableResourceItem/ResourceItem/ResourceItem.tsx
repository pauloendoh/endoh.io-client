import { Link, useTheme } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import EventIcon from "@material-ui/icons/Event";
import ScheduleIcon from "@material-ui/icons/Schedule";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import useHover from "hooks/utils/useHover";
import { DateTime } from "luxon";
import React from "react";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";
import { Dispatch } from "redux";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import Icons from "utils/styles/Icons";
import * as relearnActions from "../../../../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../../../../store/store";
import { IMoveResource } from "../../../../../../types/domain/relearn/IMoveResource";
import { ResourceDto } from "../../../../../../types/domain/relearn/ResourceDto";
import myAxios from "../../../../../../utils/consts/myAxios";
import { validateEstimatedTime } from "../../../../../../utils/relearn/validateEstimatedTime";
import apiUrls from "../../../../../../utils/url/urls/apiUrls";
import RateButton from "../../../../../_common/RateButton/RateButton";
import ResourceThumbnail from "../../../../../_common/ResourceThumbnail/ResourceThumbnail";
import Txt from "../../../../../_UI/Text/Txt";
import ResourceMoreIcon from "../ResourceMoreIcon/ResourceMoreIcon";
import S from "./ResourceItem.styles";
import ResourceItemTaskCheckbox from "./ResourceItemTaskCheckbox/ResourceItemTaskCheckbox";
import ShowMoreTextField from "./ShowMoreTextField/ShowMoreTextField";

// PE 1/3
function ResourceItem(props: Props) {
  const { handleMouseEnter, handleMouseLeave, isHovering } = useHover();

  const { setSuccessMessage } = useSnackbarStore();

  const handleSaveRating = (rating: number) => {
    const resource = { ...props.resource, rating } as ResourceDto;
    myAxios
      .post<ResourceDto[]>(apiUrls.relearn.resource, resource)
      .then((res) => {
        props.setResources(res.data);

        if (resource.rating) {
          setSuccessMessage("Resource rated!");
        } else {
          setSuccessMessage("Rating removed!");
        }
      });
  };

  const onChangeTaskChecked = (checked: boolean) => {
    const resource = {
      ...props.resource,
      completedAt: checked ? new Date().toISOString() : "",
      rating: null,
    } as ResourceDto;

    myAxios
      .post<ResourceDto[]>(apiUrls.relearn.resource, resource)
      .then((res) => {
        props.setResources(res.data);

        if (checked) {
          setSuccessMessage("Task completed!");
        } else {
          setSuccessMessage("Task uncompleted!");
        }
      });
  };

  const hasDueDate =
    props.resource.dueDate.length > 0 &&
    props.resource.completedAt.length === 0;

  const theme = useTheme();

  return (
    <S.ResourceItemRoot
      onClick={(e) => {
        if (e.altKey) {
          e.preventDefault(); // avoids downloading URL by accident
          props.editResource(props.resource);
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="resource-item"
    >
      <ResourceThumbnail
        resourceUrl={props.resource.url}
        thumbnailSrc={props.resource.thumbnail}
        linkable={true}
      />
      <S.Content>
        <S.TitleLinkMoreWrapper>
          <S.TitleLinkWrapper>
            <Txt>{props.resource.title}</Txt>
            {props.resource.url.length > 0 && (
              <Link
                href={props.resource.url}
                target="_blank"
                style={{ maxWidth: 400, overflow: "hidden", marginRight: 16 }}
              >
                <Txt noWrap style={{ maxWidth: "inherit" }}>
                  {props.resource.url}
                </Txt>
              </Link>
            )}
          </S.TitleLinkWrapper>
          <ResourceMoreIcon resource={props.resource} isHovered={isHovering} />
        </S.TitleLinkMoreWrapper>

        <S.IconsRow>
          <S.IconsWrapper>
            {hasDueDate && (
              <S.DueDateWrapper>
                <EventIcon fontSize="inherit" style={{ marginRight: 4 }} />
                {DateTime.fromISO(props.resource.dueDate).toFormat("LLL dd")}
              </S.DueDateWrapper>
            )}

            {props.resource.completedAt.length > 0 && (
              <S.CompletedWrapper>
                <DoneIcon />{" "}
                <TimeAgo date={props.resource.completedAt} live={false} />
              </S.CompletedWrapper>
            )}

            {validateEstimatedTime(props.resource.estimatedTime) && (
              <S.DurationWrapper>
                <ScheduleIcon style={{ marginRight: 4 }} />
                {props.resource.estimatedTime}
              </S.DurationWrapper>
            )}

            {props.showTag && props.resource.tag.id !== null && (
              <FlexVCenter style={{ gap: 4 }}>
                <Icons.Label style={{ color: props.resource.tag.color }} />
                <Txt variant="body2" noWrap style={{ width: 150 }}>
                  {props.resource.tag.name}
                </Txt>
              </FlexVCenter>
            )}
          </S.IconsWrapper>

          {props.resource.url?.length > 0 ? (
            <RateButton resource={props.resource} onChange={handleSaveRating} />
          ) : (
            <ResourceItemTaskCheckbox
              resource={props.resource}
              onChange={onChangeTaskChecked}
            />
          )}
        </S.IconsRow>

        {props.resource.publicReview?.length > 0 && (
          <S.PublicReviewWrapper>
            <FlexVCenter style={{ gap: 4 }}>
              <Icons.Public
                style={{
                  color: theme.palette.text.secondary,
                }}
              />
              <Txt color="textSecondary">Public review</Txt>
            </FlexVCenter>

            <ShowMoreTextField text={props.resource.publicReview} />
          </S.PublicReviewWrapper>
        )}

        {props.resource.privateNote?.length > 0 && (
          <S.PrivateNoteWrapper>
            <FlexVCenter style={{ gap: 4 }}>
              {" "}
              <Icons.Lock
                style={{
                  color: theme.palette.text.secondary,
                }}
              />
              <Txt color="textSecondary">Private notes</Txt>
            </FlexVCenter>

            <ShowMoreTextField text={props.resource.privateNote} />
          </S.PrivateNoteWrapper>
        )}
      </S.Content>
    </S.ResourceItemRoot>
  );
}

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) =>
    dispatch(relearnActions.editResource(resource)),
  removeResource: (id: number) => dispatch(relearnActions.removeResource(id)),
  moveResource: (params: IMoveResource) =>
    dispatch(relearnActions.moveResource(params)),

  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),
});

interface OwnProps {
  resource: ResourceDto;
  showTag?: boolean;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResourceItem);
