import { SimpleGrid, Tabs, Tab, TabList } from '@chakra-ui/react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { addToCart } from '../../redux/cart/cart.slice'
import {
  startDeleteProductById,
  startGetProductsByCategory
} from '../../redux/product/thunks'

import { ProductItem } from '../../types'

import { Product } from './Product'

const fixIndexCategory = (state: any): number => {
  console.log(state)
  if (state !== null) {
    return state.fromCategory
  }
  return 0
}

export const ListProducts = () => {
  const location = useLocation()

  const [tabIndex, setTabIndex] = useState<number>(
    fixIndexCategory(location.state)
  )
  const { products, categories } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()
  const handleAddCart = (product: ProductItem): void => {
    dispatch(addToCart(product))
  }

  const handleTabsChange = (index: any) => {
    let title

    if (index == 0) {
      title = 'All'
    } else {
      title = categories[index - 1]
    }
    setTabIndex(index)

    dispatch(startGetProductsByCategory(title))
  }
  const handleDeleteProduct = (id: number) => {
    dispatch(startDeleteProductById(id))
  }
  return (
    <Tabs index={tabIndex} onChange={handleTabsChange}>
      <TabList>
        <Tab>All</Tab>
        {categories.map((category, index) => (
          <Tab key={index} value={category}>
            {category}
          </Tab>
        ))}
      </TabList>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 5, lg: 8 }}
        my={6}
      >
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddCart={handleAddCart}
            handleDeleteProduct={handleDeleteProduct}
          />
        ))}
      </SimpleGrid>
    </Tabs>
  )
}
