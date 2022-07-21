import { Image, VStack } from '@chakra-ui/react'
interface MyProps {
  children: React.ReactNode
}
export const Section = ({ children }: MyProps) => {
  return (
    <VStack height="auto" overflow="hidden" position="relative">
      {/* <Box></Box> */}
      {children}
      <Image
        alt="Clothing shop"
        src="https://ouch-cdn2.icons8.com/UuHEbfaWTxYDfB0_Rq2NBus_qc1N75YNPgEw7C3HqtE/rs:fit:256:275/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTYy/LzRkMjEyOThjLWQ2/ZTAtNDRhNi04ZDlm/LWQzZDI4YzA3ZTNm/YS5zdmc.png"
      />
    </VStack>
  )
}
