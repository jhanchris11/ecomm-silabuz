import { Route, Routes, Navigate } from 'react-router-dom'
import { LayoutWrapper } from '../components/Layout'
import { NavBar } from '../components/Layout/NavBar'

import { ListProducts } from '../components/Products'
import { ProductDetail } from '../components/Products/ProductDetail'
import { Cart } from '../pages/Cart'
import { Home } from '../pages/Home'

export const EcommerceRoute = () => {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/all" element={<ListProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </LayoutWrapper>
  )
}
