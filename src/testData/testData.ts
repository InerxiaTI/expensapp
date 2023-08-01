
// LISTAS DE COMPRAS

export interface ShoppingList {
    id: number,
    fechaCierre: string,
    estado: string,
    monto: number,
}


export const listasCompras: ShoppingList[] = [
    { id: 1, fechaCierre: '1 enero 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 2, fechaCierre: '2 febrero 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 3, fechaCierre: '3 marzo 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 4, fechaCierre: '4 abril 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 5, fechaCierre: '50 mayo 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 6, fechaCierre: '51 junio 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 7, fechaCierre: '52 julio 2023', estado: 'PAGADO', monto: 513.233 },
    { id: 8, fechaCierre: '53 agosto 2023', estado: 'PAGADO', monto: 513.233 },
]


//SHOPPERS

// prueba
export interface Shoppers {
    id: number;
    nombre: string;
    dineroGastado: string;
    dineroQueLeDeben: string;
    porcentaje: string
}

export const shoppers: Shoppers[] = [
    { id: 1, nombre: 'Pepito Perez', dineroGastado: '10.567.900', dineroQueLeDeben: '12.000', porcentaje: '45' },
    { id: 2, nombre: 'Juanito Alimaña', dineroGastado: '200.500', dineroQueLeDeben: '342.200.999', porcentaje: '25' },
    { id: 3, nombre: 'Guillermo Alarcon', dineroGastado: '19.800', dineroQueLeDeben: '3.500', porcentaje: '30' },
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
    { id: 1, concepto: 'Internet', comprador: 'Pepito Perez', valorCompra: '23.909', cuantoDeben: '4.500' },
    { id: 2, concepto: 'Plan de claro', comprador: 'Pepito Perez', valorCompra: '9.000', cuantoDeben: '5.500' },
    { id: 3, concepto: 'PLan de tigo', comprador: 'Pepito Perez', valorCompra: '78.000', cuantoDeben: '6.500' },
    { id: 4, concepto: 'Mercado', comprador: 'Pepito Perez', valorCompra: '423.909', cuantoDeben: '7.500' },
    { id: 5, concepto: 'Arriendo', comprador: 'Pepito Perez', valorCompra: '623.909', cuantoDeben: '444.136.500' },
    { id: 6, concepto: 'Epm', comprador: 'Pepito Perez', valorCompra: '723.909', cuantoDeben: '4.500.999' },
    { id: 7, concepto: 'Pipeta de gas', comprador: 'Pepito Perez', valorCompra: '823.909', cuantoDeben: '774.500' },
    { id: 8, concepto: 'Comida en Cocorollo', comprador: 'Pepito Perez', valorCompra: '923.909', cuantoDeben: '74.500' },
]

export const detalleListaCompras2: Shopping[] = [
    { id: 1, concepto: 'Pollo Asado', comprador: 'Juanito Alimaña', valorCompra: '23.909', cuantoDeben: '4.500' },
    { id: 2, concepto: 'Frijoles', comprador: 'Juanito Alimaña', valorCompra: '9.000', cuantoDeben: '5.500' },
    { id: 3, concepto: 'Desayuno Santandereano servicios publicos', comprador: 'Juanito Alimaña', valorCompra: '78.000', cuantoDeben: '6.500' },
    { id: 4, concepto: 'Chorizo', comprador: 'Juanito Alimaña', valorCompra: '423.909', cuantoDeben: '7.500' },
    { id: 5, concepto: 'Carne asada SOLOMO', comprador: 'Juanito Alimaña', valorCompra: '623.909', cuantoDeben: '444.136.500.900' },
    { id: 6, concepto: 'Papitas', comprador: 'Juanito Alimaña', valorCompra: '723.909', cuantoDeben: '4.500.999' },
    { id: 7, concepto: 'Gaseosa', comprador: 'Juanito Alimaña', valorCompra: '823.909', cuantoDeben: '774.500' },
    { id: 8, concepto: 'Botella de agua', comprador: 'Juanito Alimaña', valorCompra: '923.909', cuantoDeben: '74.500' },
]

export const detalleListaCompras3: Shopping[] = [
    { id: 1, concepto: 'Guia', comprador: 'Guillermo Alarcon', valorCompra: '23.909', cuantoDeben: '4.500' },
    { id: 2, concepto: 'Guia 2', comprador: 'Guillermo Alarcon', valorCompra: '9.000', cuantoDeben: '5.500' },
    { id: 3, concepto: 'Senderismo', comprador: 'Guillermo Alarcon', valorCompra: '78.000', cuantoDeben: '6.500' },
    { id: 4, concepto: 'Vuelos', comprador: 'Guillermo Alarcon', valorCompra: '423.909', cuantoDeben: '7.500' },
    { id: 5, concepto: 'Pasajes aeropuerto a casa por mi y por milena y por veronica', comprador: 'Guillermo Alarcon', valorCompra: '623.909', cuantoDeben: '444.136.500' },
    { id: 6, concepto: 'Aeropuerto a hotel', comprador: 'Guillermo Alarcon', valorCompra: '723.909', cuantoDeben: '4.500.999' },
    { id: 7, concepto: 'Propina', comprador: 'Guillermo Alarcon', valorCompra: '823.909', cuantoDeben: '774.500' },
    { id: 8, concepto: 'Subida teleferico', comprador: 'Guillermo Alarcon', valorCompra: '923.909', cuantoDeben: '74.500' },
]
