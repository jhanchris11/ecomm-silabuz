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
import { routesLink, routesLinksAuth } from '../../content/NavBar'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CartIcon } from '../../icons/Cart'
import { UserIcon } from '../../icons/User'

import { startLogout } from '../../redux/auth/thunk'
import { Search } from '../commons/Search'
import { MobileNav } from './MobileNav'

export const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.auth)
  const { cartItems } = useAppSelector((state) => state.cart)

  const handleRedirect = (to: string) => {
    if (to === 'Logout') {
      dispatch(startLogout())
    }
  }

  const routesAuthByStatus = routesLinksAuth.filter(
    (route) => route.type === status
  )

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
          <Menu>
            <MenuButton
              variant="white"
              as={IconButton}
              icon={<UserIcon width={24} />}
            />

            <MenuList>
              {routesAuthByStatus.map((route) => (
                <MenuItem
                  key={route.id}
                  children={route.title}
                  icon={<route.icon />}
                  onClick={() => handleRedirect(route.title)}
                />
              ))}
            </MenuList>
          </Menu>

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
        </Box>
      </Flex>
      <Flex display={{ base: 'flex', md: 'none' }}>
        <MobileNav />
      </Flex>
    </Box>
  )
}
