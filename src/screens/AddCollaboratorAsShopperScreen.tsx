import React from 'react'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/MainStackNavigator'
import { CreateShoppingRequest } from '../interfaces/ShoppingInterface'
import { Collaborator, CollaboratorsFilterRequest } from '../interfaces/UserInterface'
import { useFetchCollaborators } from '../hooks/collaborators/useFetchCollaborators'
import CollaboratorCardComponent from '../components/CollaboratorCardComponent'

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
        navigation.navigate('AddExpense', { createShoppingRequest: createShopping, collaborator: collaborator });
    };

    return (
        <BaseScreenComponent>

            <Text style={{ color: 'white' }}>Holas {createShopping.idListaCompras}</Text>
            <ScrollView>
                {collaborators.map((collaborator, index) => (
                    <CollaboratorCardComponent
                        key={index}
                        collaborator={collaborator}
                        idUsuarioCreador={addCollaboratorsAsShopper.idUsuarioCreador}
                        estadoLista={addCollaboratorsAsShopper.estadoLista}
                        updateCollaboratorsList={()=>{}}
                        actionButtom={()=> {handleCollaboratorPress(collaborator)}}

                    />
                ))}
            </ScrollView>

        </BaseScreenComponent>
    )
}

export default AddCollaboratorAsShopperScreen
