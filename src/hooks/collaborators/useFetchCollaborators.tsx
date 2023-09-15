import { useCallback, useContext, useEffect, useState } from "react";
import { Collaborator, CollaboratorsFilterRequest } from "../../interfaces/UserInterface";
import { AuthContext } from "../../context/AuthContext";
import { getCollaborators } from "../../services/collaboratorService";
import { useFocusEffect } from "@react-navigation/native";
import { ShoppingContext } from "../../context/ShoppingContext";

export const useFetchCollaborators = (request: CollaboratorsFilterRequest) => {
  const { authState } = useContext(AuthContext);
  const { shoppingState, setIsFocusFetchShoppingLists } = useContext(ShoppingContext);

  const userLogged = authState.user

  const [isLoading, setIsLoading] = useState(true)
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])

  useFocusEffect(
    useCallback(() => {
      if (!shoppingState.isFocusFetchShoppingLists) {
        fetchCollaborators(request)
      }
      setIsFocusFetchShoppingLists(false)
    }, [])
  )

  const fetchCollaborators = async (request: CollaboratorsFilterRequest) => {

    console.log("RR LLamando a la API para traer listas de colaboradores: ", JSON.stringify(request));
    try {

      const response = await getCollaborators(request)
      response.sort((a, b) => {
        if (a.idUsuario === userLogged?.id) {
          return -1; // Coloca a primero si a es el usuario logueado
        }
        if (b.idUsuario === userLogged?.id) {
          return 1; // Coloca b primero si b es el usuario logueado
        }
        return 0; // Mantén el orden actual si ninguno es el usuario logueado
      });

      setCollaborators(response)

    } catch (error) {
      console.error("ERROR °°°°°°°°°°°° ", error.response.data);
      throw error;
    }
    setIsLoading(false)
  }

  const reloadCollaborators = async () => {
    setIsLoading(true);
    await fetchCollaborators(request);
    setIsLoading(false);
  };

  return {
    reloadCollaborators,
    fetchCollaborators,
    isLoading,
    collaborators
  }
}