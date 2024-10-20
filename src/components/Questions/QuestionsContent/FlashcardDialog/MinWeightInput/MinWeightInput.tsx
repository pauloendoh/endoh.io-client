import Txt from "../../../../_UI/Text/Txt"

interface Props {
  value: number | null
  allowNull?: boolean
  onChange: (newValue: number | null) => void
  label?: string
  min: number
}

const MinWeightInput = (props: Props) => {
  return (
    <Txt variant="h5">
      <input
        type="number"
        value={props.value || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value === "" && props.allowNull) {
            props.onChange(null)
            return
          }

          props.onChange(Number(e.target.value))
        }}
        min={props.min}
        style={{
          width: 50,
          textAlign: "center",
          fontFamily: "inherit",
          fontSize: "inherit",
          background: "none",
          border: "none",
          borderBottom: "1px solid white",
          color: "inherit",
        }}
      />
      <span style={{ marginLeft: 8 }}>{props.label || "min weight"} </span>
    </Txt>
  )
}

export default MinWeightInput
