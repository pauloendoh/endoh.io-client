import { Button, useTheme } from "@mui/material"
import DarkButton from "components/_UI/Buttons/DarkButton/DarkButton"
import Flex from "components/_UI/Flexboxes/Flex"
import Txt from "components/_UI/Text/Txt"
import { useMemo } from "react"
import { MdAdd } from "react-icons/md"
import { SkillDto } from "types/domain/skillbase/SkillDto"

interface Props {
  skill: SkillDto
  onOpenLabelsDialog: () => void
}

// PE 1/3 - improve this name lmao
const SkillDialogLabels = (props: Props) => {
  const theme = useTheme()

  const sortedLabels = useMemo(() => {
    if (!props.skill) return []
    return (
      props.skill.labels?.sort((a, b) =>
        Number(a.id) > Number(b.id) ? 1 : -1
      ) || []
    )
  }, [JSON.stringify(props.skill)])

  return (
    <Flex mt={2} style={{ flexDirection: "column" }}>
      <Txt variant="h6">Labels</Txt>
      <Flex style={{ gap: theme.spacing(1), flexWrap: "wrap" }}>
        {sortedLabels.map((label) => (
          <Button
            key={label.id}
            variant="contained"
            style={{ backgroundColor: label.bgColor, minHeight: 32 }}
            onClick={props.onOpenLabelsDialog}
          >
            <Txt style={{ fontWeight: "bold", color: "white" }}>
              {label.name}
            </Txt>
          </Button>
        ))}

        <DarkButton
          onClick={props.onOpenLabelsDialog}
          style={{ minWidth: 0, width: 32, minHeight: 32 }}
        >
          <MdAdd />
        </DarkButton>
      </Flex>
    </Flex>
  )
}

export default SkillDialogLabels
