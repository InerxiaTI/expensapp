import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text,  TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import expenseBanner from '../../assets/expenseBanner.png';
import { getFormatedDate } from 'react-native-modern-datepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';

import InputV1Component from '../components/inputs/InputV1Component';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/HomeStackNavigator';
import { CreateShoppingRequest, AddExpenseParams } from '../interfaces/ShoppingInterface';
import { Collaborator } from '../interfaces/UserInterface';
import { ButtonV2Component } from '../components/buttons/ButtonV2Component';
import { useNewShopping } from '../hooks/shoppingList/useNewShopping';


interface AddExpenseScreenProps extends StackScreenProps<RootStackParams, 'AddExpense'> { }


const AddExpenseScreen = ({ route, navigation }: AddExpenseScreenProps) => {

	const { isLoading, setIsLoading, shopping, saveShopping } = useNewShopping()

	const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator>({});

	const [compra, setCompra] = useState("");
	const [valorCompra, setValorCompra] = useState("");
	const [habilitarBoton, setHabilitarBoton] = useState(false)


	const addExpenseParams: AddExpenseParams = route.params

	console.log("createShopping: " + JSON.stringify(addExpenseParams));

	const handleCompraChange = (text: string) => {
		setCompra(text);
		validateForm(valorCompra, text);
	};
	const handleValorCompraChange = (text: string) => {
		setValorCompra(text);
		validateForm(compra, text);
	};

	const validateForm = (compra: string, valor: string) => {
    const formIsValid = compra.trim() !== '' && valor.trim() !== '';
    setHabilitarBoton(formIsValid);
  };

	const today = new Date();


	const [date, setDate] = useState(today);
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	const showDatepicker = () => {
		setShow(true);
	};

	const handleOnPress = async () => {

		const createShoppig = addExpenseParams.createShoppingRequest
		const idUsuarioCompra = selectedCollaborator.idUsuario ? selectedCollaborator.idUsuario : createShoppig?.idUsuarioCompra

		const createShoppingRequest: CreateShoppingRequest = {
			...createShoppig,
			idUsuarioCompra,
			fechaCompra: getFormatedDate(date, "YYYY-MM-DD"),
			valor: Number(valorCompra),
			descripcion: compra
		}


		console.log("createShoppingRequest: " + JSON.stringify(createShoppingRequest));

		setIsLoading(true);

		try {
			await saveShopping(createShoppingRequest);
			setIsLoading(false);

			// navigation.dispatch() se quiere llamar la función para actualizar las listas de compras
			navigation.goBack() // Volver a la pantalla anterior

		} catch (error) {
			console.error("Falla al guardar: " + error);
		}

	}

	useEffect(() => {
		if (route.params && route.params.collaborator) {
			setSelectedCollaborator(route.params.collaborator);
		}
	}, [route.params]);

	return (

		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingScrollView
				containerStyle={styles.container}
				contentContainerStyle={styles.content}
				stickyFooter={
					<ButtonV2Component 
						title='Agregar gasto' 
						onPress={handleOnPress} 
						isLoading={isLoading}
						habilitarBoton={habilitarBoton}

					/>
				}>

				{/* Imagen */}
				<View style={{
					flex: 1,
					width: '100%',
					alignItems: 'center',
					borderWidth: 0,
					borderColor: 'red'
				}}>
					<Image
						source={expenseBanner}
						style={{ width: 100, height: 100 }}
					/>
				</View>

				<View
					style={{
						borderWidth: 1,
						borderColor: 'red',
						flexDirection: 'row',
						gap: 10
					}}
				>
					<View
						style={{
							flex: 1,
							borderWidth: 0,
							borderColor: 'blue'
						}}
					>
						<Text style={{ ...styles.textInfoInput, fontSize: 20 }}>Fecha de compra</Text>
						<View style={styles.searchContainer}>
							<TouchableOpacity
								style={{
									flex: 1,
									paddingLeft: 15,
									height: 50,
									justifyContent: 'center',
									borderWidth: 0,
									borderColor: 'red',
								}}
								onPress={showDatepicker}
							>
								<Text style={{
									fontSize: 14,
									lineHeight: 20,
									letterSpacing: 1,
									fontWeight: '500',
									color: 'lightgrey',
								}}>{getFormatedDate(date, "YYYY-MM-DD")}</Text>
							</TouchableOpacity>

						</View>
					</View>

					<View
						style={{
							flex: 1,
							borderWidth: 0,
							borderColor: 'white'
						}}
					>
						<Text style={{ ...styles.textInfoInput, fontSize: 20 }}>Comprador</Text>
						<View style={styles.searchContainer}>
							<TouchableWithoutFeedback
								onPress={() => { navigation.navigate('AddCollaboratorAsShopper', addExpenseParams!.createShoppingRequest!) }}
							>
								<View
									style={{
										flex: 1,
										flexDirection: 'row',
										paddingHorizontal: 15,
										height: 50,
										justifyContent: 'space-between',
										alignItems: 'center',
										borderWidth: 0,
										borderColor: 'red',
									}}
								>
									<Text style={{
										fontSize: 14,
										lineHeight: 20,
										letterSpacing: 1,
										fontWeight: '500',
										color: 'lightgrey',
									}}>{selectedCollaborator.nombresUsuario !== undefined ? selectedCollaborator.nombresUsuario : 'Yo'}</Text>
									<MaterialCommunityIcons name="chevron-down" size={20} color='white' />
								</View>
							</TouchableWithoutFeedback>

						</View>
					</View>

				</View>


				{show && (
					<DateTimePicker
						maximumDate={today}
						testID="dateTimePicker"
						value={date}
						mode='date'
						is24Hour={true}
						onChange={onChange}
					/>
				)}



				<InputV1Component
					title='Compra'
					placeholder='Compra'
					onChangeText={handleCompraChange}
					value={compra}
				/>

				<InputV1Component
					title='Valor'
					placeholder='Valor'
					onChangeText={handleValorCompraChange}
					value={valorCompra}
					keyboardType='numeric'
					autoCorrect={false}
				/>

			</KeyboardAvoidingScrollView>
		</SafeAreaView>

	)
}



const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 5,
		marginBottom: 16,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#6B7280',
		backgroundColor: '#201F21'
	},
	textInfoInput: {
		color: '#6B7280',
		fontSize: 24,
		fontWeight: '700',
	},
	container: {
		flex: 1,
	},
	content: {
		padding: 16,
	},
	title: {
		color: 'black',
	},
	textInput: {
		marginTop: 16,
		backgroundColor: 'black',
	},
	footer: {
		padding: 16,
		backgroundColor: 'white',
	},
})
export default AddExpenseScreen