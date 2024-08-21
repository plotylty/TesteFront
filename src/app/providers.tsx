"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <ChakraProvider>{children} </ChakraProvider>
    </QueryClientProvider>
  );
};

export const queryClient = new QueryClient();
