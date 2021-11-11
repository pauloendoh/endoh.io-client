import { Box } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { lighten, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { ApplicationState } from "../../../../store/store";
import { TagDto } from "../../../../types/domain/relearn/TagDto";
import pageUrls from "../../../../utils/consts/pageUrls";
import { getCurrentTag } from "../../../../utils/skillbase/getCurrentTag";
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter";
import TagIcon from "../../../_UI/Icon/TagIcon";
import SkillbaseTagSelector, {
  optionTypes,
} from "./SkillbaseTagSelector/SkillbaseTagSelector";

const SkillTableToolbar = (props: Props) => {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  const [tagSelectorValue, setTagSelectorValue] = useState<optionTypes>("All");
  const handleTagChange = (value: optionTypes) => {
    if (value === "All") history.push(pageUrls.skillbase.index);
    else if (value === "Untagged") history.push(pageUrls.skillbase.untagged);
    else history.push(pageUrls.skillbase.tag + "/" + value.id);
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname.includes(pageUrls.skillbase.untagged))
      setTagSelectorValue("Untagged");
    else if (pathname.includes(pageUrls.skillbase.tag))
      setTagSelectorValue(getCurrentTag(pathname, props.allTags));
    else setTagSelectorValue("All");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: props.numSelected > 0,
      })}
    >
      {props.numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {props.numSelected} selected
        </Typography>
      ) : (
        <Box>
          {props.fixedTag ? (
            <Typography variant="h4">
              <FlexVCenter>
                <TagIcon tag={props.fixedTag} />
                <Box ml={1} />
                {props.fixedTag.name}
              </FlexVCenter>
            </Typography>
          ) : (
            <SkillbaseTagSelector
              value={tagSelectorValue}
              onChange={handleTagChange}
            />
          )}
        </Box>
      )}
      {props.numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton
            id="delete-skills-icon"
            onClick={props.onClickDelete}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

type Props = {
  fixedTag: TagDto;
  numSelected: number;
  onClickDelete: () => void;
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SkillTableToolbar);
