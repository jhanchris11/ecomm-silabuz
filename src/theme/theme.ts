import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        backgroundColor: '#F0F1F7'
      }
    }
  },
  fonts: {
    body: `'Poppins',sans-serif`,
    heading: 'Poppins'
  },
  colors: {
    primary: '#6c63ff',
    google: {
      primary: '#4285F4',
      secondary: 'rgba(66, 133, 244,0.9 )'
    }
  }
})
