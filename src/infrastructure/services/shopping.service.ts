import expenseMateApi from "../api/expenseMateApi";


const deleteShopping = async (idShopping: number) => {
	console.log("LLamando a la API para eliminar una compra");
	try {
		const response = await expenseMateApi.delete(
			`/compra/eliminar-compra/${idShopping}`
		)

		return response.data

	} catch (error) {
		throw error;
	}
}


export {
    deleteShopping
}
