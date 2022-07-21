import { LoginIcon } from '../icons/Login'
import { LogoutIcon } from '../icons/Logout'
import { RegisterIcon } from '../icons/Register'
import { UserIcon } from '../icons/User'
const routesLinksAuth = [
  {
    id: 1,
    title: 'Login',
    href: '/auth/login',
    icon: LoginIcon,
    type: 'unauthenticated'
  },
  {
    id: 2,
    title: 'Register',
    href: '/auth/register',
    icon: RegisterIcon,
    type: 'unauthenticated'
  },
  {
    id: 3,
    title: 'Mi perfil',
    href: '/profile',
    icon: UserIcon,
    type: 'authenticated'
  },
  {
    id: 4,
    title: 'Logout',
    href: '/profile',
    icon: LogoutIcon,
    type: 'authenticated'
  }
]

const routesLink = [
  {
    id: 1,
    label: 'Products',
    href: '/products/all'
  }
]

export { routesLinksAuth, routesLink }
