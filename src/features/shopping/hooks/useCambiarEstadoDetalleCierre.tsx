import { useState } from "react"
import { changeDetalleCierreEstado} from "../../../infrastructure/services/detalle-cierre.service"
import { CambiarEstadoDetalleCierreResponse, DetalleCierre } from "../../../interfaces/DetalleCierreInterface"


export const useCambiarEstadoDetalleCierre = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [estadoDetalleCierre, setEstadoDetalleCierre] = useState<CambiarEstadoDetalleCierreResponse>()


    const aprobarDetalleCierre = async (idDetalleCierre: number) => {

        try {
            const response  = await changeDetalleCierreEstado({aprobado: true, idDetalleCierre})
            console.log("response: "+JSON.stringify(response));

            setEstadoDetalleCierre(response)
        } catch (error) {
            console.error("ERROR °°°°°°°°°°°° ", error.response.data);
            throw error;
        }

        setIsLoading(false)
    }

    return {
        isLoading,
        setIsLoading,
        estadoDetalleCierre,
        aprobarDetalleCierre
    }
}
