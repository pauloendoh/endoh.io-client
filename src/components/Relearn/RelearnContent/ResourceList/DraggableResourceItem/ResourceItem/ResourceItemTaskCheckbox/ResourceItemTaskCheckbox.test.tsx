import { render, screen } from "@testing-library/react"
import { buildResourceDto } from "types/domain/relearn/ResourceDto"
import TestWrapper from "utils/TestWrapper"
import { describe, expect, it } from "vitest"
import ResourceItemTaskCheckbox from "./ResourceItemTaskCheckbox"

describe(`<{ResourceItemTaskCheckbox/> component`, () => {
  describe("When checkbox has no completedAt", () => {
    it("should show 'Complete this task' message", async () => {
      render(
        <TestWrapper>
          <ResourceItemTaskCheckbox
            resource={buildResourceDto()}
            onChange={() => null}
          />
        </TestWrapper>
      )

      expect(await screen.findByText("Complete this task"))
    })
  })

  describe("When checkbox has completedAt", () => {
    it("should show 'Uncomplete this task' message", async () => {
      render(
        <TestWrapper>
          <ResourceItemTaskCheckbox
            resource={buildResourceDto({
              completedAt: new Date().toISOString(),
            })}
            onChange={() => null}
          />
        </TestWrapper>
      )

      expect(await screen.findByText("Uncomplete this task"))
    })
  })
})
