import { Stack, Heading, SimpleGrid, Text, Image, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ElectronicIcon } from '../../icons/Electronic'
import { JeweleryIcon } from '../../icons/Jewelery'
import { MenIcon } from '../../icons/Men'
import { WomenIcon } from '../../icons/Women'

export const Categories = () => {
  const listCategories = [
    {
      id: 1,
      title: 'electronics',
      img: <ElectronicIcon />
    },
    {
      id: 2,
      title: 'jewelery',
      img: <JeweleryIcon />
    },
    {
      id: 3,
      title: "men's clothing",
      img: <MenIcon />
    },
    {
      id: 4,
      title: "women's clothing",
      img: <WomenIcon />
    }
  ]

  return (
    <Stack>
      <Heading>Categories</Heading>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} py={12}>
        {listCategories.map((category) => (
          <Link to={`/products/all`} state={{ fromCategory: category.id }}>
            <Stack
              key={category.id}
              width="full"
              direction="column"
              align="center"
              gap={4}
              bg="white"
              rounded={'lg'}
              p={4}
              _hover={{ bg: 'purple.100' }}
            >
              <Text>{category.title}</Text>
              <Box width="200px" height="200">
                {category.img}
              </Box>
            </Stack>
          </Link>
        ))}
      </SimpleGrid>
    </Stack>
  )
}
