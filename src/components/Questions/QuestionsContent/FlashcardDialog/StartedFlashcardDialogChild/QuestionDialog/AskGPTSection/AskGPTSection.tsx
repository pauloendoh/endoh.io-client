import { Box, Skeleton, Typography } from "@mui/material"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useAskGptQuery } from "hooks/react-query/search/useAskGptQuery"
import { useEffect, useState } from "react"
import { MdOutlineWorkspacePremium } from "react-icons/md"

type Props = {
  question: string
}

export const AskGPTSection = ({ ...props }: Props) => {
  const [localQuestion, setLocalQuestion] = useState("")

  const { data, isFetching, refetch } = useAskGptQuery(localQuestion, {
    disable: true,
  })

  useEffect(() => {
    if (!!localQuestion && !isFetching) {
      setLocalQuestion(props.question)
      refetch()
    }
  }, [localQuestion])

  return (
    <FlexCol className={`AskGPTSection`} gap={2}>
      <FlexVCenter
        gap={0.5}
        sx={{
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        onClick={() => {
          if (props.question && !isFetching) {
            setLocalQuestion(props.question)
          }
        }}
      >
        <MdOutlineWorkspacePremium fontSize={20} />
        <Typography>Ask ChatGPT</Typography>
      </FlexVCenter>
      <Box>
        {isFetching && (
          <FlexCol gap={1}>
            <Skeleton variant="rectangular" height={24} />
            <Skeleton variant="rectangular" height={240} />
          </FlexCol>
        )}
        {!isFetching && !!data && (
          <FlexCol
            gap={0.5}
            sx={{
              fontStyle: "italic",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {props.question}
            </Typography>
            <Typography
              sx={{
                whiteSpace: "pre-line",
              }}
            >
              {data?.answer}
            </Typography>
          </FlexCol>
        )}
      </Box>
    </FlexCol>
  )
}
