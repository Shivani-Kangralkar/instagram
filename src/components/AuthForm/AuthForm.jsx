import React, { useState } from "react";
import {
  Text,
  VStack,
  Box,
  Image,
  Flex,
} from "@chakra-ui/react";
import Login from "./Login";
import SingUp from "./SingUp";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  const [isLogin, setIslogin] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="logo.png" h={24} cursor={"pointer"} alt="instagram" />

          {isLogin ? <Login /> : <SingUp />}

          {/* ........OR........... */}

          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={"2"} h={"1px"} bg={"gray.400"} />
            <Text>OR</Text>
            <Box flex={"2"} h={"1px"} bg={"gray.400"} />
          </Flex>

          <GoogleAuth prefix={isLogin ? "Log in" : "Sign in"}/>
        </VStack>
      </Box>

      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have a account?" : "Already have a account?"}
          </Box>
          <Box
            onClick={() => setIslogin(!isLogin)}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {isLogin ? "Sign up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
