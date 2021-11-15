import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import TestWrapper from "utils/TestWrapper";
import AuthFormWrapper from "./AuthFormWrapper";

describe(`<${AuthFormWrapper.name}/>`, () => {
  it("should render a 'SIGN IN' button", async () => {
    const dom = render(
      <TestWrapper>
        <AuthFormWrapper />
      </TestWrapper>
    );
    await waitFor(() => dom.getByText("SIGN IN"));
  });

  it("should render a 'SIGN UP' button when you click on 'sign up'", async () => {
    const dom = render(
      <TestWrapper>
        <AuthFormWrapper />
      </TestWrapper>
    );

    fireEvent.click(dom.getByText("Sign up"));
    await waitFor(() => dom.getByText("SIGN UP"));
  });
});
