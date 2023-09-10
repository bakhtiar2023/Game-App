import { screen, render, fireEvent } from "@testing-library/react";
import React from "react";
import NotFound from "./404";
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";

describe('Not Found Page', () => {
    beforeEach(()=>{
        render(<BrowserRouter><NotFound/></BrowserRouter>)
    })
    test('should get text error 404', () => {
        const textElement = screen.getByText('Error 404')
        expect(textElement).toBeInTheDocument()
    })
    test('should get text You didnt break the internet', () => {
        const textElement = screen.getByText('You didnt break the internet, but we cant find what you are looking for.')
        expect(textElement).toBeInTheDocument()
    })
    test('should get text You didnt break the internet', () => {
        const textLinkElement = screen.getByText('Go Back Home')
        fireEvent.click(textLinkElement)
        expect(window.location.pathname).toBe('/lobbygame')
    })
})