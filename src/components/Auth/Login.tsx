import {
  Flex,
  Box,
  Heading,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Alert,
  AlertIcon,
  FormErrorMessage
} from '@chakra-ui/react'
import { GoogleIcon } from '../../icons/Google'
import { Link as LinkRouter } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import {
  startLoginByEmailPassword,
  startSignInByGoogle
} from '../../redux/auth/thunk'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useMemo, useState } from 'react'
import { formValidationsLogin } from '../../helpers'

export const Login = () => {
  const dispatch = useAppDispatch()
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const { status, errorMessage } = useAppSelector((state) => state.auth)
  const {
    email,
    password,
    handleInputChange,
    isFormValid,
    emailValid,
    passwordValid
  } = useForm(
    {
      email: '',
      password: ''
    },
    formValidationsLogin
  )
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setFormSubmitted(true)
    if (!isFormValid) return
    dispatch(
      startLoginByEmailPassword({
        email,
        password
      })
    )
  }
  const isAuthenticating = useMemo(() => status === 'checking', [status])
  const handleGoogleSignIn = (): void => {
    dispatch(startSignInByGoogle())
  }

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" width="full" py={12} px={6}>
        <Stack align="center">
          <Text as="span">🌟</Text>
          <Heading fontSize={'4xl'}>Iniciar Sesión </Heading>
        </Stack>

        {errorMessage && (
          <Alert status="error">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}

        <Box boxShadow="lg" p={8} rounded="lg" bg="white">
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!emailValid && formSubmitted}>
                <FormLabel>Email </FormLabel>
                <Input
                  name="email"
                  value={email}
                  type="email"
                  placeholder="example@example.com"
                  onChange={handleInputChange}
                  autoComplete="off"
                />
                <FormErrorMessage>{emailValid}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!passwordValid && formSubmitted}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Ingrese su contraseña"
                  onChange={handleInputChange}
                  autoComplete="off"
                />
                <FormErrorMessage>{passwordValid}</FormErrorMessage>
              </FormControl>

              <Stack spacing={5}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  justify={'end'}
                >
                  <Link
                    as={LinkRouter}
                    to="/auth/register"
                    color={'purple.500'}
                  >
                    Crear Cuenta
                  </Link>
                </Stack>
                <Button
                  type="submit"
                  isLoading={isAuthenticating}
                  disabled={isAuthenticating}
                  colorScheme="purple.200"
                  bg="purple.500"
                  color={'white'}
                  _hover={{
                    bg: 'purple.400'
                  }}
                >
                  Sign in
                </Button>
                <Button
                  disabled={isAuthenticating}
                  onClick={handleGoogleSignIn}
                  colorScheme="google.primary"
                  leftIcon={<GoogleIcon width={16} />}
                  bg={'google.primary'}
                  color={'white'}
                  _hover={{
                    bg: 'google.secondary'
                  }}
                >
                  Google
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
