import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ClosedRoom from "../ClosedRoom";
import "@testing-library/jest-dom";

describe("Testing for closed room component", () => {
  let state = {
    value: {
      player1Choice: "scissors",
      player1Id: 6,
      player1Name: "bakhtiar",
      player1Status: "lose",
      player2Choice: "rock",
      player2Id: 1,
      player2Name: "achmad",
      player2Status: "win",
      roomId: 2,
      roomName: "Nomads",
    },
  };
  // render component each testing
  beforeEach(() => {
    render(<ClosedRoom name={state} />);
  });
  test("should display player 1 name", () => {
    const player1Name = screen.getByText("bakhtiar");
    expect(player1Name).toBeInTheDocument();
  });
  test("should display player 2 name", () => {
    const player2Name = screen.getByText("achmad");
    expect(player2Name).toBeInTheDocument();
  });
  test("should display who win the game", () => {
    const result = screen.getByText("achmad WIN");
    expect(result).toBeInTheDocument();
  });
});
