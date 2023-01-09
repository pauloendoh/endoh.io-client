import Txt from "../../../../_UI/Text/Txt"
import S from "./MinWeightInput.styles"

interface Props {
  value: number | null
  allowNull?: boolean
  onChange: (newValue: number) => void
  label?: string
  min: number
}

const MinWeightInput = (props: Props) => {
  return (
    <Txt variant="h5">
      <S.Input
        type="number"
        value={props.value}
        onChange={(e) => {
          if (e.target.value === "" && props.allowNull) {
            props.onChange(null)
            return
          }

          props.onChange(Number(e.target.value))
        }}
        min={props.min}
      />
      <span style={{ marginLeft: 8 }}>{props.label || "min weight"} </span>
    </Txt>
  )
}

export default MinWeightInput
