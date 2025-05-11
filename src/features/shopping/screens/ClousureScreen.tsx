import React, { useContext, useEffect, useState } from 'react'
import BaseScreenComponent from '../../../components/BaseScreenComponent'
import { ScrollView, Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../../navigation/MainStackNavigator'
import { CollaboratorsFilterRequest, CollaboratorsParams, Collaborator } from '../../../interfaces/UserInterface';
import CollaboratorCardComponent from '../../../components/CollaboratorCardComponent'
import {GenericHeaderComponent} from '../../../components/GenericHeaderComponent'
import { useFetchCollaborators } from '../../../hooks/collaborators/useFetchCollaborators'
import { ClousureParams, Estado } from '../../../interfaces/ShoppingInterface'
import { infoLog } from '../../../utils/HandlerError'
import { useFetchDetalleCierre } from '../hooks/useFetchDetalleCierre'
import ClousureCardComponent from '../../../components/ClousureCardComponent'
import { DetalleCierre } from '../../../interfaces/DetalleCierreInterface';
import HeaderShoppingDetailComponent from '../components/HeaderShoppingDetailComponent'
import { ShoppingContext } from '../../../context/ShoppingContext'
import { useCambiarEstadoDetalleCierre } from '../hooks/useCambiarEstadoDetalleCierre'


interface ClousureScreenProps extends StackScreenProps<RootStackParams, 'Clousure'> { }


const ClousureScreen = ({ route, navigation }: ClousureScreenProps) => {

  const {shoppingState} = useContext(ShoppingContext);

  const clousureParams: ClousureParams = route.params
  const shoppingList = clousureParams.shoppingList

  const [labelStatus, setLabelStatus] = useState('Cierre de '+shoppingList?.nombre);


  infoLog("Cierre: "+JSON.stringify(clousureParams))

  const { detalleCierreList, isLoading, fetchConsultaDetalleCierre, reloadListDetalleCierre } = useFetchDetalleCierre()
  const { estadoDetalleCierre, isLoading: isLoadingAprobarCierre, aprobarDetalleCierre } = useCambiarEstadoDetalleCierre()


  const aprobarCierre = async (idDetalleCierre: number) => {
    try {
      await aprobarDetalleCierre(idDetalleCierre);
      await reloadListDetalleCierre(clousureParams.shoppingList!.id);
    } catch (error) {
      console.error('Error aprobando detalle de cierre:', error);
    }
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: 'white' },
      header: () => (
        <HeaderShoppingDetailComponent
          title={shoppingList.nombre}
          code={shoppingList.codigoGenerado}
          idListaCompras={shoppingList.id}
          idUsuarioCreador={shoppingList.usuarioCreadorId}
          estado={shoppingList.estado}
        />
      ),
    });
  }, [navigation, shoppingState.refreshShoppings, shoppingState.shoppingList]);

  useEffect(() => {
    if(shoppingList?.estado === Estado.Finalizado){
      setLabelStatus(`${shoppingList.nombre}: finalizada`)
    }
    fetchConsultaDetalleCierre(clousureParams.shoppingList!.id)
  }, [])



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
            borderWidth: 0,
            borderColor: 'yellow',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginVertical: 5
          }}
        >
          <Text style={{color: '#6B7280', fontSize: 24, fontWeight: 'bold'}}>{labelStatus}</Text>
        </View>

          {
            detalleCierreList && (
              <View
                style={{
                  flex: 2,
                  borderWidth: 0,
                  borderColor: 'yellow',
                  paddingHorizontal: 0
                }}
              >

                <ScrollView>
                  {detalleCierreList.map((detalleCierre) => (
                    // <CollaboratorCardComponent
                    //   key={collaborator.id}
                    //   collaborator={collaborator}
                    //   idUsuarioCreador={collaboratorParams.idUsuarioCreador!}
                    //   updateCollaboratorsList={updateCollaboratorsList}
                    //   estadoLista={collaboratorParams.estadoLista!}


                    // />

                    <ClousureCardComponent 
                      key={detalleCierre.id}
                      detalleCierre={detalleCierre}
                      actionButtom={()=> aprobarCierre(detalleCierre.id)}
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

export default ClousureScreen
