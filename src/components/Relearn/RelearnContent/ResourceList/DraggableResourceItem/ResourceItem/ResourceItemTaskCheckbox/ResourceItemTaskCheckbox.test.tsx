import { render, screen } from "@testing-library/react";
import { newResourceDto } from "types/domain/relearn/ResourceDto";
import TestWrapper from "utils/TestWrapper";
import ResourceItemTaskCheckbox from "./ResourceItemTaskCheckbox";

describe(`<{ResourceItemTaskCheckbox/> component`, () => {
  describe("When checkbox has no completedAt", () => {
    it("should show 'Complete this task' message", async () => {
      render(
        <TestWrapper>
          <ResourceItemTaskCheckbox
            resource={newResourceDto()}
            onChange={() => null}
          />
        </TestWrapper>
      );

      expect(await screen.findByText("Complete this task")).toBeInTheDocument();
    });
  });

  describe("When checkbox has completedAt", () => {
    it("should show 'Uncomplete this task' message", async () => {
      render(
        <TestWrapper>
          <ResourceItemTaskCheckbox
            resource={newResourceDto({ completedAt: new Date().toISOString() })}
            onChange={() => null}
          />
        </TestWrapper>
      );

      expect(
        await screen.findByText("Uncomplete this task")
      ).toBeInTheDocument();
    });
  });
});
