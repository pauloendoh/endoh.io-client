import NotesIcon from "@mui/icons-material/Notes"

import { Typography, useTheme } from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { MdInsertDriveFile } from "react-icons/md"
import { format } from "timeago.js"
import { DocDto } from "types/domain/define/DocDto"
import { NoteDto } from "types/domain/define/NoteDto"

type Props = {
  docOrNote: NoteDto | DocDto
  handleClick: () => void
}

const NotesSearchBarOption = ({ docOrNote, handleClick }: Props) => {
  const theme = useTheme()

  return (
    <FlexVCenter
      style={{
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: 8,
      }}
      onClick={handleClick}
      height="100%"
    >
      {"question" in docOrNote && (
        <FlexCol style={{ gap: 4 }} width="100%">
          <Flex justifyContent="space-between" width="100%">
            <Flex style={{ gap: 8 }}>
              <NotesIcon />
              <Typography>{docOrNote.question}</Typography>
            </Flex>
            <Typography
              noWrap
              title={docOrNote.doc?.title}
              display="inline"
              style={{
                width: 120,
                padding: "2px 8px 2px 8px",
                borderRadius: 2,
                height: "fit-content",
                background: theme.palette.grey[700],
              }}
            >
              {docOrNote.doc?.title}
            </Typography>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Typography
              variant="body2"
              style={{ fontStyle: "italic", marginLeft: 28 }}
            >
              {docOrNote.description}
            </Typography>
            <Typography variant="body2">
              {format(docOrNote.updatedAt)}
            </Typography>
          </Flex>
        </FlexCol>
      )}
      {"title" in docOrNote && (
        <FlexCol style={{ gap: 4 }} width="100%">
          <Flex justifyContent="space-between" width="100%">
            <Flex style={{ gap: 8 }}>
              <MdInsertDriveFile fontSize={24} />
              <Typography>{docOrNote.title}</Typography>
            </Flex>
            <Typography variant="body2">
              {format(docOrNote.updatedAt)}
            </Typography>
          </Flex>
        </FlexCol>
      )}
    </FlexVCenter>
  )
}

export default NotesSearchBarOption
