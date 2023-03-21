import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { Box } from "@mui/material"
import { useMemo } from "react"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import { SkillDto } from "../../../types/domain/skillbase/SkillDto"
import Flex from "../../_UI/Flexboxes/Flex"
import S from "./SkillChip.styles"

interface Props {
  skill: SkillDto
}

function SkillChip(props: Props) {
  const { setEditingSkill } = useSkillbaseStore()

  const currentGoalLevel = useMemo(() => {
    const foundSkill = props.skill.expectations.find((e) => e.isCurrentGoal)
    if (!foundSkill) return 0
    return foundSkill.level
  }, [props.skill.expectations])

  return (
    <S.SkillButton
      key={props.skill.id}
      variant="outlined"
      size="small"
      onClick={() => {
        setEditingSkill(props.skill)
      }}
      color="inherit"
    >
      <Flex>
        <Box>{props.skill.name}</Box>

        {(props.skill.currentLevel || currentGoalLevel) && (
          <S.InnerChip ml={1}>
            {/* only has current level */}
            {props.skill.currentLevel &&
              !currentGoalLevel &&
              props.skill.currentLevel}

            {/* only has currentGoalLevel */}
            {!props.skill.currentLevel && currentGoalLevel && (
              <>
                ?<ArrowRightAltIcon />
                {currentGoalLevel}
              </>
            )}

            {/* has both */}
            {props.skill.currentLevel && currentGoalLevel && (
              <>
                {props.skill.currentLevel}
                <ArrowRightAltIcon />
                {currentGoalLevel}
              </>
            )}
          </S.InnerChip>
        )}
      </Flex>
    </S.SkillButton>
  )
}

export default SkillChip
