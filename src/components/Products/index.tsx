import {
  SimpleGrid,
  Tabs,
  Tab,
  TabList,
  InputLeftElement,
  InputGroup,
  Input,
  useDisclosure,
  Stack,
  Button,
  Tooltip
} from '@chakra-ui/react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useDebounce } from '../../hooks/useDebounce'
import { PlusIcon } from '../../icons/Plus'
import { SearchIcon } from '../../icons/Search'

import { addToCart } from '../../redux/cart/cart.slice'
import {
  starSearchProductByTitle,
  startDeleteProductById,
  startGetProductsByCategory
} from '../../redux/product/thunks'

import { ProductItem } from '../../types'

import { Product } from './Product'
import { ProductModal } from './ProductModal'

const fixIndexCategory = (state: any): number => {
  if (state !== null) {
    return state.fromCategory
  }
  return 0
}

export const ListProducts = () => {
  const location = useLocation()
  const [search, setSearch] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const searchDebounce = useDebounce(search, 500)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
    dispatch(starSearchProductByTitle(e.target.value))
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    dispatch(starSearchProductByTitle(searchDebounce))
    setSearch('')
  }
  const handleOpenModal = (): void => {
    onOpen()
  }

  return (
    <Tabs index={tabIndex} onChange={handleTabsChange} py={4}>
      <TabList>
        <Tab>All</Tab>
        {categories.map((category, index) => (
          <Tab key={index} value={category}>
            {category}
          </Tab>
        ))}
      </TabList>
      <Stack direction="row" spacing={4} align="center" justify="center">
        <form onSubmit={handleSubmit}>
          <InputGroup
            width={{ base: 340, md: 400 }}
            bg="white"
            rounded="lg"
            m="32px auto"
          >
            <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
            <Input
              size="md"
              placeholder="Buscar products"
              onChange={handleChange}
              value={search}
            />
          </InputGroup>
        </form>
        <Tooltip placement="top" label={'Add Product'}>
          <Button
            colorScheme="purple"
            variant="ghost"
            color="purple.400"
            onClick={handleOpenModal}
          >
            <PlusIcon width={32} height={32} />
          </Button>
        </Tooltip>
      </Stack>
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
            handleOpenModal={handleOpenModal}
          />
        ))}
      </SimpleGrid>
      <ProductModal isOpen={isOpen} onClose={onClose} />
    </Tabs>
  )
}
