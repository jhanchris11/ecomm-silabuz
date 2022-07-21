import { ComponentProps } from 'react'

export interface ProductItem {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: RatingProduct
  quantity: number
}
export interface RatingProduct {
  rate: number
  count: number
}

export interface Cart {
  id: number
  userId: number
  date: Date
  products: QuantityProduct[]
}

export interface QuantityProduct {
  productId: number
  quantity: number
}
export interface IconProps extends ComponentProps<'svg'> {
  size?: number
}
