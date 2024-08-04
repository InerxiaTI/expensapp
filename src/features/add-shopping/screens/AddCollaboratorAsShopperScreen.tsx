import React, { useContext } from 'react'
import BaseScreenComponent from '../../../components/BaseScreenComponent'
import { ScrollView, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../../navigation/MainStackNavigator'
import { CreateShoppingRequest } from '../../../interfaces/ShoppingInterface'
import { Collaborator, CollaboratorsFilterRequest } from '../../../interfaces/UserInterface'
import { useFetchCollaborators } from '../../../hooks/collaborators/useFetchCollaborators'
import CollaboratorCardComponent from '../../../components/CollaboratorCardComponent'
import { GenericHeaderComponent } from '../../../components/GenericHeaderComponent'
import { infoLog } from '../../../utils/HandlerError'
import { ShoppingContext } from '../../../context/ShoppingContext'

export interface AddCollaboratorAsShopperParams {
	createShoppingRequest: CreateShoppingRequest,
	idUsuarioCreador: number,
	estadoLista: string
}

interface AddCollaboratorAsShopperProps extends StackScreenProps<RootStackParams, 'AddCollaboratorAsShopper'> { }

const AddCollaboratorAsShopperScreen = ({ route, navigation }: AddCollaboratorAsShopperProps) => {
	const addCollaboratorsAsShopper: AddCollaboratorAsShopperParams = route.params
	infoLog("4444444444 "+JSON.stringify(addCollaboratorsAsShopper))
	const createShopping: CreateShoppingRequest = addCollaboratorsAsShopper.createShoppingRequest

	const request: CollaboratorsFilterRequest = {
		idListaCompras: createShopping.idListaCompras,
		estados: ['APROBADO']
	}

	//const { reloadCollaborators, isLoading, collaborators } = useFetchCollaborators(request)
	const {shoppingState} = useContext(ShoppingContext);


	React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'white',
      },
      headerShown: true,
      header: () => (
				<GenericHeaderComponent title='Comprador' showArrowBack />

      ),

    });
  }, [navigation]);


	const handleCollaboratorPress = (collaborator: Collaborator) => {
		infoLog("QQQQQQQQQQQQ: " + JSON.stringify(collaborator))
		navigation.navigate('AddExpense', { createShoppingRequest: createShopping, collaborator: collaborator });
	};

	return (
		<BaseScreenComponent>
			<View
				style={{
					flex: 1,
					paddingHorizontal: 15
				}}
			>
				<ScrollView>
					{shoppingState.collaborators!.map((collaborator, index) => (
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
