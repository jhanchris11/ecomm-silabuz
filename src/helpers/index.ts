import { ProductItem } from '../types'

export const reduceText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)} ...`
  }
  return text
}
export const getSearchProduts = (data: ProductItem[], query: string) => {
  return data?.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  )
}
export const formValidationsRegister = {
  email: [
    (value: string) => value.includes('@'),
    'El correo debe de tener un @'
  ],
  password: [
    (value: string) => value.length >= 6,
    'La contraseña debe de tener al menos 6 caracteres'
  ],
  displayName: [
    (value: string) => value.length >= 3,
    'El nombre debe de tener al menos 3 caracteres'
  ]
}

export const formValidationsLogin = {
  email: [
    (value: string) => value.includes('@'),
    'El correo debe de tener un @'
  ],
  password: [
    (value: string) => value.length >= 6,
    'La contraseña debe de tener al menos 6 caracteres'
  ]
}
