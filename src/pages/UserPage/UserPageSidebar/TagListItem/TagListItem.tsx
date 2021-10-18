import { Box, ListItem, makeStyles, Typography } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import LabelIcon from "@material-ui/icons/Label";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import Flex from "../../../../components/shared/Flexboxes/Flex";
import FlexHCenter from "../../../../components/shared/Flexboxes/FlexHCenter";
import { TagDto } from "../../../../interfaces/dtos/relearn/TagDto";
import { ApplicationState } from "../../../../store/store";
import PATHS from "../../../../utils/consts/PATHS";

// PE 3/3
const TagListItem = (props: Props) => {
  const classes = useStyles();

  const getResourcesFromListId = (listId: number) => {
    return props.allResources.filter((r) => r.tag?.id === listId);
  };

  return (
    <ListItem
      button
      component={Link}
      to={PATHS.user.tag(props.username, props.tag.id)}
      selected={Number(props.selectedTagId) === props.tag.id}
    >
      <ListItemText>
        <Flex>
          <LabelIcon style={{ color: props.tag.color }} />
          <Box ml={1} width={props.width - 90}>
            <Typography noWrap style={{ maxWidth: "inherit" }}>
              {props.tag.name}
            </Typography>
          </Box>
        </Flex>
      </ListItemText>

      <FlexHCenter mt={0.5} width={24}>
        <Typography className={classes.resourcesCount}>
          {getResourcesFromListId(props.tag.id).length}
        </Typography>
      </FlexHCenter>
    </ListItem>
  );
};

const useStyles = makeStyles((theme) => ({
  resourcesCount: {
    fontSize: 12,
    color: theme.palette.grey[400],
  },
}));

interface OwnProps {
  tag: TagDto;
  width: number;
  username: string;
  selectedTagId: string;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

const mapStateToProps = (state: ApplicationState) => ({
  allResources: state.profile.resources,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TagListItem);
