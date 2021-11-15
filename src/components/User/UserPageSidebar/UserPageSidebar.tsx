import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, List, ListItem, makeStyles, Typography } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import useProfileStore from "store/zustand/domain/useProfileStore";
import useElementSize from "../../../hooks/useElementSize";
import pageUrls from "../../../utils/url/urls/pageUrls";
import Flex from "../../_UI/Flexboxes/Flex";
import FlexHCenter from "../../_UI/Flexboxes/FlexHCenter";
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter";
import TagListItem from "./TagListItem/TagListItem";

// PE 3/3
const UserPageSidebar = () => {
  const rootRef = useRef<any>(null);
  const profileStore = useProfileStore();

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
              {profileStore.resources.length}
            </Typography>
          </FlexHCenter>
        </ListItem>

        {profileStore.publicTags.map((tag) => (
          <TagListItem
            key={tag.id}
            tag={tag}
            width={width}
            username={username}
            selectedTagId={tagId}
          />
        ))}
      </List>

      {profileStore.privateTags.length > 0 && (
        <Box mt={2}>
          <FlexVCenter pl={2}>
            <FontAwesomeIcon icon={faLock} />
            <Box ml={1}>
              <Typography>Private tags</Typography>
            </Box>
          </FlexVCenter>

          <List component="nav" aria-label="User resource lists">
            {profileStore.privateTags.map((tag) => (
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

export default UserPageSidebar;
