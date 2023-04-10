import React from "react";
import { Button, ButtonGroup, Box } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import Link from 'next/link'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const AlertBox = ({
  Heading = "Heading",
  children = "Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euturpis molestie, dictum est a, mattis tellus. Sed dignissim, metus necfringilla accumsan, risus sem sollicitudin lacus, ut interdum telluselit sed risus. Maecenas eget condimentum velit, sit amet feugiatlectus. Class aptent taciti sociosqu ad litora torquent per conubianostra.",
  buttonLabel = "Learn More",
  buttonHref = ()=>{'/'},
}) => {
  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        width={"500px"}
        height={"250px"}
        position={"relative"}
      >
        <Box
          className={inter.className}
          display={"flex"}
          alignItems={"flex-start"}
          gap={"16px"}
          padding={"16px"}
          width={"478px"}
          height={"215px"}
          position={"absolute"}
          flexDirection={"column"}
          top={0}
          left={0}
        >
          <Box
            width={"95px"}
            height={"29px"}
            fontSize={"24px"}
            top={"61px"}
            left={"16px"}
            lineHeight={"29px"}
            order={0}
          >
            {Heading}
          </Box>
          <Box
            width={"446px"}
            height={"99px"}
            order={1}
            fontWeight={400}
            lineHeight={"175%"}
            fontSize={"12px"}
            flexGrow={0}
          >{children}</Box>
          <Button
            colorScheme={"#ffffff"}
            maxW={"115px"}
            height={"23px"}
            border={"1px solid black"}
            borderRadius={"8px"}
            variant="outline"
            _hover={{ bg: "#DDEDEC" }}
            order={2}
            fontWeight={400}
            onClick={buttonHref}
          >
            {buttonLabel}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AlertBox;
