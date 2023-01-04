import { Box, Container, Typography } from "@mui/material"
import { useMemo } from "react"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useAuthStore from "store/zustand/useAuthStore"
import Flex from "../../_UI/Flexboxes/Flex"
import DocMoreMenu from "./DocMoreMenu/DocMoreMenu"
import DocTable from "./DocTable/DocTable"

interface Props {
  docId: number
}

const QuestionsContent = (props: Props) => {
  const [docs] = useDocsStore((s) => [s.docs])

  const currentDoc = useMemo(() => docs.find((doc) => doc.id === props.docId), [
    docs,
    props.docId,
  ])

  const authUser = useAuthStore((s) => s.authUser)

  return (
    <Container>
      {/* Header */}
      <Flex justifyContent="space-between">
        <Typography variant="h4">{currentDoc.title}</Typography>
        <Box>
          <DocMoreMenu doc={currentDoc} afterDelete={() => {}} />
        </Box>
      </Flex>

      <Box mt={3}></Box>

      <Box mt={3}>
        {/* <DocTableVirtuoso docId={props.docId} /> */}
        <DocTable docId={props.docId} />

        {/* {authUser?.isAdmin ? (
          <QuestionsTable docId={props.docId} />
        ) : (
          <DocTable docId={props.docId} />
        )} */}
      </Box>
    </Container>
  )
}

export default QuestionsContent
