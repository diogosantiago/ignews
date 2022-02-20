import { render, screen } from '@testing-library/react'
import { SignInButton } from "."
import { useSession } from "next-auth/client"
import { mocked } from "ts-jest/utils"

jest.mock("next-auth/client")

describe('SignInButton Component', () => {
    it('renders correctly when user is not authenticated', () => {
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce([null, false])

        render(
            <SignInButton />
        )
    
        expect(screen.getByText('Sign In with Github')).toBeInTheDocument()
    })

    it('renders correctly when user is authenticated', () => {
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce([{
            user: {
                name: "John Joe",
                email: "johnjoe.teste.com"
            }, expires: 'teste'
        }, false])

        render(
            <SignInButton />
        )
    
        expect(screen.getByText('John Joe')).toBeInTheDocument()
    })

})