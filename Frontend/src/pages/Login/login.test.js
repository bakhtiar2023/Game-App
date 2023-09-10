import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByTestId,
  act,
} from "@testing-library/react";
import { wait } from "@testing-library/user-event/dist/utils";
import Login from "./Login";

import { store } from "../../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios", () => ({
  post: jest.fn((_url, _body) => {
    return new Promise((resolve) => {
      url = _url;
      body = _body;
      resolve(true);
    });
  }),
}));

// });
describe("Login page testing", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
    localStorage.clear();
  });
  test("should render Login page", () => {
    // render login page

    const signinText = screen.getAllByText("Sign In");
    const usernameText = screen.getByLabelText(/Username/i);
    const passwordText = screen.getByLabelText(/Password/i);
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const loginButton = screen.getByRole("button", { name: "Sign In" });
    const passwordInput = screen
      .getByRole("textbox")
      .getAttribute("type", "password");
    expect(signinText).toBeInTheDocument;
    expect(usernameText).toBeInTheDocument;
    expect(passwordText).toBeInTheDocument;
    expect(usernameInput).toBeInTheDocument;
    expect(passwordInput).toBeInTheDocument;
    expect(loginButton).toBeInTheDocument;
  });
  test("should show validation on blur", async () => {
    await act(async () => {
      fireEvent.blur(screen.getByLabelText(/Username/i));
      fireEvent.blur(screen.getByLabelText(/Password/i));
    });

    await wait(() => {
      expect(
        getByTestId("errorUsername").toHaveTextContent(
          "username should not empty"
        )
      );
      expect(
        getByTestId("errorUsername").toHaveTextContent(
          "username too short, min 3 character"
        )
      );
      expect(
        getByTestId("errorUsername").toHaveTextContent(
          "username too long, max 10 character"
        )
      );
      expect(
        getByTestId("errorPassword").toHaveTextContent(
          "password should not empty"
        )
      );
      expect(
        getByTestId("errorPassword").toHaveTextContent(
          "password too short, min 6 character"
        )
      );
    });
  });
  test("should submit when datas login request are valid", async () => {
    const loginButton = await screen.findByRole("button", {
      name: "Sign In",
      hidden: true,
    });
    const request = {
      data: [{ username: "kecombrang", password: "Inipassword1" }],
    };
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Username/i), {
        target: { value: request.data[0].username },
      });
      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: request.data[0].password },
      });
      fireEvent.click(loginButton);
    });
    axios.post.mockResolvedValue({
      request,
    });
    screen.debug();
    expect(axios.post).toHaveBeenCalled();
  });
  // test("should check local storage when login success", async () => {
  //   const loginButton = await screen.findByRole("button", {
  //     name: "Sign In",
  //     hidden: true,
  //   });
  //   fireEvent.click(loginButton);
  //   Storage.prototype.setItem = jest.fn();
  //   jest.spyOn(localStorage, "setItem");

  //   expect(localStorage.setItem).toBeCalled();
  // });
});
