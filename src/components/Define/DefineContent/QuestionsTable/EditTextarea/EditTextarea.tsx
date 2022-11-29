import { InputBase, InputBaseProps, Paper, Popper } from "@mui/material"
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid"
import React from "react"

const EditTextarea = (props: GridRenderEditCellParams<string>) => {
  const { id, field, value, colDef } = props
  const [valueState, setValueState] = React.useState(value)
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>()
  const apiRef = useGridApiContext()

  const handleRef = React.useCallback((el: HTMLElement | null) => {
    setAnchorEl(el)
  }, [])

  const handleChange = React.useCallback<
    NonNullable<InputBaseProps["onChange"]>
  >(
    (event) => {
      const newValue = event.target.value
      setValueState(newValue)
      apiRef.current.setEditCellValue(
        { id, field, value: newValue, debounceMs: 200 },
        event
      )
    },
    [apiRef, field, id]
  )

  const handleKeyDown = React.useCallback<
    NonNullable<InputBaseProps["onKeyDown"]>
  >(
    (event) => {
      if (
        event.key === "Escape" ||
        (event.key === "Enter" &&
          !event.shiftKey &&
          (event.ctrlKey || event.metaKey))
      ) {
        const params = apiRef.current.getCellParams(id, field)
        apiRef.current.publishEvent("cellKeyDown", params, event)
      }
    },
    [apiRef, id, field]
  )

  return (
    <div style={{ position: "relative", alignSelf: "flex-start" }}>
      <div
        ref={handleRef}
        style={{
          height: 1,
          width: colDef.computedWidth,
          display: "block",
          position: "absolute",
          top: 0,
        }}
      />
      {anchorEl && (
        <Popper open anchorEl={anchorEl} placement="bottom-start">
          <Paper elevation={1} sx={{ p: 1, minWidth: colDef.computedWidth }}>
            <InputBase
              multiline
              rows={4}
              value={valueState}
              sx={{ textarea: { resize: "both" }, width: "100%" }}
              onChange={handleChange}
              autoFocus
              onKeyDown={handleKeyDown}
            />
          </Paper>
        </Popper>
      )}
    </div>
  )
}

export default EditTextarea
