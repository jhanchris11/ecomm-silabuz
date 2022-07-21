import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { ArrofLeftIcon } from '../../icons/ArrofLeft'
import { LikeIcon } from '../../icons/Likes'
import { StartIcon } from '../../icons/Star'

export const ProductDetail = () => {
  const { product } = useAppSelector((state) => state.products)
  let navigate = useNavigate()

  return (
    <>
      <Stack
        align="center"
        position="relative"
        justify="between"
        zIndex={10}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 24 }}
        direction={{ base: 'column', md: 'row' }}
        bg="white"
        rounded={'lg'}
      >
        <Stack direction="row" justify="center" flex={1}>
          <Button
            position="absolute"
            colorScheme="gray"
            variant="link"
            color="gray.400"
            left={0}
            top={0}
            p={8}
            onClick={() => navigate(-1)}
          >
            <ArrofLeftIcon />
          </Button>
          <Stack align="center">
            <Image
              src={product.image}
              w={300}
              h={300}
              objectFit="contain"
              alt={product.title}
            />
          </Stack>
        </Stack>
        <Flex flex={1} direction="column" gap={4} p={6}>
          <Heading
            fontWeight={600}
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', lg: '5xl' }}
          >
            {product.title}
          </Heading>

          <Text fontWeight="semibold">{product.category}</Text>
          <Stack direction="row" spacing={8}>
            <Stack direction="row">
              <Text fontWeight="semibold">{product.rating?.rate}</Text>
              <Box color="yellow.400">
                <StartIcon />
              </Box>
            </Stack>
            <Stack direction="row">
              <Text fontWeight="semibold">{product.rating?.count}</Text>
              <Box color="cyan.400">
                <LikeIcon />
              </Box>
            </Stack>
          </Stack>
          <Text
            fontSize="lg"
            color="orange.500"
            fontWeight="bold"
          >{`$ ${product.price?.toFixed(2)}`}</Text>
          <Text fontSize="sm">{product.description}</Text>
        </Flex>
      </Stack>
    </>
  )
}
