import React from 'react'
import { render,screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from './HomePage'

describe('Homepage', () => {
    test('should render Homepage', () => {
      render(<HomePage/>)
      const textButton = screen.getByText('PLAY NOW')
      expect(textButton).toBeInTheDocument()
    })

    test('should render Homepage', () => {
      render(<HomePage/>)
      const text = screen.getByText('PLAY TRADITIONAL GAME')
      expect(text).toBeInTheDocument()
    })

    test('should render Homepage', () => {
      render(<HomePage/>)
      const text = screen.getByText('THE GAMES')
      expect(text).toBeInTheDocument()
    })

    test('should render Homepage', () => {
      render(<HomePage/>)
      const text = screen.getByText('FEATURES')
      expect(text).toBeInTheDocument()
    })

    test('should render Homepage', () => {
      render(<HomePage/>)
      const text = screen.getByText('SYSTEM REQUIREMENT')
      expect(text).toBeInTheDocument()
    })

    test('should render Homepage', () => {
      render(<HomePage/>)
      const textButton = screen.getByText('SEE MORE')
      expect(textButton).toBeInTheDocument()
    })

    test('should render Homepage', () => {
      render(<HomePage/>)
      const textButton = screen.getByText('Subscribe now')
      expect(textButton).toBeInTheDocument()
    })
  })