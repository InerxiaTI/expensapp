import { BuysList } from "../screens/HomeScreen";

export const listasCompras: BuysList[] = [
    { id: 1, fechaCierre: '1 enero 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 2, fechaCierre: '2 febrero 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 3, fechaCierre: '3 marzo 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 4, fechaCierre: '4 abril 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 5, fechaCierre: '50 mayo 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 6, fechaCierre: '51 junio 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 7, fechaCierre: '52 julio 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 8, fechaCierre: '53 agosto 2023', estado: 'PAGADO', monto: 513.233 },
]
export const listasCompras2: BuysList[] = [
    { id: 1, fechaCierre: '4 diciembre 2023', estado: 'PAGADO', monto: 72.223 },
    { id: 2, fechaCierre: '17 noviembre 2023', estado: 'PAGADO', monto: 72.000 },
    { id: 3, fechaCierre: '90 octubre 2023', estado: 'PAGADO', monto: 72.23 },
    { id: 4, fechaCierre: '42 septiembre 2023', estado: 'PAGADO', monto: 72.2333 },
    { id: 5, fechaCierre: '3 agosto 2023', estado: 'PAGADO', monto: 73.2323 },
    { id: 6, fechaCierre: '15 julio 2023', estado: 'PAGADO', monto: 73.2323 },
    { id: 7, fechaCierre: '12 junio 2023', estado: 'PAGADO', monto: 72.2323 },
    { id: 8, fechaCierre: '78 mayo 2023', estado: 'PAGADO', monto: 733.33 },
]
export const listasCompras3: BuysList[] = [
    { id: 1, fechaCierre: '24 mayo 2023', estado: 'PAGADO', monto: 13.444 },
    { id: 2, fechaCierre: '23 abril 2023', estado: 'PAGADO', monto: 13.44 },
    { id: 3, fechaCierre: '12 junio 2023', estado: 'PAGADO', monto: 13.44 },
    { id: 4, fechaCierre: '6 julio 2023', estado: 'PAGADO', monto: 13.444 },
    { id: 5, fechaCierre: '34 agosto 2023', estado: 'PAGADO', monto: 13.4444 },
    { id: 6, fechaCierre: '15 septiembre 2023', estado: 'PAGADO', monto: 13.44 },
    { id: 7, fechaCierre: '24 octubre 2023', estado: 'PAGADO', monto: 13.44 },
    { id: 8, fechaCierre: '24 diciembre 2023', estado: 'PAGADO', monto: 13.44 },
]


// Datos prueba para las compras de una lista de compras

export interface Shopping {
    id: number;
    concepto: string;
    comprador: string;
    valorCompra: string;
    cuantoDeben: string;
}

export const detalleListaCompras1: Shopping[] = [
    {id: 1, concepto: 'Internet', comprador: 'Pepito Perez', valorCompra: '23.909', cuantoDeben: '4.500'},
    {id: 2, concepto: 'Plan de claro', comprador: 'Pepito Perez', valorCompra: '9.000', cuantoDeben: '5.500'},
    {id: 3, concepto: 'PLan de tigo', comprador: 'Pepito Perez', valorCompra: '78.000', cuantoDeben: '6.500'},
    {id: 4, concepto: 'Mercado', comprador: 'Pepito Perez', valorCompra: '423.909', cuantoDeben: '7.500'},
    {id: 5, concepto: 'Arriendo', comprador: 'Pepito Perez', valorCompra: '623.909', cuantoDeben: '444.136.500'},
    {id: 6, concepto: 'Epm', comprador: 'Pepito Perez', valorCompra: '723.909', cuantoDeben: '4.500.999'},
    {id: 7, concepto: 'Pipeta de gas', comprador: 'Pepito Perez', valorCompra: '823.909', cuantoDeben: '774.500'},
    {id: 8, concepto: 'Comida en Cocorollo', comprador: 'Pepito Perez', valorCompra: '923.909', cuantoDeben: '74.500'},
]

export const detalleListaCompras2: Shopping[] = [
    {id: 1, concepto: 'Pollo Asado', comprador: 'Juanito Alimaña', valorCompra: '23.909', cuantoDeben: '4.500'},
    {id: 2, concepto: 'Frijoles', comprador: 'Juanito Alimaña', valorCompra: '9.000', cuantoDeben: '5.500'},
    {id: 3, concepto: 'Desayuno Santandereano servicios publicos', comprador: 'Juanito Alimaña', valorCompra: '78.000', cuantoDeben: '6.500'},
    {id: 4, concepto: 'Chorizo', comprador: 'Juanito Alimaña', valorCompra: '423.909', cuantoDeben: '7.500'},
    {id: 5, concepto: 'Carne asada SOLOMO', comprador: 'Juanito Alimaña', valorCompra: '623.909', cuantoDeben: '444.136.500.900'},
    {id: 6, concepto: 'Papitas', comprador: 'Juanito Alimaña', valorCompra: '723.909', cuantoDeben: '4.500.999'},
    {id: 7, concepto: 'Gaseosa', comprador: 'Juanito Alimaña', valorCompra: '823.909', cuantoDeben: '774.500'},
    {id: 8, concepto: 'Botella de agua', comprador: 'Juanito Alimaña', valorCompra: '923.909', cuantoDeben: '74.500'},
]

export const detalleListaCompras3: Shopping[] = [
    {id: 1, concepto: 'Guia', comprador: 'Guillermo Alarcon', valorCompra: '23.909', cuantoDeben: '4.500'},
    {id: 2, concepto: 'Guia 2', comprador: 'Guillermo Alarcon', valorCompra: '9.000', cuantoDeben: '5.500'},
    {id: 3, concepto: 'Senderismo', comprador: 'Guillermo Alarcon', valorCompra: '78.000', cuantoDeben: '6.500'},
    {id: 4, concepto: 'Vuelos', comprador: 'Guillermo Alarcon', valorCompra: '423.909', cuantoDeben: '7.500'},
    {id: 5, concepto: 'Pasajes aeropuerto a casa por mi y por milena y por veronica', comprador: 'Guillermo Alarcon', valorCompra: '623.909', cuantoDeben: '444.136.500'},
    {id: 6, concepto: 'Aeropuerto a hotel', comprador: 'Guillermo Alarcon', valorCompra: '723.909', cuantoDeben: '4.500.999'},
    {id: 7, concepto: 'Propina', comprador: 'Guillermo Alarcon', valorCompra: '823.909', cuantoDeben: '774.500'},
    {id: 8, concepto: 'Subida teleferico', comprador: 'Guillermo Alarcon', valorCompra: '923.909', cuantoDeben: '74.500'},
]
