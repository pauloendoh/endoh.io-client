import { Box, Button, Checkbox, Typography, useTheme } from "@material-ui/core"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Element } from "react-scroll"
import { Dispatch } from "redux"
import Flex from "../../../../../components/shared/Flexboxes/Flex"
import {
  createSkillExpectation,
  SkillExpectationDto,
} from "../../../../../dtos/skillbase/SkillExpectationDto"
import { ApplicationState } from "../../../../../store/store"
import ExpectationTextarea from "./ExpectationTextarea/ExpectationTextarea"

const ExpectationsAtLevel = (props: Props) => {
  const theme = useTheme()
  const [editingIndex, setEditingIndex] = useState<number>(null)

  const handleAddExpectation = () => {
    const newExpectation = createSkillExpectation(
      props.level,
      props.expectations.filter((e) => e.level === props.level).length
    )

    const expectations = [...props.expectations]
    expectations.push(newExpectation)

    setEditingIndex(newExpectation.index)
    changeExpectations(expectations)
  }

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    expectation: SkillExpectationDto
  ) => {
    changeExpectations(
      props.expectations.map((e) => {
        if (e.index === expectation.index && e.level === expectation.level) {
          e.checked = event.target.checked
        }
        return e
      })
    )
  }

  const editDescription = (index: number, newDescription: string) => {
    // remove
    if (newDescription.trim().length === 0) {
      changeExpectations(
        props.expectations.filter((e) => {
          if (e.index === index && e.level === props.level) return false
          return true
        })
      )
    } else {
      // update
      changeExpectations(
        props.expectations.map((e) => {
          if (e.index === index && e.level === props.level) {
            e.description = newDescription
          }
          return e
        })
      )
    }
  }

  const changeExpectations = (expectations: SkillExpectationDto[]) => {
    const otherLevelsExpectations = expectations.filter(
      (e) => e.level !== props.level
    )

    // Fixing this level's indexes
    const thisLevelExpectation = filterAndSortExpectations(
      expectations,
      props.level
    ).map((exp, index) => ({ ...exp, index }))

    props.onChangeExpectations([
      ...otherLevelsExpectations,
      ...thisLevelExpectation,
    ])
  }

  return (
    <Box mt={3}>
      <Element name={`expectation-title-${props.level}`} />
      <Typography
        style={{ color: props.isHighlighted ? "#ffb400" : "inherit" }}
      >
        <b>
          {props.level} - {getLevelDescription(props.level)}
        </b>
      </Typography>

      {filterAndSortExpectations(props.expectations, props.level).map(
        (expectation, i) => (
          <Flex key={i}>
            <Box>
              <Checkbox
                onChange={(event) => handleCheck(event, expectation)}
                checked={expectation.checked}
                color="primary"
              />
            </Box>

            <Box width="100%" position="relative">
              {editingIndex === i ? (
                <ExpectationTextarea
                  initialValue={expectation.description}
                  onSave={(newDescription) => {
                    editDescription(i, newDescription)
                    setEditingIndex(null)
                  }}
                />
              ) : (
                <Box
                  pt={1}
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditingIndex(i)}
                >
                  <Typography>
                    {expectation.checked ? (
                      <s>{expectation.description}</s>
                    ) : (
                      expectation.description
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
          </Flex>
        )
      )}

      <Box mt={0.5} ml={1}>
        {editingIndex === null && (
          <Button
            onClick={handleAddExpectation}
            size="small"
            style={{
              background: theme.palette.grey[800],
              fontWeight: "normal",
            }}
          >
            Add Expectation
          </Button>
        )}
      </Box>
    </Box>
  )
}

const filterAndSortExpectations = (
  expectations: SkillExpectationDto[],
  level: number
) => {
  return expectations
    .filter((expectation) => expectation.level === level)
    .sort((a, b) => {
      if (a.index > b.index) return 1
      if (a.index < b.index) return -1
      return 0
    })
}

const getLevelDescription = (level: number) => {
  switch (level) {
    case 1:
      return "Basic I"
    case 2:
      return "Basic II"
    case 3:
      return "Basic III"
    case 4:
      return "Intermediary I"
    case 5:
      return "Intermediary II"
    case 6:
      return "Intermediary III"
    case 7:
      return "Advanced I"
    case 8:
      return "Advanced II"
    case 9:
      return "Advanced III"
    case 10:
      return "God Tier"
  }
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  expectations: SkillExpectationDto[]
  level: number
  isHighlighted: boolean
  onChangeExpectations: (expectations: SkillExpectationDto[]) => void
}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(ExpectationsAtLevel)
