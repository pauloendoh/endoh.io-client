import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, List, ListItem, makeStyles, Typography } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Dispatch } from "redux";
import Flex from "../../../components/shared/Flexboxes/Flex";
import FlexHCenter from "../../../components/shared/Flexboxes/FlexHCenter";
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter";
import useElementSize from "../../../hooks/useElementSize";
import { ApplicationState } from "../../../store/store";
import pageUrls from "../../../utils/consts/pageUrls";
import TagListItem from "./TagListItem/TagListItem";

// PE 3/3
const UserPageSidebar = (props: Props) => {
  const rootRef = useRef<any>(null);

  const { width } = useElementSize(rootRef);

  const classes = useStyles();
  const { username, tagId } = useParams<{ username: string; tagId: string }>();

  return (
    <Box maxWidth={300} ml="auto" {...({ ref: rootRef } as any)}>
      <List component="nav" aria-label="User resource lists">
        <ListItem
          button
          component={Link}
          to={pageUrls.user.index(username)}
          selected={tagId === undefined}
        >
          <ListItemText>
            <Flex>
              <Box width={width - 90}>
                <Typography noWrap style={{ maxWidth: "inherit" }}>
                  All resources
                </Typography>
              </Box>
            </Flex>
          </ListItemText>

          <FlexHCenter mt={0.5} width={24}>
            <Typography className={classes.resourcesCount}>
              {props.resources.length}
            </Typography>
          </FlexHCenter>
        </ListItem>

        {props.publicTags.map((tag) => (
          <TagListItem
            key={tag.id}
            tag={tag}
            width={width}
            username={username}
            selectedTagId={tagId}
          />
        ))}
      </List>

      {props.privateTags.length > 0 && (
        <Box mt={2}>
          <FlexVCenter pl={2}>
            <FontAwesomeIcon icon={faLock} />
            <Box ml={1}>
              <Typography>Private tags</Typography>
            </Box>
          </FlexVCenter>

          <List component="nav" aria-label="User resource lists">
            {props.privateTags.map((tag) => (
              <TagListItem
                key={tag.id}
                tag={tag}
                width={width}
                username={username}
                selectedTagId={tagId}
              />
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  resourcesCount: {
    fontSize: 12,
    color: theme.palette.grey[400],
  },
}));

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  resources: state.profile.resources,
  publicTags: state.profile.publicTags,
  privateTags: state.profile.privateTags,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserPageSidebar);
