import DeleteIcon from "@material-ui/icons/Delete"

import { Button, Typography } from "@material-ui/core"
import React, { useState } from "react"
import SaveCancelButtons from "../../../../../../components/shared/Buttons/SaveCancelButtons"
import FlexVCenter from "../../../../../../components/shared/Flexboxes/FlexVCenter"
import MyTextField from "../../../../../../components/shared/MyInputs/MyTextField"

const ExpectationTextarea = (props: Props) => {
  const [value, setValue] = useState(props.initialValue)
  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null)

  return (
    <>
      <MyTextField
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") props.onSave(value)
        }}
        fullWidth
        multiline
        size="small"
        onBlur={() => props.onSave(value)}
      />
    </>
  )
}

interface OwnProps {
  initialValue: string
  onSave: (newValue: string) => void
}

type Props = OwnProps
export default ExpectationTextarea
