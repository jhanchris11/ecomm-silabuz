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
import { useAppSelector } from '../../hooks/redux'
import { EmptyIcon } from '../../icons/Empty'
import { MinusIcon } from '../../icons/Minus'
import { PlusIcon } from '../../icons/Plus'

export const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart)
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
      {cartItems.length >= 0 ? (
        cartItems.map((item) => (
          <SimpleGrid key={item.id} templateColumns={'3fr 1fr 1fr 1fr'} my={6}>
            <Stack direction="row" align="center" spacing={16} p={4}>
              <Image src={item.image} boxSize="200" />
              <Box maxW="350">
                <Text align="left" pb={4}>
                  {item.title}
                </Text>
                <Button>Remove</Button>
              </Box>
            </Stack>
            <Stack align="center" justify="center">
              <Text>{item.price}</Text>
            </Stack>
            <Stack direction="row" justify="center" align="center" spacing={4}>
              <Button variant="ghost">
                <MinusIcon />
              </Button>
              <Text>{item.quantity}</Text>
              <Button variant="ghost">
                <PlusIcon />
              </Button>
            </Stack>
            <Stack align="center" justify="center">
              <Text>{item.quantity * item.price}</Text>
            </Stack>
          </SimpleGrid>
        ))
      ) : (
        <EmptyIcon />
      )}
    </>
  )
}
