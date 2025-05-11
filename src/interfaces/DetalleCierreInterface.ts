export interface DetalleCierre {
	id:                number;
	idListaCompra:     number;
	usuarioDeudorId:   number;
	nombresDeudor:     string;
	apellidosDeudor:   string;
	usuarioAcreedorId: number;
	nombresAcreedor:   string;
	apellidosAcreedor: string;
	totalDeuda:        number;
	aprobado:          boolean;
	fechaAprobacion:   null;
	fechaCierre:       Date;
}

export interface CambiarEstadoDetalleCierreRequest {
  idDetalleCierre: number;
  aprobado: boolean;
}

export interface CambiarEstadoDetalleCierreResponse {
  id: number;
  aprobado: boolean;
}

