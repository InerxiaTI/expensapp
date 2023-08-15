import React, { useState } from 'react'
import { Button, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import BaseScreenComponent from '../components/BaseScreenComponent'
import expenseBanner from '../../assets/expenseBanner.png';
import { COLORS } from '../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import HeaderAddExpenseComponent from '../components/HeaderAddExpenseComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';

import ButtonV1Component from '../components/buttons/ButtonV1Component';
import InputV1Component from '../components/inputs/InputV1Component';



const AddExpenseScreen = () => {
	const navigator = useNavigation();

	const [selected, setSelected] = useState("");
	console.log("comprador: " + selected);

	const data = [
		{ key: '1', value: 'Mobiles' },
		{ key: '2', value: 'Appliances' },
		{ key: '3', value: 'Cameras' },
		{ key: '4', value: 'Computers' },
		{ key: '5', value: 'Vegetables' },
		{ key: '6', value: 'Diary Products' },
		{ key: '7', value: 'Drinks' },
	]

	const [openStartDatePicker, setOpenStartDatePicker] = useState(false);

	const today = new Date();
	const startDate = getFormatedDate(
		today,
		"YYYY/MM/DD"
	);
	const [startedDate, setStartedDate] = useState(startDate);
	const [selectedStartDate, setSelectedStartDate] = useState(startedDate);

	function handleChangeStartDate(propDate: string) {
		setStartedDate(propDate);
	}

	// cerrar o abrir modal
	const handleOnPressStartDate = () => {
		setOpenStartDatePicker(!openStartDatePicker);
	};

	return (

		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingScrollView
				containerStyle={styles.container}
				contentContainerStyle={styles.content}
				stickyFooter={
					<ButtonV1Component title='Agregar gasto' />
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

				<InputV1Component title='Fecha de compra' placeholder='Fecha de compra'/>
				<InputV1Component title='Comprador' placeholder='Comprador'/>
				<InputV1Component title='Compra' placeholder='Compra'/>
				<InputV1Component title='valor' placeholder='valor'/>
				<InputV1Component title='Tipo de compra' placeholder='tipo de compra'/>

			</KeyboardAvoidingScrollView>
		</SafeAreaView>

	)
}



const styles = StyleSheet.create({
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