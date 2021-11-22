import { Box, Link, makeStyles } from "@material-ui/core";
import Txt from "components/_UI/Text/Txt";
import React, { useState } from "react";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";
import { Dispatch } from "redux";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import * as relearnActions from "../../../../store/relearn/relearnActions";
import { ResourceDto } from "../../../../types/domain/relearn/ResourceDto";
import myAxios from "../../../../utils/consts/myAxios";
import { validateEstimatedTime } from "../../../../utils/relearn/validateEstimatedTime";
import { urlIsValid } from "../../../../utils/url/isValidUrl";
import apiUrls from "../../../../utils/url/urls/apiUrls";
import ResourceMoreIcon from "../../../Relearn/RelearnContent/ResourceList/DraggableResourceItem/ResourceMoreIcon/ResourceMoreIcon";
import RateButton from "../../../_common/RateButton/RateButton";
import ResourceThumbnail from "../../../_common/ResourceThumbnail/ResourceThumbnail";
import Flex from "../../../_UI/Flexboxes/Flex";
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter";
import MyTextField from "../../../_UI/MyInputs/MyTextField";

// PE 1/3 - DRY with FeedPage's ? ...
// This is for the user page... for the feed page, look for FeedResource.tsx
function FeedResourceItem(props: Props) {
  const classes = useStyles();

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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

  return (
    <Flex
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      p={1}
      borderBottom="1px solid rgb(255 255 255 / 0.1)" // Could be a const?
      style={props.style ? props.style : null}
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

            {urlIsValid(props.resource.url) && (
              <Link href={props.resource.url} target="_blank">
                <Txt variant="inherit">{props.resource.url}</Txt>
              </Link>
            )}
          </Box>

          <ResourceMoreIcon resource={props.resource} isHovered={isHovered} />
        </Flex>

        <Flex mt={1}>
          <RateButton resource={props.resource} onChange={handleSaveRating} />
          <Flex ml="auto">
            {props.resource.completedAt.length ? (
              <FlexVCenter>
                Completed&nbsp;
                <TimeAgo date={props.resource.completedAt} live={false} />
              </FlexVCenter>
            ) : (
              <FlexVCenter>
                {props.resource.dueDate.length > 0 && (
                  <FlexVCenter
                    className={
                      validateEstimatedTime(props.resource.estimatedTime)
                        ? classes.dueDateBox
                        : ""
                    }
                  ></FlexVCenter>
                )}
              </FlexVCenter>
            )}
          </Flex>
        </Flex>

        {props.resource.publicReview?.length > 0 && (
          <Box mt={2}>
            <MyTextField
              value={props.resource.publicReview}
              fullWidth
              label="Public Review"
              disabled
            />
          </Box>
        )}

        {props.resource.privateNote?.length > 0 && (
          <Box mt={2}>
            <MyTextField
              value={props.resource.privateNote}
              fullWidth
              label="Private Notes"
              disabled
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
}

const useStyles = makeStyles((theme) => ({
  link: {
    maxWidth: 400,
    overflow: "hidden",
    marginRight: 16,
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),
});

interface OwnProps {
  resource: ResourceDto;
  style?: React.CSSProperties;
}

type Props = ReturnType<typeof mapDispatchToProps> & OwnProps;

export default connect(undefined, mapDispatchToProps)(FeedResourceItem);
