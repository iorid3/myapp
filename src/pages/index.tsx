import { Box, Spacer } from '@chakra-ui/react';
import AlertBox from "@/comps/AlertBox";
import SingIn from "@/comps/SignIn";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDir='row'
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <AlertBox />
      <SingIn />
    </Box>
  );
}