import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import extend-expect
import GameHistory from "./GameHistory";

test("renders game history table", async () => {
  // Mock localStorage.getItem() to return a sample token
  const localStorageMock = {
    getItem: jest.fn(() => "SampleAccessToken"),
  };
  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  render(<GameHistory />);

  // Use screen queries to find elements
  const titleElement = screen.getByText(/Game History/i);

  expect(titleElement).toBeInTheDocument(); // Use toBeInTheDocument()
});
