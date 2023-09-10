import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import LobbyGame from "./LobbyGame";
import { BrowserRouter } from "react-router-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";
import stones from "../../assets/images/batu.png"
import { act } from "react-dom/test-utils";
import { async } from "@firebase/util";

jest.mock("axios");
const server = setupServer(
  rest.get(
    "https://backend-team-1-five.vercel.app/profile",
    (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.status(200),
        ctx.json({
          fullname: "Bakhtiar A",
          address: "Aceh",
          phoneNumber: "08986923013",
          dateOfBirth: "13-12-1945",
          url: "https://example.com/profile.jpg",
          user: {
            userId: 1,
            username: "achmad",
          },
        })
      );
    }
  ),

  rest.post(
    "https://backend-team-1-five.vercel.app/all_rooms/1",
    async (req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.status(200),
        ctx.json([
          {
            roomId: 2,
            roomName: "Nomads",
            player1Id: 6,
            player1Choice: "scissors",
            player2Id: 1,
            player2Choice: "rock",
            resultGames: [
              {
                playerId: 1,
                status: "win",
                createdAt: "2023-06-25T12:55:04.045Z",
              },
              {
                playerId: 6,
                status: "lose",
                createdAt: "2023-06-25T12:54:57.626Z",
              },
            ],
            player1Games: {
              player1Id: 6,
              player1Name: "bakhtiar",
            },
            player2Games: {
              player2Id: 1,
              player2Name: "achmad",
            },
          },
          {
            roomId: 3,
            roomName: "Nomads 2",
            player1Id: 6,
            player1Choice: "scissors",
            player2Id: 1,
            player2Choice: "rock",
            resultGames: [
              {
                playerId: 1,
                status: "win",
                createdAt: "2023-06-25T14:54:16.558Z",
              },
              {
                playerId: 6,
                status: "lose",
                createdAt: "2023-06-25T14:54:16.429Z",
              },
            ],
            player1Games: {
              player1Id: 6,
              player1Name: "bakhtiar",
            },
            player2Games: {
              player2Id: 1,
              player2Name: "achmad",
            },
          },
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

jest.spyOn(global.localStorage, "getItem");
window.alert = jest.fn();
const path =
  "https://firebasestorage.googleapis.com/v0/b/team1-fsw-binar-wave31.appspot.com/o/assets%2Fpatrick.jpg?alt=media&token=2c435607-4181-4a13-8fc3-ec4b861280e4";

describe("test LobbyGame page", () => {
  describe("test without api", () => {
    beforeEach(()=>{
      render(
        <BrowserRouter>
          <LobbyGame />
        </BrowserRouter>
      );
    })
    test("should get link Player Vs Com", () => {
      const textLink = screen.getByText("Player Vs Com");
      expect(textLink).toBeInTheDocument();
    });
    test("should get link Create Room PVP", () => {
      const textLink = screen.getByText("Create Room PVP");
      expect(textLink).toBeInTheDocument();
    });
    test("should get text rooms :", () => {
      const textElement = screen.getByText("Rooms :");
      expect(textElement).toBeInTheDocument();
    });
    test("should get text Filter:", () => {
      const textElement = screen.getByText("Filter:");
      expect(textElement).toBeInTheDocument();
    });
    test("should get button Show All", () => {
      const textButton = screen.getByText("Show All");
      expect(textButton).toBeInTheDocument();
    });
    test("should get button Open", () => {
      const textButton = screen.getByText("Open");
      expect(textButton).toBeInTheDocument();
    });
    test("should get button Closed", () => {
      const textButton = screen.getByText("Closed");
      expect(textButton).toBeInTheDocument();
    });
    test("should get link &lt;&lt; Previous", () => {
      const textLink = screen.getByText("<< Previous");
      expect(textLink).toBeInTheDocument();
    });
    test("should get link Next &gt;&gt;", () => {
      const textLink = screen.getByText("Next >>");
      expect(textLink).toBeInTheDocument();
    });
    test("should get link Game History", () => {
      const textLink = screen.getByText("Game History");
      expect(textLink).toBeInTheDocument();
    });
    test("should get text Player Name", () => {
      const textElement = screen.getByText("Player Name");
      expect(textElement).toBeInTheDocument();
    });
    test("should get text Please input your biodata", () => {
      const textElement = screen.getByText("Please input your biodata");
      expect(textElement).toBeInTheDocument();
    });
    test("should get text Fullname:", () => {
      const textElement = screen.getByText("Fullname:");
      expect(textElement).toBeInTheDocument();
    });
    test("should get text Address:", () => {
      const textElement = screen.getByText("Address:");
      expect(textElement).toBeInTheDocument();
    });
    test("should get text Phone Number:", () => {
      const textElement = screen.getByText("Phone Number:");
      expect(textElement).toBeInTheDocument();
    });
    test("should get text Date of Birth:", () => {
      const textElement = screen.getByText("Date of Birth:");
      expect(textElement).toBeInTheDocument();
    });
    test("should get button update Biodata", () => {
      const textButton = screen.getByText("update Biodata");
      expect(textButton).toBeInTheDocument();
    });
    test("link pathname should redirect to /playervscom", async () => {
      const buttonPlayerVsCom = screen.getByRole("link", {
        name: "Player Vs Com",
      });
      expect(buttonPlayerVsCom).toBeInTheDocument();
      fireEvent.click(buttonPlayerVsCom);
      expect(window.location.pathname).toBe("/playervscom");
    });
    test("link pathname should redirect to /createRoom", async () => {
      const buttonPlayerVsCom = screen.getByRole("link", {
        name: "Create Room PVP",
      });
      expect(buttonPlayerVsCom).toBeInTheDocument();
      fireEvent.click(buttonPlayerVsCom);
      expect(window.location.pathname).toBe("/createRoom");
    });
    test("link pathname should redirect to /gamehistory", async () => {
      const buttonPlayerVsCom = screen.getByRole("link", {
        name: "Game History",
      });
      expect(buttonPlayerVsCom).toBeInTheDocument();
      fireEvent.click(buttonPlayerVsCom);
      expect(window.location.pathname).toBe("/gamehistory");
    });
  });

  describe("test LobbyGame page with mocked api get all rooms", () => {
    beforeEach(async () => {
      render(
        <BrowserRouter>
          <LobbyGame test={true} />
        </BrowserRouter>
      );
      await waitForElementToBeRemoved(() =>
        screen.getByRole("loadingRoomList")
      );
    });
    test("should get roomList and showed", () => {
      expect(screen.getByText("Room: Nomads")).toBeInTheDocument();
      expect(screen.getByText("Room: Nomads 2")).toBeInTheDocument();
    });
    test("button filter click", () => {
      fireEvent.click(screen.getByText("Show All"));
      fireEvent.click(screen.getByText("Open"))
      fireEvent.click(screen.getByText("Closed"))
      fireEvent.click(screen.getByText("<< Previous"))
      fireEvent.click(screen.getByText("Next >>"))
      fireEvent.click(screen.getByText("Show All"));
      fireEvent.click(screen.getByText("Open"))
      fireEvent.click(screen.getByText("Closed"))
      fireEvent.click(screen.getByText("<< Previous"))
      fireEvent.click(screen.getByText("Next >>"))
      fireEvent.click(screen.getByText("Show All"));
      fireEvent.click(screen.getByText("Open"))
      fireEvent.click(screen.getByText("Closed"))
      fireEvent.click(screen.getByText("<< Previous"))
      fireEvent.click(screen.getByText("Next >>"))
    });
    test("link pathname should redirect to /p1vsp2closed", () => {
      fireEvent.click(screen.getByText("Room: Nomads"));
      expect(window.location.pathname).toBe("/p1vsp2closed");
    });
  });

  describe("test LobbyGame page with mock api get biodata user", () => {
    beforeEach(async () => {
      render(
        <BrowserRouter>
          <LobbyGame test={true} />
        </BrowserRouter>
      );
      await waitForElementToBeRemoved(() => screen.getByRole("loadingBiodata"));
    });
    test("should get biodata user from mock api get biodata user", () => {
      expect(screen.getByText(`Fullname: Bakhtiar A`)).toBeInTheDocument();
      expect(screen.getByText(`Address: Aceh`)).toBeInTheDocument();
      expect(screen.getByText(`Phone: 08986923013`)).toBeInTheDocument();
      expect(screen.getByText(`Date of Birth: 13-12-1945`)).toBeInTheDocument();
    });
    test("should change the input value fullname", () => {
      const inputElementFullname = screen.getByPlaceholderText("Vito Corleone");
      fireEvent.change(inputElementFullname, {
        target: { value: '' },
      })
      let fullname = document.getElementById('fullnameInput')
      expect(fullname.value).toBe('')
    });
    test("should change the input value address", () => {
      const inputElementAddress =
        screen.getByPlaceholderText("Corleone Sicily");
      fireEvent.change(inputElementAddress, {
        target: { value: '' },
      })
      let address = document.getElementById('addressInput')
      expect(address.value).toBe('')
    });
    test("should change the input value phone", () => {
      const inputElementPhone = screen.getByPlaceholderText("082233178123");
      fireEvent.change(inputElementPhone, {
        target: { value: '' },
      })
      let phone = document.getElementById('phoneNumber')
      expect(phone.value).toBe('')
    });
    test("should change the input value phone", () => {
      const inputElementDoB = screen.getByPlaceholderText("07-12-1891");
      fireEvent.change(inputElementDoB, {
        target: { value: '' },
      })
      let phone = document.getElementById('dateOfBirth')
      expect(phone.value).toBe('')
    });
  });
  describe("test LobbyGame page with mock api put biodata user", () => {
    beforeEach(async () => {
      server.use(
        rest.put(
          "https://backend-team-1-five.vercel.app/profile",
          (req, res, ctx) => {
            const { data } = req.arrayBuffer;
            return res(
              ctx.delay(100),
              ctx.status(200),
              ctx.json({
                data: data,
              })
            );
          }
        )
      );
      render(
        <BrowserRouter>
          <LobbyGame test={true} />
        </BrowserRouter>
      );
      await waitForElementToBeRemoved(() => screen.getByRole("loadingBiodata"));
    });
    test("should get biodata user from mock api get biodata user", async () => {
      const biodata = {
        fullname: "Bakhtiar A",
        address: "Aceh",
        phoneNumber: "08986923013",
        dateOfBirth: "13-12-1945",
      };
      const inputElementFullname = screen.getByPlaceholderText("Vito Corleone");
      const inputElementAddress =
        screen.getByPlaceholderText("Corleone Sicily");
      const inputElementPhone = screen.getByPlaceholderText("082233178123");
      const inputElementDoB = screen.getByPlaceholderText("07-12-1891");
      const buttonElementSubmit = screen.getByRole("submitBiodata");
      await act(async () => {
        fireEvent.change(inputElementFullname, {
          target: { value: biodata.fullname },
        });
        fireEvent.change(inputElementAddress, {
          target: { value: biodata.address },
        });
        fireEvent.change(inputElementPhone, {
          target: { value: biodata.phoneNumber },
        });
        fireEvent.change(inputElementDoB, {
          target: { value: biodata.dateOfBirth },
        });
        fireEvent.click(buttonElementSubmit);
      });

      await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1));
    });
    test("should change input value", () => {
      const biodata = {
        fullname: "Bakhtiar A",
        address: "Aceh",
        phoneNumber: "08986923013",
        dateOfBirth: "13-12-1945",
      };
      const valueElementFullname = screen.getByTestId("content-input-fullname");
      const valueElementAddress = screen.getByTestId("content-input-address");
      const valueElementPhone = screen.getByTestId("content-input-phone");
      const valueElementDoB = screen.getByTestId("content-input-dob");
      expect(valueElementFullname.value).toBe(biodata.fullname);
      expect(valueElementAddress.value).toBe(biodata.address);
      expect(valueElementPhone.value).toBe(biodata.phoneNumber);
      expect(valueElementDoB.value).toBe(biodata.dateOfBirth);
    });
  });
  describe("test LobbyGame page with mock api put biodata user", () => {
    beforeEach(async () => {
      server.use(
        rest.put(
          "https://backend-team-1-five.vercel.app/photo",
          (req, res, ctx) => {
            const { data } = req.file;
            return res(
              ctx.delay(100),
              ctx.status(200),
              ctx.json({
                data: data,
              })
            );
          }
        ),
      )
      
      render(
        <BrowserRouter>
          <LobbyGame test={true} testModal={true}/>
        </BrowserRouter>
      );
    });
    test("should get biodata user from mock api get biodata user", async () => {
      fireEvent.click(screen.getByTestId("uploadButton"));
      expect(window.alert).toBeCalledTimes(1);
    });
    test("should change input upload file", async () => {
      let file
      file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
      const inputElement = screen.getByTestId("formFile")
      await waitFor(() =>
        fireEvent.change(inputElement, {
          target: { files: [file] },
        })
      );
      let image = document.getElementById("formFile");
      expect(image.files[0].name).toBe("chucknorris.png");
      expect(image.files.length).toBe(1);
    });
    test("should change input upload file", async () => {
      const inputElement = screen.getByTestId("formFile")
      await waitFor(() =>
        fireEvent.change(inputElement, {
          target: { files: stones },
        })
      );
      await waitFor(()=>{
        fireEvent.click(screen.getByTestId("uploadButton"));
      })
    });
    test("should close the modal", async () => {
      fireEvent.click(screen.getByRole("content-closeButton"));
      await waitForElementToBeRemoved(() => screen.getByTestId("uploadButton"));
    });
  });
  describe('test profile click', () => {
    beforeEach(()=>{
      render(<BrowserRouter>
        <LobbyGame test={true} testProfile={true}/>
      </BrowserRouter>)
    })
    test('should get profile foto element', () => {
      const buttonElement = screen.getByRole('content-userProfileFoto')
      expect(buttonElement).toBeInTheDocument()
    })
    test('should get icon as button edit biodata', () => {
      const buttonElement = screen.getByTestId('content-editBiodataButton')
      expect(buttonElement).toBeInTheDocument()
    })
    test('should click profile pictures', () => {
      fireEvent.click(screen.getByRole('content-userProfileFoto'))
    })
    test('should click icon edit biodata', () => {
      fireEvent.click(screen.getByTestId('content-editBiodataButton'))
    })
  })
});
