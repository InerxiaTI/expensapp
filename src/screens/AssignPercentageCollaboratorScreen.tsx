import React, { useState } from 'react'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { Image, View } from 'react-native'
import { RootStackParams } from '../navigation/HomeStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import { AssignPercentageCollaboratorRequest, AssignPercentageParams, CollaboratorsParams } from '../interfaces/UserInterface';
import expenseBanner from '../../assets/expenseBanner.png';
import { GenericHeaderComponent } from '../components/GenericHeaderComponent'
import InputV1Component from '../components/inputs/InputV1Component'
import { useAssignPercentage } from '../hooks/useCollaborators'
import { ButtonV2Component } from '../components/buttons/ButtonV2Component'


interface AssignPercentageCollaboratorScreenProps extends StackScreenProps<RootStackParams, 'AssignPercentageCollaborator'> { }


const AssignPercentageCollaboratorScreen = ({ route, navigation }: AssignPercentageCollaboratorScreenProps) => {

	console.log("route.params: " + JSON.stringify(route.params));



	const assignPercentage: AssignPercentageParams = route.params as AssignPercentageParams


	console.log("########## porcentaje: " + JSON.stringify(assignPercentage));

	const { isLoading,
		setIsLoading,
		assignPercentageCollaborator,
		saveAssignPercentageCollaborator } = useAssignPercentage();


	const [percentage, setPercentage] = useState<string>(assignPercentage.collaborator.porcentaje?.toString());

	const handleOnChangeText = (value: string) => {

		try {
			console.log("value: ", value);
			const percentageNumber = Number(value)
			console.log("value 2: ", percentageNumber);

			if ((percentageNumber >= 0) && !(percentageNumber > 100)) {
				console.log("value 3: ");

				setPercentage(percentageNumber.toString());
				console.log("value: 4 VA AL BACK: ", percentage);

			}

		} catch (error) {

		}
	}

	const saveNewPercentage = async () => {

		const assignRequest: AssignPercentageCollaboratorRequest = {
			idListaCompras: assignPercentage.collaborator.idListaCompra,
			idUsuarioCreador: assignPercentage.idUsuarioCreador,
			idUsuarioColaborador: assignPercentage.collaborator.idUsuario,
			porcentaje: Number(percentage)
		}

		setIsLoading(true);

		try {
			await saveAssignPercentageCollaborator(assignRequest);
			setIsLoading(false);

			const collaboratorsParams: CollaboratorsParams = {

				porcentaje: Number(percentage)

			}

			navigation.navigate({
				name: 'Collaborators',
				params: collaboratorsParams,
				merge: true,
			});


		} catch (error) {
			console.error("Falla al guardar: " + error);
		}



	}

	return (
		<BaseScreenComponent>

			<GenericHeaderComponent showArrowBack title='Asignar porcentaje' />
			<View
				style={{
					borderWidth: 0,
					borderColor: 'red',
					paddingHorizontal: 28

				}}
			>

				{/* Imagen */}
				<View style={{
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

				<InputV1Component
					title='Colaborador'
					value={assignPercentage.collaborator.nombresUsuario}
					editable={false}
				/>

				<InputV1Component
					title='Porcentaje'
					placeholder='Ingrese el porcentaje'
					keyboardType='number-pad'
					onChangeText={handleOnChangeText}
					value={percentage}
				/>


				<ButtonV2Component
					onPress={() => saveNewPercentage()}
					title='Guardar'
				/>

			</View>

		</BaseScreenComponent>
	)
}

export default AssignPercentageCollaboratorScreen