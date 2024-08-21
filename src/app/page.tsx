"use client";
import { Button, Flex, Input, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "./providers";

export default function Page() {
  const { data: Celuladata } = useQuery({
    queryFn: async () => await getCelulas(),
    queryKey: ["Celulas"],
  });

  const [tituloCelula, setTituloCelula] = useState("");

  const handleSaveCelula = async () => {
    try {
      await postCelula(tituloCelula);
      queryClient.invalidateQueries(["Celulas"]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteModulo = async (id) => {
    try {
      await deleteCelula(id);
      queryClient.invalidateQueries(["Celulas"]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDesabilitaModulo = async (id) => {
    try {
      await updateCelula(id);
      queryClient.invalidateQueries(["Celulas"]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex
        maxW="50%"
        borderWidth={"2px"}
        direction={"column"}
        gap={8}
        marginTop={20}
        alignItems={"center"}
      >
        <Input
          marginTop="5"
          variant="filled"
          maxW={"50%"}
          placeholder="Insira O título"
          value={tituloCelula}
          onChange={(e) => setTituloCelula(e.target.value)}
        />
        <Button maxW="30%" colorScheme="blue" onClick={handleSaveCelula}>
          Cadastrar
        </Button>
        <Table
          borderWidth={"2px"}
          variant="striped"
          colorScheme="blackAlpha"
          maxW="50%"
        >
          <Tbody>
            {Celuladata?.data?.map((celula) => (
              <Tr key={celula.id}>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteModulo(celula.id)}
                  >
                    Excluir
                  </Button>
                </Td>
                <Td>{celula.titulo}</Td>
                <Td>
                  <Button
                    colorScheme="blackAlpha"
                    onClick={() => handleDesabilitaModulo(celula.id)}
                  >
                    Desabilitar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

async function getCelulas() {
  const celulas = await fetch("http://localhost:3002/Celula");
  const json = await celulas.json();
  return json;
}

async function deleteCelula(id) {
  const response = await fetch(`http://localhost:3002/Celula/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar a celula");
  }

  return await response.json();
}

async function postCelula(titulo) {
  const response = await fetch("http://localhost:3002/Celula", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo }),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar a celula");
  }

  return await response.json();
}

async function updateCelula(id) {
  const response = await fetch(`http://localhost:3002/Celula/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo: "desabilitado",
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar a celula");
  }

  return await response.json();
}
