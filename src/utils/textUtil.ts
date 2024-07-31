export const sliceText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

}

export const parseDate = (date: string) => {
  const fechaOriginal = new Date(date);
  const fechaLocal = new Date(fechaOriginal.getTime() + fechaOriginal.getTimezoneOffset() * 60000);

  const año = fechaLocal.getFullYear();
  const mes = String(fechaLocal.getMonth() + 1).padStart(2, '0'); // Se agrega 1 porque los meses comienzan desde 0
  const dia = String(fechaLocal.getDate()).padStart(2, '0');

  const fechaFormateada = `${año}-${mes}-${dia}`;

  console.log(fechaFormateada); // Salida: "2023-11-23"
  return fechaFormateada;
}

export const mapStatusList = (statusList: string) => {
  switch (statusList){
    case 'PENDIENTE': 
      return 'ABIERTO'
    case 'EN_CIERRE':
      return 'EN CIERRE'
    default:
      return statusList
  }
}


