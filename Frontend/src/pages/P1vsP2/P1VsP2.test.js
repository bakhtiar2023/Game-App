import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import P1vsP2 from "./P1vsP2";
import "@testing-library/jest-dom";
describe("Testing for player vs player open room", () => {
  beforeEach(() => {
    // Mock localStorage getItem
    const getItemMock = jest.spyOn(Storage.prototype, "getItem");
    getItemMock.mockReturnValue("SampleAccessToken");
    // mock data from closed room;
    jest.mock("react-router-dom", () => {
      return {
        useLocation: () => {
            return {
              value:jest.fn()
            };
        },
      };
    });
    // render pages
    render(
      <BrowserRouter>
        <P1vsP2 />
      </BrowserRouter>
    );
  });
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks(); // Restore original implementations
  });
  describe("P1P2Closed when there is no data from lobby game", () => {
    test("should get text error 404", () => {
      const textElement = screen.getByText("Error 404");
      expect(textElement).toBeInTheDocument();
    });
    test("should get text You didnt break the internet", () => {
      const textElement = screen.getByText(
        "You didnt break the internet, but we cant find what you are looking for."
      );
      expect(textElement).toBeInTheDocument();
    });
    test("should get text You didnt break the internet", () => {
      const textLinkElement = screen.getByText("Go Back Home");
      fireEvent.click(textLinkElement);
      expect(window.location.pathname).toBe("/lobbygame");
    });
  });
});
