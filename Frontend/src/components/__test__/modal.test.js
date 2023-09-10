import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MyVerticallyCenteredModal from "../Modal";
import "@testing-library/jest-dom";

describe("Modal", () => {
  let modalShow = true;
  let file;

  describe("text test all text inside page", () => {
    beforeEach(() => {
      render(<MyVerticallyCenteredModal show={modalShow} />)
    });
    test("should get button Close", () => {
      const textButton = screen.getByText("Close");
      expect(textButton).toBeInTheDocument();
    });
    test("should get text Edit Profile Foto", () => {
      const textElement = screen.getByText("Edit Profile Foto");
      expect(textElement).toBeInTheDocument();
    });
    test("should get text Choose your profile foto", () => {
      const textElement = screen.getByText("Choose your profile foto");
      expect(textElement).toBeInTheDocument();
    });
    test("should get text button upload", () => {
      const textButton = screen.getByText("Upload");
      expect(textButton).toBeInTheDocument();
    });
    test("should get text input form file", () => {
      const textInput = screen.getByTestId("formFile");
      expect(textInput).toBeInTheDocument();
    });
  });
  describe("click test all button and input", () => {
    beforeEach(()=>{
      file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    })
    test("should called onHide2Mock 1 times", () => {
      const onHide2Mock = jest.fn();
      render(
        <MyVerticallyCenteredModal show={modalShow} onHide2={onHide2Mock} />
      );
      const button = screen.getByRole("content-closeButton");
      fireEvent.click(button);
      fireEvent.click(button);
      expect(onHide2Mock).toBeCalledTimes(2);
    });
    test("profile foto upload ", async () => {
      const { getByTestId } = render(
        <MyVerticallyCenteredModal show={modalShow} />
      );
      const uploader = getByTestId("formFile");
      await waitFor(() =>
        fireEvent.change(uploader, {
          target: { files: [file] },
        })
      );
      let image = document.getElementById("formFile");
      expect(image.files[0].name).toBe("chucknorris.png");
      expect(image.files.length).toBe(1);
    });
    test("click upload button ", async () => {
      const handleClickMock = jest.fn();
      const { getByTestId } = render(
        <MyVerticallyCenteredModal
          show={modalShow}
          handleclick={handleClickMock}
        />
      );
      const buttonUploader = getByTestId("uploadButton");
      fireEvent.click(buttonUploader);
      expect(handleClickMock).toBeCalledTimes(1);
    });
  });
});
