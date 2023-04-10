import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "./api/sessionContext";
import {DataContextProvider} from "./api/customHooks";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider>
        <DataContextProvider>
          <Component {...pageProps} />
        </DataContextProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}
