import {
  Box,
  Link,
  makeStyles,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import EventIcon from "@material-ui/icons/Event";
import ScheduleIcon from "@material-ui/icons/Schedule";
import useHover from "hooks/useHover";
import { DateTime } from "luxon";
import React from "react";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";
import { Dispatch } from "redux";
import Icons from "utils/styles/Icons";
import RateButton from "../../../../../../components/resources/RateButton/RateButton";
import ResourceThumbnail from "../../../../../../components/resources/ResourceThumbnail/ResourceThumbnail";
import Flex from "../../../../../../components/shared/Flexboxes/Flex";
import FlexVCenter from "../../../../../../components/shared/Flexboxes/FlexVCenter";
import Txt from "../../../../../../components/shared/Text/Txt";
import * as relearnActions from "../../../../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../../../../store/store";
import * as utilsActions from "../../../../../../store/utils/utilsActions";
import { IMoveResource } from "../../../../../../types/domain/relearn/IMoveResource";
import { ResourceDto } from "../../../../../../types/domain/relearn/ResourceDto";
import apiUrls from "../../../../../../utils/consts/apiUrls";
import myAxios from "../../../../../../utils/consts/myAxios";
import { validateEstimatedTime } from "../../../../../../utils/relearn/validateEstimatedTime";
import ResourceMoreIcon from "../ResourceMoreIcon/ResourceMoreIcon";
import S from "./ResourceItem.styles";
import ResourceItemTaskCheckbox from "./ResourceItemTaskCheckbox/ResourceItemTaskCheckbox";

// PE 1/3
function ResourceItem(props: Props) {
  const classes = useStyles();

  const { handleMouseEnter, handleMouseLeave, isHovering } = useHover();

  const handleSaveRating = (rating: number) => {
    const resource = { ...props.resource, rating } as ResourceDto;
    myAxios
      .post<ResourceDto[]>(apiUrls.relearn.resource, resource)
      .then((res) => {
        props.setResources(res.data);

        if (resource.rating) {
          props.setSuccessMessage("Resource rated!");
        } else {
          props.setSuccessMessage("Rating removed!");
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
          props.setSuccessMessage("Task completed!");
        } else {
          props.setSuccessMessage("Task uncompleted!");
        }
      });
  };

  const theme = useTheme();

  return (
    <S.ResourceItemRoot
      onClick={(e) => {
        if (e.altKey) {
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
      <Box flexGrow={1}>
        <Flex className={classes.firstRow}>
          <Box>
            <Txt>{props.resource.title}</Txt>
            {props.resource.url.length > 0 && (
              <Link
                className={classes.link}
                href={props.resource.url}
                target="_blank"
              >
                <Txt noWrap style={{ maxWidth: "inherit" }}>
                  {props.resource.url}
                </Txt>
              </Link>
            )}
          </Box>
          <ResourceMoreIcon resource={props.resource} isHovered={isHovering} />
        </Flex>

        <FlexVCenter justifyContent="space-between">
          <FlexVCenter>
            {/* Due date */}
            {props.resource.dueDate.length > 0 &&
              props.resource.completedAt.length === 0 && (
                <FlexVCenter mr={2}>
                  <EventIcon fontSize="inherit" style={{ marginRight: 4 }} />
                  {DateTime.fromISO(props.resource.dueDate).toFormat("LLL dd")}
                </FlexVCenter>
              )}

            {/* Completed timeago */}
            {props.resource.completedAt.length > 0 && (
              <FlexVCenter mr={2}>
                <DoneIcon />
                &nbsp;
                <TimeAgo date={props.resource.completedAt} live={false} />
              </FlexVCenter>
            )}

            {/* Duration */}
            {validateEstimatedTime(props.resource.estimatedTime) && (
              <FlexVCenter mr={2}>
                <ScheduleIcon style={{ marginRight: 4 }} />
                {props.resource.estimatedTime}
              </FlexVCenter>
            )}
          </FlexVCenter>

          {props.resource.url?.length > 0 ? (
            <RateButton resource={props.resource} onChange={handleSaveRating} />
          ) : (
            <ResourceItemTaskCheckbox
              resource={props.resource}
              onChange={onChangeTaskChecked}
            />
          )}
        </FlexVCenter>

        {props.resource.publicReview?.length > 0 && (
          <Box mt={2} mb={1}>
            <Flex style={{ gap: theme.spacing(1) }}>
              <Tooltip title="Public Review">
                <Icons.Public
                  style={{
                    color: theme.palette.text.secondary,
                  }}
                />
              </Tooltip>

              <Typography
                color="textSecondary"
                style={{ whiteSpace: "pre-line", fontStyle: "italic" }}
              >
                {props.resource.publicReview}
              </Typography>
            </Flex>
          </Box>
        )}

        {props.resource.privateNote?.length > 0 && (
          <Box mt={2} mb={1}>
            <Flex style={{ gap: theme.spacing(1) }}>
              <Tooltip title="Private Notes">
                <Icons.Lock
                  style={{
                    color: theme.palette.text.secondary,
                  }}
                />
              </Tooltip>

              <Typography
                color="textSecondary"
                style={{ whiteSpace: "pre-line", fontStyle: "italic" }}
              >
                {props.resource.privateNote}
              </Typography>
            </Flex>
          </Box>
        )}
      </Box>
    </S.ResourceItemRoot>
  );
}

const useStyles = makeStyles((theme) => ({
  link: {
    // fontSize: 12
    maxWidth: 400,
    overflow: "hidden",
    marginRight: 16,
  },
  isDragging: {
    border: "1px dashed rgba(255, 255, 255, 0.2)",
  },
  dueDateBox: {
    paddingLeft: 16,
    borderLeft: "1px solid rgb(255 255 255)",
  },
  listItemIcon: {
    width: 16,
  },
  firstRow: {
    justifyContent: "space-between",
    minHeight: 32,
  },
}));

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) =>
    dispatch(relearnActions.editResource(resource)),
  removeResource: (id: number) => dispatch(relearnActions.removeResource(id)),
  moveResource: (params: IMoveResource) =>
    dispatch(relearnActions.moveResource(params)),

  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
});

interface OwnProps {
  resource: ResourceDto;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResourceItem);
