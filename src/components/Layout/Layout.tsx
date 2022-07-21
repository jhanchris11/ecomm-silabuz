import { VStack } from '@chakra-ui/react'
import { NavBar } from './NavBar'

export const Layout = () => {
  return (
    <>
      <VStack role="main">
        <NavBar />
      </VStack>
    </>
  )
}
