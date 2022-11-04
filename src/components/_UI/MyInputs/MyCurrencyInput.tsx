import TextField from "@mui/material/TextField"
import React from "react"
import NumberFormat from "react-number-format"
import MyTextField from "./MyTextField"

type Props = React.ComponentProps<typeof TextField>

const MyCurrencyInput = (props: Props) => {
  return (
    <MyTextField
      value={props.value}
      onChange={props.onChange}
      name="numberformat"
      id="formatted-numberformat-input" // should I remove it?
      InputProps={{
        inputComponent: InnerComponent as any,
      }}
      {...props}
    />
  )
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat<any> | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const InnerComponent = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      isNumericString
      decimalScale={2}
      prefix="$"
    />
  )
}

export default MyCurrencyInput
