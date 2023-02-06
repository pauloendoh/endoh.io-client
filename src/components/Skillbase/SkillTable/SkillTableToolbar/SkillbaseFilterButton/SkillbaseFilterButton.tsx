import { Checkbox, Divider } from "@mui/material"
import Menu from "@mui/material/Menu"
import DarkButton from "components/_UI/Buttons/DarkButton/DarkButton"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import useLabelsQuery from "hooks/react-query/skillbase/labels/useLabelsQuery"
import { useMemo, useState } from "react"
import { MdClose, MdFilterAlt } from "react-icons/md"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import S from "./styles"
import { useToggleCurrentGoalHotkey } from "./useToggleCurrentGoalHotkey/useToggleCurrentGoalHotkey"

// PE 2/3
const SkillbaseFilterButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const { data: labels } = useLabelsQuery()
  const {
    filter,
    getFilterCount,
    labelIdIsInFilter,
    toggleFilterLabelId,
    toggleFilterCurrentGoal,
    toggleHidingDone,
  } = useSkillbaseStore()

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useToggleCurrentGoalHotkey()

  const isDisabled = useMemo(() => filter.byText?.length > 0, [filter.byText])

  // PE 1/3 - Check if it's being used in other places
  const sortedLabelsById = useMemo(() => {
    if (labels === undefined || labels?.length === 0) return []
    return labels.sort((a, b) => (a.id > b.id ? 1 : -1))
  }, [labels])

  return (
    <>
      <DarkButton
        id="skilbase-filter-btn"
        onClick={handleClick}
        startIcon={<MdFilterAlt />}
        disabled={isDisabled}
        sx={(theme) => ({
          background:
            getFilterCount() > 0 ? theme.palette.secondary.main : undefined,
        })}
      >
        Filter
        {getFilterCount() > 0 && (
          <FlexVCenter
            style={{
              padding: "2px 8px",
              marginLeft: 8,
              borderRadius: 4,
              background: "#2b2b2b",
              minHeight: 25,
            }}
          >
            {isDisabled ? <MdClose /> : getFilterCount()}
          </FlexVCenter>
        )}
      </DarkButton>

      <Menu
        id="skillbase-filter-menu"
        anchorEl={anchorEl}
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

        {sortedLabelsById.length > 0 && <Divider />}

        {sortedLabelsById.map((label) => (
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
    </>
  )
}

export default SkillbaseFilterButton
