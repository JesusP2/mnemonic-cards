import { render, screen } from '@testing-library/react'
import Home from '../src/pages/test'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
    console.log(process.env.NODE_ENVIS)
    expect(3).toEqual(2 + 1)
  })
})
