import { CambiarEstadoDetalleCierreRequest, CambiarEstadoDetalleCierreResponse, DetalleCierre } from "../../interfaces/DetalleCierreInterface";
import { GenericResponseV2 } from "../../interfaces/ShoppingInterface";
import expenseMateApi from "../api/expenseMateApi";


const getDetalleCierre = async (idListaCompra: number) => {
  try {
    const response = await expenseMateApi.get<GenericResponseV2<DetalleCierre[]>>(`/detalle-cierre/consultar-detalle-cierre/${idListaCompra}`);
    return response.data.body;
  } catch (error) {
    console.error("ERROR °°°°°°°°°°°° ", error.response?.data || error.message);
    throw error;
  }
};

const changeDetalleCierreEstado = async (data: CambiarEstadoDetalleCierreRequest) => {
  try {
    const response = await expenseMateApi.put<GenericResponseV2<CambiarEstadoDetalleCierreResponse>>(
      '/detalle-cierre/cambiar-estado-detalle-cierre',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.body;
  } catch (error) {
    console.error('ERROR °°°°°°°°°°°° ', error.response?.data || error.message);
    throw error;
  }
};

export {
	getDetalleCierre,
  changeDetalleCierreEstado
}
