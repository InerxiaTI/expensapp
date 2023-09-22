import React from 'react'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/MainStackNavigator'
import { CreateShoppingRequest } from '../interfaces/ShoppingInterface'
import { Collaborator, CollaboratorsFilterRequest } from '../interfaces/UserInterface'
import { useFetchCollaborators } from '../hooks/collaborators/useFetchCollaborators'

interface AddCollaboratorAsShopperProps extends StackScreenProps<RootStackParams, 'AddCollaboratorAsShopper'> { }

const AddCollaboratorAsShopperScreen = ({ route, navigation }: AddCollaboratorAsShopperProps) => {
    const createShopping: CreateShoppingRequest = route.params

    const request: CollaboratorsFilterRequest = {
        idListaCompras: createShopping.idListaCompras!
    }
    
    const {  reloadCollaborators, isLoading, collaborators } = useFetchCollaborators(request)

    const handleCollaboratorPress = (collaborator: Collaborator) => {
        navigation.navigate('AddExpense', {createShoppingRequest: createShopping, collaborator: collaborator});
    };

    return (
        <BaseScreenComponent>

            <Text style={{ color: 'white' }}>Holas {createShopping.idListaCompras}</Text>
            <ScrollView>
                {collaborators.map((collaborator) => (
                    <TouchableOpacity
                        key={collaborator.id}
                        onPress={() => handleCollaboratorPress(collaborator)}
                    >
                        <View>
                            <Text>{collaborator.nombresUsuario} {collaborator.apellidosUsuario}</Text>
                            {/* Mostrar más detalles si es necesario */}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </BaseScreenComponent>
    )
}

export default AddCollaboratorAsShopperScreen
