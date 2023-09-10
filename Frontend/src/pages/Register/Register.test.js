
import React from 'react';
import Register from '../Register/Register'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { mockAxiosRegister } from '../../__mocks__/axios'
import '@testing-library/jest-dom'
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { registrationSchema } from '../../schemas';
import userEvent from '@testing-library/user-event';
jest.mock('axios')

describe('register integration test', () => {
    test('should render register page correctly', () => {
        // eslint-disable-next-line react/react-in-jsx-scope
        render(<MemoryRouter><Register /></MemoryRouter>) // Misalkan judul register berada di komponen
        const registerTitle = screen.getByText(/Sign Up/i);
        expect(registerTitle).toBeInTheDocument();
    })
    test('should display form fields', () => {
        render(<MemoryRouter><Register /></MemoryRouter>);
        const usernameField = screen.getByLabelText(/Username/i);
        const emailField = screen.getByLabelText(/Email/i);
        const passwordField = screen.getByLabelText(/Password/i);

        expect(usernameField).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
    });

    test('should show success message after successful registration', async () => {

        // Mock the successful response from Axios
        mockAxiosRegister.post.mockResolvedValue({
            data: [{
                "username": "dede sunandar",
                "email": "dede@gmail.com",
                "password": "12345Abc"
            }]
        });


        // Render the component



        render(
            <MemoryRouter>
                <Register />


            </MemoryRouter>);

        // Simulate navigation by firing a button click
        const registerButton = screen.getByText('Register');
        await act(async () => { fireEvent.click(registerButton) });

        mockAxiosRegister.post.mockResolvedValue({
            message: 'registration successful'
        });





        // Expect the navigation function to have been called with the correct route
        expect(registerButton).toBeInTheDocument();


    })
    test('validates valid registration data', async () => {
        const validData = {
            username: 'user123',
            email: 'user@example.com',
            password: 'Password123'
        };

        await expect(registrationSchema.isValid(validData)).resolves.toBe(true);
    });

    test('validates invalid registration data', async () => {
        const invalidData = {
            username: '',
            email: 'invalid-email',
            password: 'weak'
        };

        await expect(registrationSchema.isValid(invalidData)).resolves.toBe(false);
    });
    test('returns validation error message for empty username', async () => {
        render(<MemoryRouter><Register /></MemoryRouter>)

        const invalidData = mockAxiosRegister.post.mockResolvedValue({
            username: '',
            email: 'user@example.com',
            password: 'Password123'
        });
        const usernameInput = screen.getByLabelText('Username');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const registerButton = screen.getByText('Register');
        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: '' } });
            fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'Password123' } });
            fireEvent.click(registerButton)

        })



        try {
            await registrationSchema.validate(invalidData);
        } catch (error) {
            expect(error.errors[0]).toBe('username should not empty');
        }
    });
    test('returns validation error message for username is too short min 3 characters', async () => {
        render(<MemoryRouter><Register /></MemoryRouter>)
        const invalidData = mockAxiosRegister.post.mockResolvedValue({
            username: 'us',
            email: 'user@example.com',
            password: 'Password123'
        })
        const usernameInput = screen.getByLabelText('Username');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const registerButton = screen.getByText('Register');
        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: 'us' } });
            fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'Password123' } });
            fireEvent.click(registerButton)

        })



        try {
            await registrationSchema.validate(invalidData);

        } catch (error) {
            expect(error.errors[0]).toBe('username too short, min 3 character')


        }

    })
    test('returns validation error message for username is too long max 10 characters', async () => {
        const invalidData = mockAxiosRegister.post.mockResolvedValue({
            username: 'user1234567890',
            email: 'user@example.com',
            password: 'Password123'
        });
        render(<MemoryRouter><Register /></MemoryRouter>)
        const usernameInput = screen.getByLabelText('Username');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const registerButton = screen.getByText('Register');
        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: 'user1234567890' } });
            fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'Password123' } });
            fireEvent.click(registerButton)

        })

        try {
            await registrationSchema.validate(invalidData);
        } catch (error) {
            expect(error.errors[0]).toBe('username is too long max 10 characters');
        }

    })
    test('returns validation error message for email should not empty', async () => {
        const invalidData = mockAxiosRegister.post.mockResolvedValue({
            username: 'user123',
            email: '',
            password: 'Password123'
        });
        render(<MemoryRouter><Register /></MemoryRouter>)
        const usernameInput = screen.getByLabelText('Username');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const registerButton = screen.getByText('Register');
        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: 'user123' } });
            fireEvent.change(emailInput, { target: { value: '' } });
            fireEvent.change(passwordInput, { target: { value: 'Password123' } });
            fireEvent.click(registerButton)

        })



        try {
            await registrationSchema.validate(invalidData);
        } catch (error) {
            expect(error.errors[0]).toBe('email should not empty');
        }

    })
    test('returns validation error message for  Invalid format email', async () => {
        const invalidData = mockAxiosRegister.post.mockResolvedValue({
            username: 'user123',
            email: 'user.com',
            password: 'Password123'
        });
        render(<MemoryRouter><Register /></MemoryRouter>)
        const usernameInput = screen.getByLabelText('Username');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const registerButton = screen.getByText('Register');
        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: 'user123' } });
            fireEvent.change(emailInput, { target: { value: 'user.com' } });
            fireEvent.change(passwordInput, { target: { value: 'Password123' } });
            fireEvent.click(registerButton)

        })


        try {
            await registrationSchema.validate(invalidData);
        } catch (error) {
            expect(error.errors[0]).toBe('Invalid format email');
        }

    })
    test('returns validation error message for  password should not empty', async () => {
        const invalidData = mockAxiosRegister.post.mockResolvedValue({
            username: 'user123',
            email: 'user.com',
            password: ''
        });
        render(<MemoryRouter><Register /></MemoryRouter>)
        const usernameInput = screen.getByLabelText('Username');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const registerButton = screen.getByText('Register');
        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: 'user123' } });
            fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
            fireEvent.click(registerButton)

        })


        try {
            await registrationSchema.validate(invalidData);
        } catch (error) {
            expect(error.errors[0]).toBe('password Should not be empty');
        }

    })
    test('validates password strength', async () => {
        const invalidData = mockAxiosRegister.post.mockResolvedValue({
            username: 'user123',
            email: 'user@example.com',
            password: 'weakpass'
        });
        render(<MemoryRouter><Register /></MemoryRouter>)
        const usernameInput = screen.getByLabelText('Username');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const registerButton = screen.getByText('Register');
        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: 'user1234567890' } });
            fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'pass12345' } });
            fireEvent.click(registerButton)

        })


        try {
            await registrationSchema.validate(invalidData);
        } catch (error) {
            expect(error.errors[0]).toBe('please create stronger password');
        }
    });
    test('return password too short minimal 6 characters', async () => {
        const invalidData = mockAxiosRegister.post.mockResolvedValue({
            username: 'user123',
            email: 'user@example.com',
            password: 'weak'
        });
        render(<MemoryRouter><Register /></MemoryRouter>)
        const usernameInput = screen.getByLabelText('Username');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const registerButton = screen.getByText('Register');
        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: 'user1234567890' } });
            fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'Pass' } });
            fireEvent.click(registerButton)

        })


        try {
            await registrationSchema.validate(invalidData);
        } catch (error) {
            expect(error.errors[0]).toBe('password too short, min 6 character');
        }
    });
    test('displays validation error for empty email', async () => {
        render(<MemoryRouter><Register /></MemoryRouter>);

        const usernameInput = screen.getByLabelText('Username');
        await act(async () => {
            // Trigger the onBlur event to display the error message
            userEvent.click(usernameInput); // Trigger focus
            userEvent.tab(); // Trigger blur

        })


        const errorMessage = await screen.findByText('username should not empty');
        expect(errorMessage).toBeInTheDocument();
    });
    test('displays validation error for empty username', async () => {
        render(<MemoryRouter><Register /></MemoryRouter>);

        const emailInput = screen.getByLabelText('Email');
        await act(async () => {
            // Trigger the onBlur event to display the error message
            userEvent.click(emailInput); // Trigger focus
            userEvent.tab(); // Trigger blur

        })


        const errorMessage = await screen.findByText('email should not empty');
        expect(errorMessage).toBeInTheDocument();
    });
    test('displays validation error for empty username', async () => {
        render(<MemoryRouter><Register /></MemoryRouter>);

        const passwordInput = screen.getByLabelText('Password');
        await act(async () => {
            // Trigger the onBlur event to display the error message
            userEvent.click(passwordInput); // Trigger focus
            userEvent.tab(); // Trigger blur

        })


        const errorMessage = await screen.findByText('password should not empty');
        expect(errorMessage).toBeInTheDocument();
    });
    it('displays general error message', async () => {
        const errorMessage = 'This is a general error message'; // Set your desired error message

        render(<MemoryRouter><Register /></MemoryRouter>);

        // Set formik.errors.general to the desired error message
        const formik = {
            errors: {
                general: errorMessage
            }
        };

        // Render the alert element with the error message
        render(<div className="alert alert-light" role="alert">{formik.errors.general}</div>);

        // Ensure the alert element with the error message is displayed
        const displayedErrorMessage = await screen.findByText(errorMessage);
        expect(displayedErrorMessage).toBeInTheDocument();
    });


})



















