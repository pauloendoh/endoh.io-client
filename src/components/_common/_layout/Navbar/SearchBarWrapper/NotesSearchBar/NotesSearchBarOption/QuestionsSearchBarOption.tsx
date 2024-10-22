import NotesIcon from "@mui/icons-material/Notes"

import { Typography, useTheme } from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import { useMemo } from "react"
import { MdInsertDriveFile } from "react-icons/md"
import { Link, useHistory } from "react-router-dom"
import { format } from "timeago.js"
import { DocDto } from "types/domain/questions/DocDto"
import { QuestionDto } from "types/domain/questions/QuestionDto"
import { urls } from "utils/urls"

type Props = {
  docOrQuestion: QuestionDto | DocDto
  onClickQuestion: () => void
  liProps: React.HTMLAttributes<HTMLLIElement>
  onClickDoc: (e: React.MouseEvent) => void
}

const QuestionsSearchBarOption = ({
  docOrQuestion,
  onClickQuestion,
  liProps,
  ...props
}: Props) => {
  const theme = useTheme()
  const history = useHistory()

  const backgroundColor = useMemo(() => {
    return "toRefine" in docOrQuestion &&
      (docOrQuestion.toRefine ||
        (docOrQuestion.question.length > 0 &&
          docOrQuestion.description.length === 0))
      ? "#6e4747"
      : undefined
  }, [docOrQuestion])

  return (
    <li
      {...liProps}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: 24,
        backgroundColor,
      }}
      onClick={(e) => {
        if ("title" in docOrQuestion) {
          history.push(urls.pages.questionsDeck(docOrQuestion.id))
          props.onClickDoc(e)
          return
        }
        onClickQuestion()
      }}
    >
      {"question" in docOrQuestion && (
        <FlexCol style={{ gap: 4 }} width="100%">
          <Flex justifyContent="space-between" width="100%">
            <Flex style={{ gap: 8 }}>
              <NotesIcon />
              <Typography>{docOrQuestion.question}</Typography>
            </Flex>

            {docOrQuestion.doc?.title && (
              <Link
                to={urls.pages.questionsDeck(docOrQuestion.doc.id)}
                onClick={(e) => {
                  e.stopPropagation()
                  props.onClickDoc(e)
                }}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography
                  noWrap
                  title={docOrQuestion.doc?.title}
                  display="inline"
                  style={{
                    width: 120,
                    padding: "2px 8px 2px 8px",
                    borderRadius: 2,
                    height: "fit-content",
                    background: theme.palette.grey[700],
                  }}
                >
                  {docOrQuestion.doc?.title}
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
              {docOrQuestion.description}
            </Typography>
            <Typography variant="body2" minWidth={100}>
              {format(docOrQuestion.updatedAt)}
            </Typography>
          </Flex>
        </FlexCol>
      )}
      {"title" in docOrQuestion && (
        <FlexCol style={{ gap: 4 }} width="100%">
          <Flex justifyContent="space-between" width="100%">
            <Flex style={{ gap: 8 }}>
              <MdInsertDriveFile fontSize={24} />
              <Typography>{docOrQuestion.title}</Typography>
            </Flex>
            <Typography variant="body2">
              {format(docOrQuestion.updatedAt)}
            </Typography>
          </Flex>
        </FlexCol>
      )}
    </li>
  )
}

export default QuestionsSearchBarOption
