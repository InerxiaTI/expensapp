import React from 'react'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useCollaborators } from '../hooks/useShopping'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/HomeStackNavigator'
import { CreateShoppingRequest } from '../interfaces/ShoppingInterface'
import { Collaborator } from '../interfaces/UserInterface'

interface AddCollaboratorAsShopperProps extends StackScreenProps<RootStackParams, 'AddCollaboratorAsShopper'> { }

const AddCollaboratorAsShopperScreen = ({ route, navigation }: AddCollaboratorAsShopperProps) => {
    const createShopping: CreateShoppingRequest = route.params

    const { getCollaborators, collaborators } = useCollaborators(createShopping.idListaCompras)

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