import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import DarkButton from "components/_UI/Buttons/DarkButton/DarkButton"
import SaveCancelButtons from "components/_UI/Buttons/SaveCancelButtons"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import useCreateManyQuestionsMutation from "hooks/react-query/questions/note/useCreateManyQuestionsMutation"
import { useEffect, useMemo, useRef, useState } from "react"

interface Props {
  docId: number
}
// PE 2/3
const AddManyQuestionsMenuButton = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget)

    console.log({
      inputRef,
    })
    setTimeout(() => {
      inputRef.current?.focus()
    }, 250)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const [value, setValue] = useState(10)
  useEffect(() => {
    if (anchorEl) setValue(10)
  }, [anchorEl])

  const canSave = useMemo(
    () => 1 <= value && value <= 25,

    [value]
  )

  const { mutate: submitCreation, isLoading } = useCreateManyQuestionsMutation()

  const handleSubmit = () => {
    submitCreation(
      { docId: props.docId, questionsQuantity: value },
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
        <MenuItem
          id="profile-user-menu-option"
          disableRipple
          sx={{
            backgroundColor: "unset !important",
          }}
        >
          <form
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <MyTextField
              inputRef={inputRef}
              size="small"
              required
              type="number"
              label="Questions quantity (max: 25)"
              value={value}
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

export default AddManyQuestionsMenuButton
