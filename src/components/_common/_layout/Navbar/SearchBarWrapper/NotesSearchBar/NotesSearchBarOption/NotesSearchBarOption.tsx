import NotesIcon from "@mui/icons-material/Notes"

import { Typography, useTheme } from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import { MdInsertDriveFile } from "react-icons/md"
import { Link, useHistory } from "react-router-dom"
import { format } from "timeago.js"
import { DocDto } from "types/domain/questions/DocDto"
import { NoteDto } from "types/domain/questions/NoteDto"
import { urls } from "utils/urls"

type Props = {
  docOrNote: NoteDto | DocDto
  onClickQuestion: () => void
  liProps: React.HTMLAttributes<HTMLLIElement>
  onClickDoc: (e: React.MouseEvent) => void
}

const NotesSearchBarOption = ({
  docOrNote,
  onClickQuestion,
  liProps,
  ...props
}: Props) => {
  const theme = useTheme()
  const history = useHistory()

  return (
    <li
      {...liProps}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: 24,
      }}
      onClick={(e) => {
        if ("title" in docOrNote) {
          history.push(urls.pages.questionsDoc(docOrNote.id))
          props.onClickDoc(e)
          return
        }
        onClickQuestion()
      }}
    >
      {"question" in docOrNote && (
        <FlexCol style={{ gap: 4 }} width="100%">
          <Flex justifyContent="space-between" width="100%">
            <Flex style={{ gap: 8 }}>
              <NotesIcon />
              <Typography>{docOrNote.question}</Typography>
            </Flex>

            {docOrNote.doc?.title && (
              <Link
                to={urls.pages.questionsDoc(docOrNote.doc.id)}
                onClick={(e) => {
                  e.stopPropagation()
                  props.onClickDoc(e)
                }}
                style={{ color: "inherit", textDecoration: "none" }}
              >
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
              </Link>
            )}
          </Flex>
          <Flex
            justifyContent="space-between"
            width="100%"
            alignItems="flex-end"
          >
            <Typography
              variant="body2"
              style={{ fontStyle: "italic", marginLeft: 28 }}
            >
              {docOrNote.description}
            </Typography>
            <Typography variant="body2" minWidth={100}>
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
    </li>
  )
}

export default NotesSearchBarOption
