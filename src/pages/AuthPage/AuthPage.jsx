import { Container, Flex , VStack, Box, Image } from '@chakra-ui/react'
import React from 'react'
import AuthForm from '../../components/AuthForm/AuthForm'

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"centre"} alignItems={"centre"} px={"4"}>
        <Container maxW={"container.md"} padding={0}>
          <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
            <Box display={{ base: "none", md: "block" }}>
                <Image src="./auth.png" h={650} alt="Phone img" />
            </Box>

            {/* right hand side */}
            <VStack spacing={4} align={"stretch"}>
              <AuthForm />
              <Box textAlign={"center"}>Get the app.</Box>
              <Flex gap={5} justifyContent={"centre"}>
                <Image src='./playstore.png' h={"10"} alt= 'Playstore logo ' />
                <Image src='./microsoft.png' h={"10"} alt= 'Microsoft logo '/>
              </Flex>
            </VStack>
            </Flex>
        </Container>
    </Flex>
  )
}

export default AuthPage
