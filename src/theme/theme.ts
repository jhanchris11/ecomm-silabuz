import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  styles: {
    global: {
      body: {
        //       minHeight: '100vh',
        margin: 0,
        backgroundColor: '#F0F1F7'
        //       color: 'black'
      }
    }
  },
  fonts: {
    // heading:
    body: `'Poppins',sans-serif`,
    heading: 'Poppins'
  },
  colors: {
    // primary: {
    //   ...theme.colors.red,
    //   100: "#fef0f0",
    //   400: "#F8F3E3",
    //   500: "#EE6464",
    // },

    // signIn: {
    //   primary: '#9061f9',
    //   secondary: '#7e3af2',
    //   tertiary: '#6c2bd9'
    // },
    google: {
      primary: '#4285F4',
      secondary: 'rgba(66, 133, 244,0.9 )'
    }
  }
})
