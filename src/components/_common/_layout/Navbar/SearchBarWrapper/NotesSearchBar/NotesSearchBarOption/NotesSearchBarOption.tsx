import NotesIcon from "@material-ui/icons/Notes"

import { Typography, useTheme } from "@material-ui/core"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useLocation } from "react-router-dom"
import { NoteDto } from "types/domain/define/NoteDto"

type Props = {
  note: NoteDto
  handleClick: () => void
}

const NotesSearchBarOption = ({ note, handleClick }: Props) => {
  const theme = useTheme()

  const location = useLocation()

  return (
    <FlexVCenter
      style={{
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: 8,
      }}
      onClick={handleClick}
      height="100%"
      // onMouseDown={(e) => {
      //   if (e.button === 1)
      //     window
      //       .open(
      //         urls.pages.openResourceId(resource.id, location.pathname),
      //         "_blank"
      //       )
      //       .focus()
      // }}
    >
      <FlexCol style={{ gap: 4 }} width="100%">
        <Flex justifyContent="space-between" width="100%">
          <Flex style={{ gap: 8 }}>
            <NotesIcon />
            <Typography>{note.question}</Typography>
          </Flex>
          <Typography
            noWrap
            title={note.doc?.title}
            display="inline"
            style={{
              width: 120,
              padding: "2px 8px 2px 8px",
              borderRadius: 2,
              height: "fit-content",
              background: theme.palette.grey[700],
            }}
          >
            {note.doc?.title}
          </Typography>
        </Flex>
        <Typography
          variant="body2"
          style={{ fontStyle: "italic", marginLeft: 28 }}
        >
          {note.description}
        </Typography>
      </FlexCol>
    </FlexVCenter>
  )
}

export default NotesSearchBarOption
