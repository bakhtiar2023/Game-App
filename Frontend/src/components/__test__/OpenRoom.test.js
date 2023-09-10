import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OpenRoom from "../OpenRoom";
import "@testing-library/jest-dom";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
let url=''
let body={};
jest.mock("axios", () => ({
  put: jest.fn((_url, _body) => {
    return new Promise((resolve) => {
      url = _url;
      body = _body;
      resolve(true);
    });
  }),
}));
describe("Testing for closed room component", () => {
  let state = {
    value: {
      player1Choice: "scissors",
      player1Id: 6,
      player1Name: "bakhtiar",
      player1Status: undefined,
      player2Choice: null,
      player2Id: undefined,
      player2Name: undefined,
      player2Status: undefined,
      roomId: 2,
      roomName: "Nomads",
    },
  };
  // render component each testing
  beforeEach(() => {
    render(<OpenRoom name={state} />);
    window.alert = jest.fn();
  });
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks(); // Restore original implementations
  });
  test("should display player 1 name", () => {
    const player1Name = screen.getByText("bakhtiar");
    expect(player1Name).toBeInTheDocument();
  });

  // test("should submit player 2 choice", async () => {
  //   // const localStorageMock = {
  //   //   getItem: jest.fn(() => "SampleAccessToken"),
  //   // };
  //   // Object.defineProperty(window, "localStorage", { value: localStorageMock });
  //   const request = {
  //     data: [{ player2Id: 3, player2Choice: "rock", roomId: 9 }],
  //   };
  //   const rockImage = screen.getByTestId("rockplayer2");
  //   await act(async () => {
  //     fireEvent.click(rockImage);
  //   });
  //   axios.put.mockResolvedValue({
  //     request,
  //   });
  //   screen.debug();
  //   expect(axios.put).toHaveBeenCalled();
  // });
});
