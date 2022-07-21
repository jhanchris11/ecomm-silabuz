import {
  Box,
  Text,
  Container,
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
  IconButton,
  Link,
  Stack,
  useColorModeValue,
  Badge,
  Avatar,
  AvatarBadge,
  Tooltip
} from '@chakra-ui/react'
import { Link as LinkRouter, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CartIcon } from '../../icons/Cart'
import { LoginIcon } from '../../icons/Login'
import { LogoutIcon } from '../../icons/Logout'
import { RegisterIcon } from '../../icons/Register'
import { UserIcon } from '../../icons/User'
import { startLogout } from '../../redux/auth/thunk'
import { Search } from '../commons/Search'
import { MobileNav } from './MobileNav'
export const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { status, displayName } = useAppSelector((state) => state.auth)
  const { cartItems } = useAppSelector((state) => state.cart)
  const handleRedirect = (to: string) => {
    if (to === 'Logout') {
      dispatch(startLogout())
    }
    // navigate(to)
  }
  console.log(cartItems)
  const routesLinksAuth = [
    {
      id: 1,
      title: 'Login',
      href: '/auth/login',
      icon: <LoginIcon />,
      type: 'unauthenticated'
    },
    {
      id: 2,
      title: 'Register',
      href: '/auth/register',
      icon: <RegisterIcon />,
      type: 'unauthenticated'
    },
    {
      id: 3,
      title: 'Mi perfil',
      href: '/profile',
      icon: <UserIcon />,
      type: 'authenticated'
    },
    {
      id: 4,
      title: 'Logout',
      href: '/profile',
      icon: <LogoutIcon />,
      type: 'authenticated'
    }
  ]
  const routesAuthByStatus = routesLinksAuth.filter(
    (route) => route.type === status
  )

  console.log(routesAuthByStatus)
  const routesLink = [
    {
      id: 1,
      label: 'Products',
      href: '/products/all'
    }
  ]

  return (
    <Box as="header" height={20}>
      <Flex
        alignItems={'center'}
        flex={{ base: 1 }}
        height="full"
        justifyContent={{ md: 'space-between' }}
        display={{ base: 'none', md: 'flex' }}
      >
        <Link width={{ base: 'full', md: 'auto' }} as={LinkRouter} to="/">
          <Text color={useColorModeValue('gray.800', 'white')}>Logo</Text>
        </Link>

        <Stack
          as="nav"
          direction="row"
          display={{ base: 'none', md: 'flex' }}
          spacing={12}
        >
          {routesLink.map(({ id, label, href }) => (
            <LinkRouter to={href} key={id}>
              <Text as="span" cursor="ponter" children={label} />
            </LinkRouter>
          ))}
        </Stack>
        <Search />
        <Box>
          {/* <Flex>
              <Avatar src="https://bit.ly/sage-adebayo" size="sm" />
              <Box ml="3">
                <Text fontWeight="bold">
                  Segun Adebayo
                  <Badge ml="1" colorScheme="green" >
                    New
                  </Badge>
                </Text>
                <Text fontSize="sm">UI Engineer</Text>
              </Box>
            </Flex> */}
          {/* {status !== 'authenticated' && ( */}
          <Menu>
            <MenuButton
              variant="white"
              as={IconButton}
              icon={<UserIcon width={24} />}
            />

            <MenuList>
              {/* {status !== 'authenticated'} */}
              {routesAuthByStatus.map((route) => (
                <MenuItem
                  key={route.id}
                  children={route.title}
                  icon={route.icon}
                  onClick={() => handleRedirect(route.title)}
                />
              ))}
            </MenuList>
          </Menu>
          {/* ))} */}

          {/* <Button
              variant="white"
              colorScheme="purple"
              color={'purple.200'}
              _hover={{ color: 'purple.600' }}
            > */}
          {/* <Avatar> */}
          {/* <Box></Box> */}
          <Badge as="button" onClick={() => navigate('/cart')}>
            <Avatar
              size="sm"
              bg="transparent"
              as="span"
              icon={<CartIcon width={24} height={24} />}
            >
              <AvatarBadge boxSize="1.25em" rounded="full" top="-12px">
                <Text fontSize="md">{cartItems.length}</Text>
              </AvatarBadge>
            </Avatar>
          </Badge>
          {/* <CartIcon width={24} /> */}
        </Box>
      </Flex>
      <Flex display={{ base: 'flex', md: 'none' }}>
        <MobileNav />
      </Flex>
    </Box>
  )
}
