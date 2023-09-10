import React from 'react'

import { render, screen,act,fireEvent } from '@testing-library/react'
import Title from '../../components/Title'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import CreateRoom from '../CreateRoom/CreateRoom'
import { createRoomSchema } from '../../schemas'
import Rock from '../../assets/images/batu.png'
import Paper from '../../assets/images/kertas.png'
import Scissors from '../../assets/images/gunting.png'
import { mockAxiosCreateRoom } from '../../__mocks__/axios'
import '@testing-library/jest-dom/extend-expect';





describe('create room integration test', () => {

    test('should rendered create room page when title label is CREATE ROOM PVP in the create room page', () => {
        render(<MemoryRouter><CreateRoom /></MemoryRouter>)

        const createRoomTittle = screen.getByLabelText('CREATE ROOM PVP')
        expect(createRoomTittle).toBeInTheDocument()

    })
    test('should rendered create room page when display create room fields in create room page ', () => {
        render(<MemoryRouter><CreateRoom /></MemoryRouter>)
        const createRoomField = screen.getByPlaceholderText(/input room name here!/i)
        expect(createRoomField).toBeInTheDocument()



    })
    test('should  rendered create room page when button is exist in create room.page', () => {

        render(<MemoryRouter><CreateRoom /></MemoryRouter>)
        const createRoomButton = screen.getByRole('button',)
        const createRoomButtonText = screen.getByText('create room')
        expect(createRoomButton).toBeTruthy()
        expect(createRoomButtonText).toBeInTheDocument()
        expect(createRoomButton).toBeInTheDocument()
    })
    test('renders title component with correct text', () => {
        const titleText = 'Choose Your Choice:';
        render(<Title classProps="playerChoice title text-center">{titleText}</Title>);

        // Find the title using its text content
        const titleElement = screen.getByText(titleText);

        // Assert that the title element is rendered
        expect(titleElement).toBeInTheDocument();
    });
    test('should  rendered image rock paper scissors when rendered register page ', () => {
        render(<MemoryRouter><CreateRoom /></MemoryRouter>)

        const rockImage = screen.getByAltText('rock')
        const paperImage = screen.getByAltText('paper')
        const scissorsImage = screen.getByAltText('scissors')

        expect(rockImage).toBeInTheDocument()
        expect(paperImage).toBeInTheDocument()
        expect(scissorsImage).toBeInTheDocument()

        // check src image
        expect(rockImage).toHaveAttribute('src', Rock)
        expect(paperImage).toHaveAttribute('src', Paper)
        expect(scissorsImage).toHaveAttribute('src', Scissors)




    })
    test('should return message Room successfully created when I send data  ', async() => {
         
        render(<MemoryRouter><CreateRoom /></MemoryRouter>)
        mockAxiosCreateRoom.post.mockReturnValue({
            data: [{
                "roomName": "dede sunandar",
                "player1Choice": "rock"
            }]
        })
        // Simulate navigation by firing a button click
        const createRoomButton = screen.getByText('create room');
        await act (async() => { fireEvent.click(createRoomButton) });

        mockAxiosCreateRoom.post.mockResolvedValue({
            message: 'Room successfully created'
        });

    })
    test('return validation errors message when roomName is empty ', async () => {
        const invalidData = mockAxiosCreateRoom.post.mockResolvedValue({
            roomName: '',
            player1Choice: 'paper'
        });
        render(<MemoryRouter><CreateRoom /></MemoryRouter>)

        try {
            await createRoomSchema.validate(invalidData);
        } catch (error) {
            expect(error.errors[0]).toBe('Please input roomName');
        }


    })
    test('return validation errors message when roomName is too short ', async () => {
        const invalidData = mockAxiosCreateRoom.post.mockResolvedValue({
            roomName: 'ro',
            player1Choice: 'paper'
        });
        render(<MemoryRouter><CreateRoom /></MemoryRouter>)
        await act (async() =>{
            const roomNameInput = screen.getByPlaceholderText('input room name here!');
            fireEvent.change(roomNameInput, { target: { value: 'ro' } }); 
            fireEvent.click(screen.getByText('create room'));

        })
    

        try {
            await createRoomSchema.validate(invalidData);
        } catch (error) {
            expect(error.errors[0]).toBe('room name too short, min 3 character');
        }


    })
    test('return validation errors message when roomName is too long ', async () => {
        const invalidData = mockAxiosCreateRoom.post.mockResolvedValue({
            roomName: 'roomKu123456789',
            player1Choice: 'paper'
        });
        render(<MemoryRouter><CreateRoom /></MemoryRouter>)

        try {
            await createRoomSchema.validate(invalidData);
        } catch (error) {
            expect(error.errors[0]).toBe('room name too long, max 10 character');
        }


    })
    test('should return message Please choose rock, paper, or scissors ', async () => {
        const invalidData = mockAxiosCreateRoom.post.mockResolvedValue({
            roomName: 'roomKu123',
            player1Choice: ''
        });
        render(<MemoryRouter><CreateRoom /></MemoryRouter>)

        try {
            await createRoomSchema.validate(invalidData);
        } catch (error) {
            expect(error.errors[0]).toBe('Please choose rock, paper, or scissors');
        }


    })
   














})
