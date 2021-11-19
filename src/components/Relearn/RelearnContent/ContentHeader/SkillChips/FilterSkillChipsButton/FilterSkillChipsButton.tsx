import {
  faEye,
  faEyeSlash,
  faTag,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import Txt from "components/_UI/Text/Txt";
import React from "react";
import { useTheme } from "styled-components";
import { FilterSkillChipsBy } from "types/domain/relearn/FilterSkillChipsBy";

interface Props {
  filterBy: FilterSkillChipsBy;
  onChangeFilterBy: (newFilterBy: FilterSkillChipsBy) => void;
}

// PE 2/3
function FilterSkillChipsButton(props: Props) {
  const theme = useTheme();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMore = () => {
    setAnchorEl(null); // avoids error "The `anchorEl` prop provided to the component is invalid"
  };

  const handleClickOption = (newFilterBy: FilterSkillChipsBy) => {
    props.onChangeFilterBy(newFilterBy);
    handleCloseMore();
  };

  const configKeys: FilterSkillChipsBy[] = ["Show all", "By tag", "Hide all"];

  const config: {
    [key in FilterSkillChipsBy]: { icon: IconDefinition; text: string };
  } = {
    "Show all": { icon: faEye, text: "Show all priority skills" },
    "By tag": { icon: faTag, text: "Filter by tag" },
    "Hide all": { icon: faEyeSlash, text: "Hide all" },
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        size="small"
        className={classes.editSkillsButton}
        onClick={(e) => {
          e.preventDefault();
          handleOpenMore(e);
        }}
      >
        <FlexVCenter style={{ gap: theme.spacing(1) }}>
          <FontAwesomeIcon
            icon={config[props.filterBy].icon}
            style={{ width: 16, height: 16 }}
          />
          <Txt variant="body2">{config[props.filterBy].text}</Txt>
        </FlexVCenter>
      </Button>

      <Menu
        id="filter-skill-chip-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(e) => {
          const event = e as any;
          event.preventDefault();
          handleCloseMore();
        }}
      >
        {configKeys.map((filterBy) => (
          <MenuItem
            key={filterBy}
            selected={props.filterBy === filterBy}
            onClick={() => handleClickOption(filterBy)}
          >
            <FlexVCenter style={{ gap: theme.spacing(1) }}>
              <FontAwesomeIcon
                icon={config[filterBy].icon}
                style={{ width: 16, height: 16 }}
              />
              <Txt>{config[filterBy].text}</Txt>
            </FlexVCenter>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  editSkillsButton: {
    marginBottom: 8,
  },
}));

export default FilterSkillChipsButton;
