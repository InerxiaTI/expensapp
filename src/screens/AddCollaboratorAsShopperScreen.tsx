import React from 'react'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/MainStackNavigator'
import { CreateShoppingRequest } from '../interfaces/ShoppingInterface'
import { Collaborator, CollaboratorsFilterRequest } from '../interfaces/UserInterface'
import { useFetchCollaborators } from '../hooks/collaborators/useFetchCollaborators'
import CollaboratorCardComponent from '../components/CollaboratorCardComponent'
import { GenericHeaderComponent } from '../components/GenericHeaderComponent'
import { infoLog } from '../utils/HandlerError'

export interface AddCollaboratorAsShopperParams {
	createShoppingRequest: CreateShoppingRequest,
	idUsuarioCreador: number,
	estadoLista: string
}

interface AddCollaboratorAsShopperProps extends StackScreenProps<RootStackParams, 'AddCollaboratorAsShopper'> { }

const AddCollaboratorAsShopperScreen = ({ route, navigation }: AddCollaboratorAsShopperProps) => {
	const addCollaboratorsAsShopper: AddCollaboratorAsShopperParams = route.params
	const createShopping: CreateShoppingRequest = addCollaboratorsAsShopper.createShoppingRequest

	const request: CollaboratorsFilterRequest = {
		idListaCompras: createShopping.idListaCompras
	}

	const { reloadCollaborators, isLoading, collaborators } = useFetchCollaborators(request)

	const handleCollaboratorPress = (collaborator: Collaborator) => {
		infoLog("QQQQQQQQQQQQ: " + JSON.stringify(collaborator))
		navigation.navigate('AddExpense', { createShoppingRequest: createShopping, collaborator: collaborator });
	};

	return (
		<BaseScreenComponent>
			<GenericHeaderComponent title='Comprador' showArrowBack />

			<View
				style={{
					flex: 1,
					paddingHorizontal: 15
				}}
			>
				<ScrollView>
					{collaborators.map((collaborator, index) => (
						<CollaboratorCardComponent
							key={index}
							collaborator={collaborator}
							idUsuarioCreador={addCollaboratorsAsShopper.idUsuarioCreador}
							estadoLista={addCollaboratorsAsShopper.estadoLista}
							updateCollaboratorsList={() => { }}
							actionButtom={() => { handleCollaboratorPress(collaborator) }}

						/>
					))}
				</ScrollView>

			</View>


		</BaseScreenComponent>
	)
}

export default AddCollaboratorAsShopperScreen
