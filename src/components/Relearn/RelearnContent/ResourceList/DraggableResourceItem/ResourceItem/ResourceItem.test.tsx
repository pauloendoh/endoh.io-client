import { render, screen } from "@testing-library/react"
import { newResourceDto } from "types/domain/relearn/ResourceDto"
import TestWrapper from "utils/TestWrapper"
import { describe, expect, it } from "vitest"
import ResourceItem from "./ResourceItem"

describe(`<{ResourceItem/> component`, () => {
  describe("When resource has no URL", () => {
    it("Should render a checkbox", async () => {
      render(
        <TestWrapper>
          <ResourceItem resource={newResourceDto()} />
        </TestWrapper>
      )

      expect(await screen.findByText("Complete this task"))
    })

    describe("When unchecked checkbox is clicked", () => {
      it.skip("Should receive 'Task completed' if the request succeeds", async () => {
        render(
          <TestWrapper>
            <ResourceItem resource={newResourceDto()} />
          </TestWrapper>
        )

        const checkboxLabel = await screen.findByText("Complete this task")

        checkboxLabel.click()

        screen.logTestingPlaygroundURL()
        expect(
          await screen.findByText("Task completed!", undefined, {
            timeout: 5000,
          })
        )
      })
    })

    describe("When checked checkbox is clicked", () => {
      it.skip("Should receive 'Task uncompleted' message if the request succeeds", async () => {
        render(
          <TestWrapper>
            <ResourceItem
              resource={newResourceDto({
                completedAt: new Date().toISOString(),
              })}
            />
          </TestWrapper>
        )

        const checkboxLabel = await screen.findByText("Uncomplete this task")
        screen.logTestingPlaygroundURL()
        checkboxLabel.click()

        expect(
          await screen.findByText("Task uncompleted!", undefined, {
            timeout: 5000,
          })
        )
      })
    })
  })
})
