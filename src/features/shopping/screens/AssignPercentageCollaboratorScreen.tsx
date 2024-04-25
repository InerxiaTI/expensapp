import React, { useState } from 'react'
import BaseScreenComponent from '../../../components/BaseScreenComponent'
import { Image, View } from 'react-native'
import { RootStackParams } from '../../../navigation/MainStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import { AssignPercentageCollaboratorRequest, AssignPercentageParams, CollaboratorsParams } from '../../../interfaces/UserInterface';
import expenseBanner from '../../../../assets/expenseBanner.png';
import { GenericHeaderComponent } from '../../../components/GenericHeaderComponent'
import InputV1Component from '../../../components/inputs/InputV1Component'
import { ButtonV2Component } from '../../../components/buttons/ButtonV2Component'
import { useAssignPercentage } from '../hooks/useAssignPercentage'


interface AssignPercentageCollaboratorScreenProps extends StackScreenProps<RootStackParams, 'AssignPercentageCollaborator'> { }


const AssignPercentageCollaboratorScreen = ({ route, navigation }: AssignPercentageCollaboratorScreenProps) => {

	const [habilitarBoton, setHabilitarBoton] = useState(true)

	const assignPercentage: AssignPercentageParams = route.params as AssignPercentageParams

	const { isLoading,
		setIsLoading,
		assignPercentageCollaborator,
		saveAssignPercentageCollaborator } = useAssignPercentage();


	const [percentage, setPercentage] = useState<string>(assignPercentage.collaborator.porcentaje?.toString());

	React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'white',
      },
      headerShown: true,
      header: () => (
				<GenericHeaderComponent showArrowBack title='Asignar porcentaje' />
      ),

    });
  }, [navigation]);

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
		setHabilitarBoton(false)


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
		} finally {
			setHabilitarBoton(true)

		}



	}

	return (
		<BaseScreenComponent>
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
					value={assignPercentage.collaborator.nombres}
					editable={false}
				/>

				<InputV1Component
					showPencil
					title='Porcentaje'
					placeholder='Ingrese el porcentaje'
					keyboardType='number-pad'
					onChangeText={handleOnChangeText}
					value={percentage}
				/>

				<ButtonV2Component
					onPress={() => saveNewPercentage()}
					title='Guardar'
					habilitarBoton={habilitarBoton}
					isLoading={isLoading}
				/>

			</View>

		</BaseScreenComponent>
	)
}

export default AssignPercentageCollaboratorScreen
