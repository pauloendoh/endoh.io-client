import { TreeView } from "@mui/lab"
import { styled } from "@mui/material"

export const S = {
  TreeView: styled(TreeView)(({ theme }) => ({
    "& .MuiTreeItem-label": {
      padding: "4px 8px",
    },
  })),
}
