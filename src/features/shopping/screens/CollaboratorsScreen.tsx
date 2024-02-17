import React, { useEffect, useState } from 'react'
import BaseScreenComponent from '../../../components/BaseScreenComponent'
import { ScrollView, Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../../navigation/MainStackNavigator'
import { CollaboratorsFilterRequest, CollaboratorsParams } from '../../../interfaces/UserInterface'
import CollaboratorCardComponent from '../../../components/CollaboratorCardComponent'
import {GenericHeaderComponent} from '../../../components/GenericHeaderComponent'
import { useFetchCollaborators } from '../../../hooks/collaborators/useFetchCollaborators'


interface CollaboratorsScreenProps extends StackScreenProps<RootStackParams, 'Collaborators'> { }


const CollaboratorsScreen = ({ route, navigation }: CollaboratorsScreenProps) => {

  const collaboratorParams: CollaboratorsParams = route.params

  const request: CollaboratorsFilterRequest = {
    idListaCompras: collaboratorParams.idListaCompras!
  }

  const { reloadCollaborators, isLoading, collaborators, totalPorcentaje } = useFetchCollaborators(request)

  const approvedCollaborators = collaborators.filter(collaborator => collaborator.estado === 'APROBADO');
  const pendingCollaborators = collaborators.filter(collaborator => collaborator.estado === 'PENDIENTE');

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerStyle: {
        backgroundColor: 'white',
      },
      headerShown: true,
      header: () => (
        <GenericHeaderComponent title='Colaboradores' showArrowBack />

      ),

    });
  }, [navigation]);

  const updateCollaboratorsList = async () => {
    reloadCollaborators()
  };

  useEffect(() => {
    updateCollaboratorsList()
  }, [route.params.porcentaje])


  return (
    <BaseScreenComponent>

      <View
        style={{
          flex: 1,
          borderWidth: 0,
          borderColor: 'red',
          marginTop: 10,
          paddingHorizontal: 15
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginVertical: 5
          }}
        >
          <Text style={{color: '#6B7280', fontSize: 14, fontWeight: 'bold'}}>Total porcentaje: </Text>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>{totalPorcentaje}%</Text>
        </View>

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
