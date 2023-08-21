import React, { useEffect } from 'react'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { ScrollView, Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/HomeStackNavigator'
import { CollaboratorsParams } from '../interfaces/UserInterface'
import { useCollaboratorsV2 } from '../hooks/useCollaborators'
import CollaboratorCardComponent from '../components/CollaboratorCardComponent'
import BaseHeaderComponent from '../components/base/BaseHeaderComponent'
import HeaderNewShoppingListComponent from '../components/HeaderNewShoppingListComponent'


interface CollaboratorsScreenProps extends StackScreenProps<RootStackParams, 'Collaborators'> { }


const CollaboratorsScreen = ({ route, navigation }: CollaboratorsScreenProps) => {

  const collaboratorParams: CollaboratorsParams = route.params

  const { reloadCollaborators, isLoading, collaborators } = useCollaboratorsV2(collaboratorParams.idListaCompras)

  const approvedCollaborators = collaborators.filter(collaborator => collaborator.estado === 'APROBADO');
  const pendingCollaborators = collaborators.filter(collaborator => collaborator.estado === 'PENDIENTE');

  const updateCollaboratorsList = async () => {
    reloadCollaborators()
  };

  useEffect(() => {
    console.log("++++++++++++++++++++++++++++++RECARGANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO {} ", JSON.stringify(collaboratorParams));
    
    updateCollaboratorsList()

  }, [route.params.porcentaje])


  return (
    <BaseScreenComponent>

      <HeaderNewShoppingListComponent title='Colaboradores' showArrowBack />

      <View
        style={{
          flex: 1,
          borderWidth: 0,
          borderColor: 'red',
          marginTop: 50,
          paddingHorizontal: 15
        }}
      >
        <View
          style={{
            flex: 2,
            borderWidth: 0,
            borderColor: 'yellow'
          }}
        >

          <ScrollView>
            {approvedCollaborators.map((collaborator) => (
              <CollaboratorCardComponent
                key={collaborator.id}
                collaborator={collaborator}
                idUsuarioCreador={collaboratorParams.idUsuarioCreador!}
                updateCollaboratorsList={updateCollaboratorsList}
                estadoLista={collaboratorParams.estadoLista!}


              />
            ))}
          </ScrollView>
        </View>

        {
          pendingCollaborators.length > 0 && (
            <View
              style={{
                flex: 1,
                borderWidth: 0,
                borderColor: 'blue'
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: '400',
                  fontSize: 14,
                  marginBottom: 20
                }}
              >Solicitudes</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {pendingCollaborators.map((collaborator) => (
                  <CollaboratorCardComponent
                    key={collaborator.id}
                    collaborator={collaborator}
                    idUsuarioCreador={collaboratorParams.idUsuarioCreador!}
                    updateCollaboratorsList={updateCollaboratorsList}
                    estadoLista={collaboratorParams.estadoLista!}

                  />
                ))}
              </ScrollView>
            </View>

          )

        }




      </View>
    </BaseScreenComponent>
  )
}

export default CollaboratorsScreen