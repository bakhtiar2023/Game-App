import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import StaticPage from "./StaticPage"
import '@testing-library/jest-dom'
import { Provider } from "react-redux"
import {store} from '../../redux/store'

describe('Statig Page test', () => {
    beforeEach(()=>{
        render(<BrowserRouter><Provider store={store}><StaticPage/></Provider></BrowserRouter>)
    })
    test('should get path to home /', () => {
        const textLinkElement = screen.getByText('Home')
        fireEvent.click(textLinkElement)
        expect(window.location.pathname).toBe('/')
    })
    test('should get path to sign in /login', () => {
        const textLinkElement = screen.getByText('Sign In')
        fireEvent.click(textLinkElement)
        expect(window.location.pathname).toBe('/login')
    })
    test('should get path to registration /register', () => {
        const textLinkElement = screen.getByText('Register')
        fireEvent.click(textLinkElement)
        expect(window.location.pathname).toBe('/register')
    })
    test('should get text © 2023 Your Games, Inc.All Rights Reserved', () => {
        const textLinkElement = screen.getByText('© 2023 Your Games, Inc.All Rights Reserved')
        expect(textLinkElement).toBeInTheDocument()
    })
    test('should get text PRIVACY POLICY and pathname /register', () => {
        const textLinkElement = screen.getByText('PRIVACY POLICY')
        expect(textLinkElement).toBeInTheDocument()
        fireEvent.click(textLinkElement)
        expect(window.location.pathname).toBe('/register')
    })
    test('should get text TERMS OF SERVICES pathname /register', () => {
        const textLinkElement = screen.getByText('TERMS OF SERVICES')
        expect(textLinkElement).toBeInTheDocument()
        fireEvent.click(textLinkElement)
        expect(window.location.pathname).toBe('/register')
    })
    test('should get text CODE OF CONDUCT pathname /register', () => {
        const textLinkElement = screen.getByText('CODE OF CONDUCT')
        expect(textLinkElement).toBeInTheDocument()
        fireEvent.click(textLinkElement)
        expect(window.location.pathname).toBe('/register')
    })
})