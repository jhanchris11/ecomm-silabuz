import {
  Button,
  Text,
  Stack,
  Box,
  Container,
  Heading,
  Flex,
  useColorModeValue,
  Image
} from '@chakra-ui/react'
import { Blob } from '../../icons/Blob'
import { ShopHeroImage } from '../../icons/ShopHero'

export const Hero = () => {
  return (
    <Container maxW={'7xl'}>
      <Stack
        align="center"
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '5xl' }}
          >
            <Text position={'relative'} as={'span'}>
              Somos parte de tus momentos felices{' '}
            </Text>
          </Heading>
          <Text as="span">
            Buscamos que encuentres tu estilo , tu momento de brillar y exaltar
            tu personalidad y sonrisa .
          </Text>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position="relative"
          w="full"
        >
          <Blob
            w={'100%'}
            h={'150%'}
            color={useColorModeValue('red.50', 'red.400')}
            position="absolute"
            left={0}
            top={'-20%'}
            zIndex={-1}
          />
          <Box height="300px">
            <ShopHeroImage />
          </Box>
        </Flex>
      </Stack>
    </Container>
  )
}
