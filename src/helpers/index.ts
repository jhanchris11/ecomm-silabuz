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
