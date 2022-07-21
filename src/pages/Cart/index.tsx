import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { EmptyIcon } from '../../icons/Empty'
import { MinusIcon } from '../../icons/Minus'
import { PlusIcon } from '../../icons/Plus'
import { RemoveIcon } from '../../icons/Remove'
import {
  removeFromCart,
  clearCart,
  addToCart,
  decreaseCart
} from '../../redux/cart/cart.slice'
import { ProductItem } from '../../types'
export const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()

  const handleClearCart = (): void => {
    dispatch(clearCart(null))
  }

  const handleRemoveFromCart = (product: ProductItem): void => {
    dispatch(removeFromCart(product))
  }
  const handleAddCart = (product: ProductItem): void => {
    dispatch(addToCart(product))
  }

  const handleDecreaseCart = (product: ProductItem): void => {
    dispatch(decreaseCart(product))
  }
  console.log(cartItems)
  return (
    <>
      <Heading>Shopping Cart</Heading>
      <SimpleGrid templateColumns={'3fr 1fr 1fr 1fr'} my={6}>
        <Text>Product</Text>
        <Text align="center">Price</Text>
        <Text align="center">Quantity</Text>
        <Text align="center">Total</Text>
      </SimpleGrid>
      {cartItems.length > 0 ? (
        cartItems.map((product) => (
          <SimpleGrid
            key={product.id}
            templateColumns={'3fr 1fr 1fr 1fr'}
            my={6}
          >
            <Stack direction="row" align="center" p={4}>
              <Image src={product.image} boxSize="200" objectFit="contain" />
              <Box maxW="350" pl={10}>
                <Text align="left" pb={4}>
                  {product.title}
                </Text>

                <Button
                  colorScheme="red"
                  variant="ghost"
                  color="red.400"
                  leftIcon={<RemoveIcon />}
                  onClick={() => handleRemoveFromCart(product)}
                >
                  Remove
                </Button>
              </Box>
            </Stack>
            <Stack align="center" justify="center">
              <Text>{product.price}</Text>
            </Stack>
            <Stack direction="row" justify="center" align="center" spacing={4}>
              <Button
                variant="ghost"
                onClick={() => handleDecreaseCart(product)}
              >
                <MinusIcon />
              </Button>
              <Text>{product.quantity}</Text>
              <Button variant="ghost" onClick={() => handleAddCart(product)}>
                <PlusIcon />
              </Button>
            </Stack>
            <Stack align="center" justify="center">
              <Text>{`S/. ${(product.quantity * product.price).toFixed(
                2
              )}`}</Text>
            </Stack>
          </SimpleGrid>
        ))
      ) : (
        <Stack align="center">
          <EmptyIcon />
        </Stack>
      )}
    </>
  )
}
