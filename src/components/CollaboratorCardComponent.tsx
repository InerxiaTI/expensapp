import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ApproveRejectCollaboratorRequest, AssignPercentageParams, Collaborator } from "../interfaces/UserInterface";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from '@react-navigation/native';
import { useApproveRejectCollaborators } from '../features/shopping/hooks/useApproveRejectCollaborators';


interface CollaboratorCardProps {
	collaborator: Collaborator;
	idUsuarioCreador: number;
	estadoLista: string;
	updateCollaboratorsList: () => void;
	actionButtom?: () => void
}

const CollaboratorCardComponent = ({
	collaborator,
	idUsuarioCreador,
	updateCollaboratorsList, estadoLista, actionButtom }: CollaboratorCardProps) => {

	const navigator = useNavigation();

	const { authState } = useContext(AuthContext);
	const userLogged = authState.user
	console.log("idUsuarioCreador: " + idUsuarioCreador);
	console.log("userLogged: " + userLogged?.id);

	const { setIsLoading, saveApproveRejectCollaborator } = useApproveRejectCollaborators();


	const [disableButton, setDisableButton] = useState(true);
	const [disableButtonCard, setDisableButtonCard] = useState(true);
	const [colorIcon, setColorIcon] = useState('grey');


	const rejectCollaborator = async () => {
		console.log("rechazar");

		const rejectRequest: ApproveRejectCollaboratorRequest = {
			aprobar: false,
			idUsuarioCreador,
			idUsuarioColaborador: collaborator.idUsuario,
			idListaCompras: collaborator.idListaCompra
		}

		// setIsDisabled(true);
		setIsLoading(true);

		try {
			await saveApproveRejectCollaborator(rejectRequest);
			setIsLoading(false);
			updateCollaboratorsList()
			// getShoppingLists(user!)
			// // navigation.dispatch() se quiere llamar la función para actualizar las listas de compras
			// navigation.goBack() // Volver a la pantalla anterior

		} catch (error) {
			console.error("Falla al guardar: " + error);
		}


	}

	const approveCollaborator = async () => {
		console.log("aprobar");

		const approvetRequest: ApproveRejectCollaboratorRequest = {
			aprobar: true,
			idUsuarioCreador,
			idUsuarioColaborador: collaborator.idUsuario,
			idListaCompras: collaborator.idListaCompra

		}

		// setIsDisabled(true);
		setIsLoading(true);

		try {
			await saveApproveRejectCollaborator(approvetRequest);
			setIsLoading(false);
			updateCollaboratorsList()

			// getShoppingLists(user!)
			// // navigation.dispatch() se quiere llamar la función para actualizar las listas de compras
			// navigation.goBack() // Volver a la pantalla anterior

		} catch (error) {
			console.error("Falla al guardar: " + error);
		}


	}

	const goToAssignPercentageScreen = () => {

		const assignPercentage: AssignPercentageParams = {
			collaborator,
			idUsuarioCreador,
		}

		navigator.setOptions({
			updateCollaboratorsList: updateCollaboratorsList
		});
		navigator.navigate('AssignPercentageCollaborator', assignPercentage)
	}



	useEffect(() => {

		if (idUsuarioCreador === userLogged?.id) {
			setColorIcon('white');
			setDisableButton(false)
		}

		if (collaborator.estado === 'APROBADO' && idUsuarioCreador === userLogged?.id
			&& estadoLista === 'CONFIGURANDO') {
			setDisableButtonCard(false)
		}

		if (actionButtom?.length !== undefined) {
			setDisableButtonCard(false)
		}

	})

	return (

		<TouchableOpacity
			disabled={disableButtonCard}
			onPress={() => actionButtom?.length == undefined ? goToAssignPercentageScreen() : actionButtom()}
			style={{
				backgroundColor: '#262626',
				height: 50,
				borderRadius: 8,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingHorizontal: 20,
				marginVertical: 5
			}}
		>
			<Text style={styles.mainText} >{collaborator.nombres} {collaborator.apellidos}</Text>
			{
				collaborator.estado === 'APROBADO' ?
					<Text style={styles.mainText} >{collaborator.porcentaje}%</Text>
					:
					<View
						style={{
							flexDirection: 'row',
							gap: 20
						}}
					>
						<TouchableOpacity
							onPress={() => rejectCollaborator()}
							disabled={disableButton}
						>
							<MaterialCommunityIcons name='cancel' size={30} color={colorIcon} />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => approveCollaborator()}
							disabled={disableButton}
						>
							<MaterialCommunityIcons name='check-circle' size={30} color={colorIcon} />
						</TouchableOpacity>
					</View>

			}
		</TouchableOpacity>


	);
};

const styles = StyleSheet.create({
	mainText: {
		color: '#6B7280'
	}

});

export default CollaboratorCardComponent
