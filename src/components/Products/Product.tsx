import {
  Box,
  Button,
  Image,
  Stack,
  Text,
  Link,
  Tooltip
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import { reduceText } from '../../helpers'
import { useAppDispatch } from '../../hooks/redux'
import { CartIcon } from '../../icons/Cart'
import { EditIcon } from '../../icons/Edit'
import { RemoveIcon } from '../../icons/Remove'
import { StartIcon } from '../../icons/Star'
import { startGetProductById } from '../../redux/product/thunks'
import { ProductItem } from '../../types'

interface MyProps {
  product: ProductItem
  handleAddCart: (product: ProductItem) => void
  handleDeleteProduct: (id: number) => void
}

export const Product = ({
  product,
  handleAddCart,
  handleDeleteProduct
}: MyProps) => {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id, image, title } = product

  const handleProductDetail = (): void => {
    dispatch(startGetProductById(product.id))
    navigate(`/product/${product.id}`)
  }

  return (
    <Stack
      key={id}
      direction="column"
      align="center"
      justify="space-between"
      spacing={6}
      rounded={'lg'}
      bg={'white'}
      pos={'relative'}
      p={6}
      _hover={{ boxShadow: 'xl' }}
    >
      <Link onClick={handleProductDetail} _hover={{ textDecoration: 'none' }}>
        <Stack spacing={4} align="center">
          <Image src={image} alt={title} boxSize="200" objectFit={'contain'} />
          <Tooltip label={title} placement="top">
            <Text align="center">{reduceText(title, 30)}</Text>
          </Tooltip>

          <Stack direction="row" justify="space-around" width="full">
            <Text
              fontWeight="semibold"
              color="orange.500"
              align="left"
            >{`$${product.price.toFixed(2)}`}</Text>
            <Stack direction="row">
              <Text fontWeight="semibold">{product.rating.rate}</Text>
              <Box color="yellow.400">
                <StartIcon />
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Link>
      <Stack direction="row" justify="space-evenly" w="full">
        <Button
          colorScheme="blue"
          variant="ghost"
          color="blue.400"
          onClick={() => handleAddCart(product)}
        >
          <EditIcon />
        </Button>
        <Button
          colorScheme="red"
          variant="ghost"
          color="red.400"
          onClick={() => handleDeleteProduct(id)}
        >
          <RemoveIcon />
        </Button>
        <Button
          colorScheme="purple"
          variant="ghost"
          color="purple.400"
          onClick={() => handleAddCart(product)}
        >
          <CartIcon />
        </Button>
      </Stack>
    </Stack>
  )
}
