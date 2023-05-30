import { Box, Container, Typography } from "@mui/material"
import { useMemo } from "react"
import useDocsStore from "store/zustand/domain/useDocsStore"
import Flex from "../../_UI/Flexboxes/Flex"
import DocMoreMenu from "./DocMoreMenu/DocMoreMenu"
import DocTable from "./DocTable/DocTable"

interface Props {
  docId: number
}

const QuestionsContent = (props: Props) => {
  const [docs] = useDocsStore((s) => [s.docs])

  const currentDoc = useMemo(
    () => docs.find((doc) => doc.id === props.docId),
    [docs, props.docId]
  )

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
        <DocTable docId={props.docId} />
      </Box>
    </Container>
  )
}

export default QuestionsContent
