import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import Txt from "components/_UI/Text/Txt"
import { MdClose } from "react-icons/md"
import shortcutSections from "./KeyboardShortcutsDialog.utils"

interface Props {
  open: boolean
  onClose: () => void
}

const KeyboardShortcutsDialog = (props: Props) => {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="keyboard-shortcuts-dialog"
      PaperProps={{ style: { maxWidth: 300 } }}
    >
      <Box pb={1}>
        <DialogTitle id="keyboard-shorcuts-dialog-title">
          <FlexVCenter justifyContent="space-between">
            <Txt variant="h5">Keyboard shortcuts</Txt>
            <IconButton onClick={props.onClose}>
              <MdClose />
            </IconButton>
          </FlexVCenter>
        </DialogTitle>

        <DialogContent>
          <FlexCol style={{ gap: 24 }}>
            {shortcutSections.map((section) => (
              <Box key={section.title}>
                <Txt variant="h6" style={{ fontWeight: "bold" }}>
                  {section.title}
                </Txt>
                <FlexCol mt={1} style={{ gap: 8 }}>
                  {section.shortcuts.map((shortcut) => (
                    <Flex key={shortcut.name} justifyContent="space-between">
                      <Txt>{shortcut.name}</Txt>
                      <Box
                        style={{
                          background: "rgb(23, 22, 22)",
                          borderRadius: 4,
                          padding: "4px 8px",
                        }}
                      >
                        {shortcut.shortcut}
                      </Box>
                    </Flex>
                  ))}
                </FlexCol>
              </Box>
            ))}
          </FlexCol>
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default KeyboardShortcutsDialog
