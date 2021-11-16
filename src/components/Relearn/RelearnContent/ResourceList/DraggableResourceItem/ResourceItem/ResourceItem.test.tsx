import { render, screen } from "@testing-library/react";
import { newResourceDto } from "types/domain/relearn/ResourceDto";
import myAxios from "utils/consts/myAxios";
import TestWrapper from "utils/TestWrapper";
import ResourceItem from "./ResourceItem";
jest.mock("utils/consts/myAxios");

const mockedMyAxios = myAxios as jest.Mocked<typeof myAxios>;

describe(`<{ResourceItem/> component`, () => {
  describe("When resource has no URL", () => {
    it("Should render a checkbox", async () => {
      render(
        <TestWrapper>
          <ResourceItem resource={newResourceDto()} />
        </TestWrapper>
      );

      expect(await screen.findByText("Complete this task")).toBeInTheDocument();
    });

    describe("When unchecked checkbox is clicked", () => {
      it("Should receive 'Task completed' if the request succeeds", async () => {
        render(
          <TestWrapper>
            <ResourceItem resource={newResourceDto()} />
          </TestWrapper>
        );

        const checkboxLabel = await screen.findByText("Complete this task");
        mockedMyAxios.post.mockResolvedValueOnce([]);

        checkboxLabel.click();

        expect(await screen.findByText("Task completed!")).toBeInTheDocument();
      });
    });

    describe("When checked checkbox is clicked", () => {
      it("Should receive 'Task uncompleted' message if the request succeeds", async () => {
        render(
          <TestWrapper>
            <ResourceItem
              resource={newResourceDto({
                completedAt: new Date().toISOString(),
              })}
            />
          </TestWrapper>
        );

        const checkboxLabel = await screen.findByText("Uncomplete this task");
        mockedMyAxios.post.mockResolvedValueOnce([]);

        checkboxLabel.click();

        expect(
          await screen.findByText("Task uncompleted!")
        ).toBeInTheDocument();
      });
    });
  });
});
