import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../store/store";
import LandingPageForm from "./LandingPageForm";

describe("<AuthForm/>", () => {
  it("should render a 'SIGN IN' button", async () => {
    const dom = render(
      <Provider store={store}>
        <BrowserRouter>
          <LandingPageForm />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => dom.getByText('SIGN IN'));
  });

  it("should render a 'SIGN UP' button when you click on 'sign up'", async () => {
    const dom = render(
      <Provider store={store}>
        <BrowserRouter>
          <LandingPageForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(dom.getByText('Sign up'))
    await waitFor(() => dom.getByText('SIGN UP'));
  });
});
