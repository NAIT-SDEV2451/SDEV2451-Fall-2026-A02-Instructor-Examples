import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart mucst be inside a cart provider')
  }
  return context
}