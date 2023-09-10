import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Title from '../Title'
import React from 'react'


describe('should rendered h1 in title', () => {

    test('should  rendered h1 and h1 have to be in the document', () => {
        const classProps = 'className title'
        const childrenText = 'text in h1'

        render(
            <Title classProps={classProps}>{childrenText}</Title>
        )
        const h1 = screen.getByRole('heading', { name: childrenText });
        expect(h1).toBeInTheDocument()


    })
    test('should have a classname is classProps', () => {
        const classProps = 'className title'
        const childrenText = 'text in h1'

        render(
            <Title classProps={classProps}>{childrenText}</Title>
        )
        const h1 = screen.getByRole('heading',{name: childrenText})
        expect(h1).toHaveClass(classProps)

    })
    test('should have childrenText in h1 element', () => {
        const classProps = 'className title'
        const childrenText = 'text in h1'

        render(
            <Title classProps={classProps}>{childrenText}</Title>
        )
        const h1 = screen.getByRole('heading',{name  : childrenText })
        expect(h1.textContent).toEqual(childrenText)


    })






})
