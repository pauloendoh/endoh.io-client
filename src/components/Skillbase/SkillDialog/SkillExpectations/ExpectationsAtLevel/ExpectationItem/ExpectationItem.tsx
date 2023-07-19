import { Box, Checkbox, IconButton, Tooltip, useTheme } from "@mui/material"
import Txt from "components/_UI/Text/Txt"
import MyReactLinkify from "components/_UI/link/MyReactLinkify"
import React, { useEffect, useMemo, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { FaFire } from "react-icons/fa"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import { SkillExpectationDto } from "../../../../../../types/domain/skillbase/SkillExpectationDto"
import ExpectationTextarea from "../ExpectationTextarea/ExpectationTextarea"
import changeExpectationPosition from "./utils/changeExpectationPosition"

interface Props {
  expectations: SkillExpectationDto[]
  level: number
  disabled?: boolean
  onChangeExpectations: (expectations: SkillExpectationDto[]) => void

  expectation: SkillExpectationDto
  index: number

  editingIndex: number | null
  setEditingIndex: (index: number | null) => void
}

const ExpectationItem = ({
  expectation,
  index,
  editingIndex,
  setEditingIndex,
  ...props
}: Props) => {
  const theme = useTheme()

  const [
    setDraggingExpectation,
    storedDraggingExpectation,
    setIsEditingRoadmapItem,
  ] = useSkillbaseStore((s) => [
    s.setDraggingExpectation,
    s.draggingExpectation,
    s.setIsEditingRoadmapItem,
  ])

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

  const editOrRemoveDescription = (index: number, newDescription: string) => {
    // remove
    if (newDescription.trim().length === 0) {
      changeExpectations(
        props.expectations.filter((e) => {
          if (e.index === index && e.level === props.level) return false
          return true
        })
      )

      return
    }

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

  const toggleCurrentGoal = (level: number, index: number) => {
    let expectation = [...props.expectations].find(
      (e) => e.level === level && e.index === index
    )

    if (!expectation) return // very unlikely to happen

    // remove current goal from everyone
    let expectations = [...props.expectations].map((e) => ({
      ...e,
      isCurrentGoal: false,
    }))

    if (!expectation.isCurrentGoal) {
      expectation = expectations.find(
        (e) => e.level === level && e.index === index
      )
      if (expectation) {
        expectation.isCurrentGoal = true
      }
    }

    props.onChangeExpectations(expectations)
  }

  const [{ isDragging: localIsDragging }, dragExpectationRef] = useDrag({
    type: "dnd-expectation",
    item: expectation,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      setDraggingExpectation(null)
    },
  })

  useEffect(() => {
    if (localIsDragging) setDraggingExpectation(expectation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localIsDragging])

  const isDragging = useMemo(() => {
    return (
      (storedDraggingExpectation?.id || 0) +
        (storedDraggingExpectation?.randomId || 0) ===
      (expectation.id || 0) + (expectation.randomId || 0)
    )
  }, [storedDraggingExpectation, expectation])

  const [, dropExpectationRef] = useDrop<SkillExpectationDto, unknown, unknown>(
    {
      accept: "dnd-expectation",
      hover(fromExpectation, monitor) {
        const toExpectation = expectation
        if (
          fromExpectation.level === toExpectation.level &&
          fromExpectation.index === toExpectation.index
        )
          return

        const targetSize = htmlDropRef.current?.getBoundingClientRect()
        const targetCenterY =
          (Number(targetSize?.bottom) - Number(targetSize?.top)) / 2

        const cursorCoord = monitor.getClientOffset()
        const cursorYInTarget = Number(cursorCoord?.y) - Number(targetSize?.top)

        // some utility booleans
        const areSameLevel = fromExpectation.level === toExpectation.level
        const areDifferentLevels = !areSameLevel
        const cursorIsBefore = cursorYInTarget < targetCenterY
        const cursorIsAfter = cursorYInTarget > targetCenterY

        // if you try to drop the first before the second
        if (
          areSameLevel &&
          fromExpectation.index < toExpectation.index &&
          cursorIsBefore
        )
          return

        // if you try to drop the second after the first
        if (
          areSameLevel &&
          fromExpectation.index > toExpectation.index &&
          cursorIsAfter
        )
          return

        // eg: drag one item to another level
        const toIndexAfter =
          areDifferentLevels && cursorIsAfter
            ? toExpectation.index + 1
            : undefined

        if (toIndexAfter) toExpectation.index = toIndexAfter

        const newExpectations = changeExpectationPosition(
          props.expectations,
          fromExpectation,
          toExpectation
        )

        props.onChangeExpectations(newExpectations)

        // required to avoid multiple events
        fromExpectation.index = toExpectation.index
        fromExpectation.level = toExpectation.level
      },
    }
  )

  const htmlDragRef = useRef<HTMLDivElement>(null)
  dragExpectationRef(htmlDragRef)

  const htmlDropRef = useRef<HTMLDivElement>(null)
  dropExpectationRef(htmlDropRef)

  return (
    <div
      style={{
        display: "flex",
        background: isDragging ? "#4d4d4d" : undefined,
        borderRadius: 4,
      }}
      key={index}
      title={
        props.disabled ? "This is not your item. You can’t change it." : ""
      }
      ref={htmlDropRef}
    >
      {/* box is required so checkbox doesn't get vertically centralized */}
      <Box>
        <Checkbox
          disabled={props.disabled}
          onChange={(event) => handleCheck(event, expectation)}
          checked={expectation.checked}
          color="primary"
        />
      </Box>

      <Box position="relative" style={{ flexGrow: 1 }}>
        {editingIndex === index ? (
          <ExpectationTextarea
            initialValue={expectation.description}
            onChange={(newDescription) => {
              if (
                newDescription !== expectation.description ||
                newDescription.length === 0
              )
                editOrRemoveDescription(index, newDescription)

              setIsEditingRoadmapItem(false)

              setEditingIndex(-1)
            }}
          />
        ) : (
          <div
            ref={htmlDragRef}
            style={{
              cursor: props.disabled ? "default" : "pointer",
              paddingTop: theme.spacing(1),
            }}
            onClick={() => {
              if (!props.disabled) {
                setIsEditingRoadmapItem(true)

                setEditingIndex(index)
              }
            }}
          >
            <Txt>
              {expectation.checked && !props.disabled ? (
                <s>
                  <MyReactLinkify openNewTab>
                    {expectation.description}
                  </MyReactLinkify>
                </s>
              ) : (
                <MyReactLinkify openNewTab>
                  {expectation.description}{" "}
                </MyReactLinkify>
              )}
            </Txt>
          </div>
        )}
      </Box>

      <Tooltip title="Current goal ━ this is not your end goal, but your next checkpoint.">
        <IconButton
          onClick={() => toggleCurrentGoal(props.level, expectation.index)}
          size="small"
          style={{ width: 36, height: 36 }}
        >
          <FaFire
            style={{
              color: expectation.isCurrentGoal
                ? theme.palette.secondary.main
                : "#989898",
            }}
          />
        </IconButton>
      </Tooltip>
    </div>
  )
}

const filterAndSortExpectations = (
  expectations: SkillExpectationDto[],
  level: number
) => {
  if (!expectations) return []
  return expectations
    .filter((expectation) => expectation.level === level)
    .sort((a, b) => {
      if (a.index > b.index) return 1
      if (a.index < b.index) return -1
      return 0
    })
}

export default ExpectationItem
