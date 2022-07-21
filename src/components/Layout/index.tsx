import React from 'react'
import { Container } from '@chakra-ui/react'
import { NavBar } from './NavBar'

interface MyProps {
  children: React.ReactNode
}
export const LayoutWrapper = ({ children }: MyProps) => {
  return (
    <Container maxWidth="container.xl">
      <NavBar />
      {children}
    </Container>
  )
}
