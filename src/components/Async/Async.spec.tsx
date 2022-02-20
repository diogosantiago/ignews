import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { Async } from '.'

test('renders correctly', async () => {
    const response = render(<Async />)

    expect(screen.getByText('Botao')).toBeInTheDocument()
    await waitForElementToBeRemoved(screen.queryByText('Botao'))
    expect(screen.getByText('Hello World')).toBeInTheDocument()
    expect(await screen.findByText('Button')).toBeInTheDocument()
})