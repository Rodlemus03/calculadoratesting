import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Calculator from '../components/Calculator'

describe('Calculator', () => {
  it('displays initial value of 0', () => {
    render(<Calculator />)
  
  })

  it('updates display when numbers are clicked', () => {
    render(<Calculator />)
    const button1 = screen.getByText('1')
    const button2 = screen.getByText('2')
    fireEvent.click(button1)
    fireEvent.click(button2)
    const display = screen.getByText('12')
    expect(display).toBeInTheDocument()
  })

  it('performs addition correctly', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('='))

  })

  it('performs subtraction correctly', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('-'))
    fireEvent.click(screen.getByText('3'))

  })

  it('performs multiplication correctly', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('*'))
    fireEvent.click(screen.getByText('4'))
    fireEvent.click(screen.getByText('='))
    const display = screen.getByText('12')
    expect(display).toBeInTheDocument()
  })

  it('performs division correctly', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('/'))
    fireEvent.click(screen.getByText('2'))

  })

  it('toggles sign correctly', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('+/-'))
    const display = screen.getByText('-9')
    expect(display).toBeInTheDocument()
    fireEvent.click(screen.getByText('+/-'))
  })

  it('clears display when C is clicked', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('C'))

  })

  it('handles keyboard input for numbers and operations', () => {
    render(<Calculator />)
    fireEvent.keyDown(window, { key: '1' })
    fireEvent.keyDown(window, { key: '2' })
    fireEvent.keyDown(window, { key: '+' })
    fireEvent.keyDown(window, { key: '3' })
    fireEvent.keyDown(window, { key: 'Enter' })
    const display = screen.getByText('15')
    expect(display).toBeInTheDocument()
  })
})
