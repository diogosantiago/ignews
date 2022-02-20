import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { getPrismicClient } from '../../services/prismic'
import { useRouter } from "next/dist/client/router"



const post = {
    slug: 'my-new-post',
    title: 'My New Post',
    content: '<p>Post excerpt</p>',
    updatedAt: '10 de Abril'
}

jest.mock('../../services/prismic')
jest.mock("next-auth/client")
jest.mock("next/dist/client/router")

describe('Post preview page', () => {
    it('renders correctly', () => {
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce([null, false])

        render(<Post post={post} />)

        expect(screen.getByText("My New Post")).toBeInTheDocument()
        expect(screen.getByText("Post excerpt")).toBeInTheDocument()
        expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
    })

    it('redirects user to full post when user is subscribed', async () => {
        const useSessionMocked = mocked(useSession)
        const useRouterMocked = mocked(useRouter)
        const pushMocked = jest.fn()

        useSessionMocked.mockReturnValueOnce([{
            activeSubscription: 'fake-subscription'
        }, false])

        useRouterMocked.mockReturnValueOnce({
            push: pushMocked
        } as any)
        
        render(<Post post={post} />)

        expect(pushMocked).toHaveBeenCalledWith('/posts/my-new-post')
    })

    it('loads initial data', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [
                        { type: 'heading', text: 'My New Post'}
                    ],
                    content: [
                        { type: 'paragraph', text: 'My New Post Content' }
                    ]
                },
                last_publication_date: '04-01-2022'
            })
        } as any)

        const response = await getStaticProps({
            params: { slug: 'my-new-post' }
        } as any)

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: 'my-new-post',
                        title: 'My New Post',
                        content: '<p>My New Post Content</p>',
                        updatedAt: '01 de abril de 2022'
                    }
                }
            })
        )
    })
})