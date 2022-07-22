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
  FormErrorMessage,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useForm } from '../../hooks/useForm'
import { Link as LinkRouter } from 'react-router-dom'
import { startCreatingUserByEmailPassword } from '../../redux/auth/thunk'
import { useMemo, useState } from 'react'
import { formValidationsRegister } from '../../helpers'

export const Register = () => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const { status, errorMessage } = useAppSelector((state) => state.auth)
  const isAuthenticating = useMemo(() => status === 'checking', [status])
  const {
    email,
    displayName,
    password,
    formState,
    handleInputChange,
    isFormValid,
    emailValid,
    displayNameValid,
    passwordValid
  } = useForm(
    {
      displayName: '',
      email: '',
      password: ''
    },
    formValidationsRegister
  )
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setFormSubmitted(true)
    if (!isFormValid) return
    dispatch(startCreatingUserByEmailPassword(formState))
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
              <FormControl isInvalid={!!displayNameValid && formSubmitted}>
                <FormLabel>Fullname </FormLabel>
                <Input
                  name="displayName"
                  value={displayName}
                  type="displayName"
                  placeholder="Ingrese su nombre completo"
                  onChange={handleInputChange}
                  autoComplete="off"
                />

                <FormErrorMessage>{displayNameValid}</FormErrorMessage>
              </FormControl>
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
                  <Link as={LinkRouter} to="/auth/login" color={'purple.500'}>
                    Sign In
                  </Link>
                </Stack>
                <Button
                  isLoading={isAuthenticating}
                  loadingText="Loading"
                  disabled={isAuthenticating}
                  type="submit"
                  colorScheme="purple.200"
                  bg="purple.500"
                  color={'white'}
                  _hover={{
                    bg: 'purple.400'
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
