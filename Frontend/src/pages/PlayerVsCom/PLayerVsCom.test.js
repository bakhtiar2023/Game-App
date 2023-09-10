import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PlayerVsCom from "./PlayerVsCom";
import axios from "axios"; // Import Axios

jest.mock("axios"); // Mock Axios

describe("PlayerVsCom component", () => {
  beforeEach(() => {
    // Mock localStorage getItem
    const getItemMock = jest.spyOn(Storage.prototype, "getItem");
    getItemMock.mockReturnValue("SampleAccessToken");
  });

  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks(); // Restore original implementations
  });

  test("displays 'Player' and 'COM' text", () => {
    render(
      <BrowserRouter>
        <PlayerVsCom />
      </BrowserRouter>
    );

    const playerText = screen.getByText("Player");
    const comText = screen.getByText("COM");
    const testText = screen.getByText("Choose your choice");

    expect(playerText).toBeInTheDocument();
    expect(comText).toBeInTheDocument();
    expect(testText).toBeInTheDocument();
  });


  test("Rock selection", () => {
    render(
      <BrowserRouter>
        <PlayerVsCom />
      </BrowserRouter>
    );

    const rockChoice = screen.getByAltText("rock-choice");

    fireEvent.click(rockChoice); // klik Batu
  });


  test("Paper selection", () => {
    render(
      <BrowserRouter>
        <PlayerVsCom />
      </BrowserRouter>
    );

    const paperChoice = screen.getByAltText("paper-choice");

    fireEvent.click(paperChoice); // Klik Kertas

  });

  test("Scissors selection", () => {
      render(
        <BrowserRouter>
          <PlayerVsCom />
        </BrowserRouter>
      );

      const paperChoice = screen.getByAltText("paper-choice");

      fireEvent.click(paperChoice); // klik Gunting
  });



 
});
