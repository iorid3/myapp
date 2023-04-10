import { useState, useEffect, useCallback, useContext } from "react";
import { useData } from "./api/customHooks";
import { getZodiacSign } from "../utils/zodiac";
import { fetchTarotCardData } from './api/tarot';

import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

function Landing() {
  const { users, setUsers, AllScopeInfo } = useData();
  const [explain, setExplain] = useState("");
  const [tarotCard, setTarotCard] = useState<any>(null);
  const [position, setPosition] = useState<any>();

  const handleAsk = useCallback(() => {
    if (users) {
      const description = AllScopeInfo.description;
      setExplain(description);
    }
    fetchTarotCardData().then((data) => {
      const randomPosition = Math.random() < 0.5 ? "reserved" : "upright";
      setPosition(randomPosition)
      setTarotCard(data.res[0]);
    });

  }, [users]);

  useEffect(() => {
    handleAsk();
  }, [handleAsk]);

  return (
    <Box bg="#000" minH="100vh">
      <Container maxW="container.md" pt="8" pb="8">
        <Heading mb="8" size="xl" color="#fff">
          Fortune Teller
        </Heading>
            <Button
              h="1.75rem"
              size="sm"
              bg="#2E5AAC"
              color="white"
              onClick={handleAsk}
              _hover={{ bg: "#162B4D" }}
            >
              Ask
            </Button>
        <Box mt="8">
          {users && (
            <Box
              bg="#1D253F"
              boxShadow="base"
              p="6"
              mb="4"
              rounded="md"
              textAlign="center"
            >
              <Text fontSize="xl" mb="4" color="white">
                Your Zodiac Sign: {getZodiacSign(users[0].birthday)}
              </Text>
              <Text mb="4" color="white">{explain}</Text>
              {tarotCard && (
                <Box mt="4" color="white">
                  <Text fontSize="xl" mb="4">
                    Your Tarot Card: {tarotCard.name} and position {position}
                  </Text>
                  {position === "upright"
                      ?<Text mb="4">Description: {tarotCard.desc}</Text>
                      :<Text mb="4">Description: {tarotCard.rdesc}</Text>}
               
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Landing;
