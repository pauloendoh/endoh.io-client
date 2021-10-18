import {
  Box,
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import useSaveTagLastOpenedAt from "hooks/react-query/relearn/useSaveTagLastOpenedAt";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { pushOrReplace } from "utils/pushOrReplace";
import TagMoreIcon from "../../../../components/resources/TagMoreIcon/TagMoreIcon";
import Flex from "../../../../components/shared/Flexboxes/Flex";
import FlexHCenter from "../../../../components/shared/Flexboxes/FlexHCenter";
import * as relearnActions from "../../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../../store/store";
import * as utilsActions from "../../../../store/utils/utilsActions";
import { TagDto } from "../../../../types/domain/relearn/TagDto";
import PATHS from "../../../../utils/consts/PATHS";
import { getTodoResources } from "../../../../utils/relearn/getTodoResources";

// PE 2/3 - MenuItem could be shorter?
function TagListItem(props: Props) {
  const classes = useStyles();
  const location = useLocation();

  // PE 2/3 -  desnecessário?
  const [pathName, setPathName] = useState(location.pathname);
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const { mutate: saveTagLastOpenedAt } = useSaveTagLastOpenedAt();
  const handleSaveTagLastOpenedAt = (tagId: number) => {
    saveTagLastOpenedAt(tagId, {
      onSuccess: (savedTag) => {
        const tags = pushOrReplace([...props.allTags], savedTag, "id");
        props.setTags(tags);
      },
    });
  };

  const [redirectTo, setRedirectTo] = useState("");

  return (
    <ListItem
      key={props.tag.id}
      className={classes.tagListItem + " tag-item"}
      button
      component={Link}
      onClick={() => handleSaveTagLastOpenedAt(props.tag.id)}
      to={PATHS.relearn.tag + "/" + props.tag.id}
      selected={pathName === PATHS.relearn.tag + "/" + props.tag.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ListItemText>
        <Flex>
          <LabelIcon style={{ color: props.tag.color }} />
          <Box ml={1} width={210}>
            <Typography noWrap style={{ maxWidth: "inherit" }}>
              {props.tag.name}
            </Typography>
          </Box>
        </Flex>
      </ListItemText>

      {isHovered ? (
        <TagMoreIcon
          afterDelete={() => {
            if (pathName.endsWith(props.tag.id.toString())) {
              setRedirectTo(PATHS.relearn.index);
            }
          }}
          tag={props.tag}
        />
      ) : (
        <FlexHCenter mt={0.5} width={24}>
          <Typography className={classes.resourcesCount}>
            {
              getTodoResources(
                props.allResources.filter((r) => r.tag?.id === props.tag.id)
              ).length
            }
          </Typography>
        </FlexHCenter>
      )}

      {redirectTo.length > 0 && <Redirect to={redirectTo} />}
    </ListItem>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tagListItem: {
      alignItems: "flex-start",
    },
    moreButtonBox: {
      position: "absolute",
      width: 32,
      height: 32,
      right: 0,
    },

    listItemIcon: {
      width: 16,
    },
    resourcesCount: {
      fontSize: 12,
      color: theme.palette.grey[400],
    },
  })
);

const mapStateToProps = (state: ApplicationState) => ({
  // user: state.auth.user,
  allResources: state.relearn.resources,
  allTags: state.relearn.tags,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editTag: (tag: TagDto) => dispatch(relearnActions.editTag(tag)),
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
  removeTag: (id: number) => dispatch(relearnActions.removeTag(id)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  // logout: () => dispatch(logoutActionCreator(dispatch)),
});

interface OwnProps {
  tag: TagDto;
  // onCloseForm: () => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(TagListItem);
