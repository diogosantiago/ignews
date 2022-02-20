import { render, screen, fireEvent } from '@testing-library/react'
import { SubscribeButton } from "."
import { signIn, useSession } from "next-auth/client"
import { mocked } from "ts-jest/utils"
import { useRouter } from "next/router"

jest.mock("next-auth/client")

jest.mock("next/dist/client/router")

describe('SubscribeButton Component', () => {
    it('renders correctly', () => {
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SubscribeButton />)
    
        expect(screen.getByText('Subscribe Now')).toBeInTheDocument()
    })

    it('redirects user to sign in when not authenticated', () => {
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce([null, false])
        const signInMocked = mocked(signIn)

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('Subscribe Now');

        fireEvent.click(subscribeButton)

        expect(signInMocked.call.length).toBe(1);
    })

    it('redirects to posts when user already has a subscription', () => {
        const useRouterMocked = mocked(useRouter)
        const pushMocked = jest.fn();
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce([
            {
                user: {
                    name: "John Joe",
                    email: "johnjoe.teste.com"
                },
                activeSubscription: 'teste',
                expires: 'teste'
            }, false
        ])

        useRouterMocked.mockReturnValueOnce({
            push: pushMocked
        } as any)

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('Subscribe Now');

        fireEvent.click(subscribeButton)

        expect(pushMocked.mock.calls.length).toBe(1);
    })

})