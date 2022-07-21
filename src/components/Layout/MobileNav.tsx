import {
  Box,
  Collapse,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { CloseIcon } from '../../icons/Close'
import { HamburguerIcon } from '../../icons/Hamburger'
// import { NavBar } from './NavBar'

export const MobileNav = () => {
  const { isOpen, onToggle } = useDisclosure()

  const routesLink = [
    {
      id: 1,
      label: 'Products',
      href: '/products/all'
    }
  ]

  return (
    <Box width="full">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} ml={{ base: -2 }} display={{ base: 'flex' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon /> : <HamburguerIcon />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Box>
          <Text
            // textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            textAlign="center"
            color={useColorModeValue('gray.800', 'white')}
          >
            Logo
          </Text>
        </Box>
      </Flex>

      {/* <Collapse in={isOpen} animateOpacity>
        <Stack>
          {}
        </Stack>
      </Collapse> */}
    </Box>
  )
}
