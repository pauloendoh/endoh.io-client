import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import DarkButton from "components/_UI/Buttons/DarkButton/DarkButton"
import SaveCancelButtons from "components/_UI/Buttons/SaveCancelButtons"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import useCreateManyNotesMutation from "hooks/react-query/questions/note/useCreateManyNotesMutation"
import { useEffect, useMemo, useState } from "react"

interface Props {
  docId: number
}
// PE 2/3
const AddManyNotesMenuButton = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const [value, setValue] = useState(1)
  useEffect(() => {
    if (anchorEl) setValue(1)
  }, [anchorEl])

  const canSave = useMemo(
    () => 1 <= value && value <= 25,

    [value]
  )

  const { mutate: submitCreation, isLoading } = useCreateManyNotesMutation()

  const handleSubmit = () => {
    submitCreation(
      { docId: props.docId, notesQuantity: value },
      {
        onSuccess: () => handleCloseMenu(),
      }
    )
  }

  return (
    <>
      <DarkButton onClick={handleOpenMenu}>+ Add many questions</DarkButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleCloseMenu}
      >
        <MenuItem id="profile-user-menu-option" disableRipple>
          <form
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <MyTextField
              size="small"
              required
              type="number"
              label="Notes quantity (max: 25)"
              autoFocus
              onChange={(e) => {
                setValue(parseInt(e.currentTarget.value))
              }}
            />
            <SaveCancelButtons
              disabled={!canSave}
              isLoading={isLoading}
              onEnabledAndCtrlEnter={() => {
                handleSubmit()
              }}
            />
          </form>
        </MenuItem>
      </Menu>
    </>
  )
}

export default AddManyNotesMenuButton
