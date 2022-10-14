import { styled } from "@material-ui/core"
import { TreeView } from "@material-ui/lab"

export const S = {
  TreeView: styled(TreeView)(({ theme }) => ({
    "& .MuiTreeItem-label": {
      padding: "4px 8px",
    },
  })),
}
