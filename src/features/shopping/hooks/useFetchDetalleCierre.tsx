import { useState } from "react"
import { JoinShoppingList } from "../../../interfaces/ShoppingInterface"
import { getDetalleCierre } from "../../../infrastructure/services/detalle-cierre.service"
import { DetalleCierre } from "../../../interfaces/DetalleCierreInterface"


export const useFetchDetalleCierre = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [detalleCierreList, setDetalleCierreList] = useState<DetalleCierre[]>()


    const fetchConsultaDetalleCierre = async (idListaCompra: number) => {

        try {
            const response: DetalleCierre[] = await getDetalleCierre(idListaCompra)
            console.log("response: "+JSON.stringify(response));

            setDetalleCierreList(response)
        } catch (error) {
            console.error("ERROR °°°°°°°°°°°° ", error.response.data);
            throw error;
        }

        setIsLoading(false)
    }

    const reloadListDetalleCierre = async (idListaCompra: number) => {
        setIsLoading(true);
        await fetchConsultaDetalleCierre(idListaCompra);
        setIsLoading(false);
    }; 


    return {
        reloadListDetalleCierre,
        isLoading,
        setIsLoading,
        detalleCierreList,
        fetchConsultaDetalleCierre
    }
}
