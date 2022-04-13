import { Checkbox, Divider } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import DarkButton from "components/_UI/Buttons/DarkButton/DarkButton";
import useLabelsQuery from "hooks/react-query/skillbase/labels/useLabelsQuery";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore";
import S from "./styles";

// PE 2/3
const SkillbaseFilterButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { data: labels } = useLabelsQuery();
  const {
    filter,
    getFilterCount,
    labelIdIsInFilter,
    toggleFilterLabelId,
    toggleFilterCurrentGoal,
    toggleHidingDone,
  } = useSkillbaseStore();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <DarkButton
        id="skilbase-filter-btn"
        onClick={handleClick}
        startIcon={<MdFilterAlt />}
      >
        Filter
        {getFilterCount() > 0 && (
          <div
            style={{
              padding: "2px 8px",
              marginLeft: 8,
              borderRadius: 4,
              background: "#2b2b2b",
            }}
          >
            {getFilterCount()}
          </div>
        )}
      </DarkButton>

      <Menu
        id="skillbase-filter-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <S.MenuItem onClick={toggleHidingDone}>
          <Checkbox checked={filter.hidingDone} name="hiding-done" />
          <S.CheckboxLabel>Hide done</S.CheckboxLabel>
        </S.MenuItem>
        <S.MenuItem onClick={toggleFilterCurrentGoal}>
          <Checkbox checked={filter.currentGoal} name="current-goal" />
          <S.CheckboxLabel>With current goal</S.CheckboxLabel>
        </S.MenuItem>

        <Divider />

        {labels?.map((label) => (
          <S.MenuItem
            key={label.id}
            onClick={() => toggleFilterLabelId(label.id)}
          >
            <Checkbox checked={labelIdIsInFilter(label.id)} name={label.name} />

            <S.CheckboxLabel
              style={{
                background: label.bgColor,
                borderRadius: 4,
              }}
            >
              {label.name}
            </S.CheckboxLabel>
          </S.MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SkillbaseFilterButton;
