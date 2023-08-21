import React, { useContext, useEffect, useState } from 'react'
import { View, TouchableOpacity, Modal, Text, TouchableWithoutFeedback, StyleSheet, SafeAreaView, Platform, ToastAndroid } from 'react-native'
import { COLORS } from '../theme/Theme'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseHeaderComponent from './base/BaseHeaderComponent'
import Clipboard from '@react-native-clipboard/clipboard';
import { sliceText } from '../utils/textUtil'
import { CollaboratorsParams } from '../interfaces/UserInterface'
import { AuthContext } from '../context/AuthContext'
import { useStartShoppingList } from '../hooks/useShopping'



interface HeaderShoppingDetailProps {
  idListaCompras: number;
  title?: string,
  code: string,
  idUsuarioCreador: number,
  estado: string
}


const HeaderShoppingDetailComponent = ({ title, code, idListaCompras, idUsuarioCreador, estado }: HeaderShoppingDetailProps) => {
  const navigator = useNavigation();
  const { authState } = useContext(AuthContext);
  const user = authState.user


  const collaboratorsParams: CollaboratorsParams = {
    idListaCompras: idListaCompras,
    idUsuarioCreador,
    estadoLista: estado
  }

  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [textToCopy, setTextToCopy] = useState(code);


  const showContextMenu = () => {
    console.log("mostrando menu");

    setContextMenuVisible(true);
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };

  const goCollaboratorsScreen = () => {
    hideContextMenu();
    navigator.navigate('Collaborators', collaboratorsParams)
  }

  const handleCopyToClipboard = () => {
    Clipboard.setString("Hola! \nEste es el código para que te unas a mi lista de compras:\n" + textToCopy);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Texto copiado al portapapeles', ToastAndroid.SHORT);
    } else {
      // Puedes implementar una notificación similar para otras plataformas
    }
  };

  const { isLoading,
    setIsLoading,
    shoppingList,
    saveStartShoppingList} = useStartShoppingList()

  const [iconActionButton, setIconActionButton] = useState('cart-arrow-right')

  const handleActionShoppingList = async() => {

    switch(estado){
      case 'CONFIGURANDO': {
        // Al darle click entonces se llama al servicio para inicializar y pasar al estado PENDIENTE
        console.log("cambiando a estado PENDIENTE");
        setIsLoading(true);

        try {
            await saveStartShoppingList(idListaCompras);
            setIsLoading(false);
            // TODO aqui debemos hacer algo para que se actualice el estado de la lista de compras
            // y evitar ir hasta el home, y que el icono cambié
            // getShoppingLists(user!)
            // // navigation.dispatch() se quiere llamar la función para actualizar las listas de compras
            navigator.goBack() // Volver a la pantalla anterior

        } catch (error) {
            console.error("Falla al guardar: " + error);
        }


        break
        
      }
      case 'PENDIENTE': {
        // Se cambia a cerrado - icono de bolsa de compra check
        // se muestra boton para volver a estado PENDIENTE O reabrir la lista 
        // para corregir algun valor de una compra o alguna otra cosa
        console.log("cambiando a estado CERRADO");
        break

      }
      case 'CERRADO': {
        //No iconos, no botones.
        // en este esatdo ya la lista queda archivada, finalizada
        console.log("cambiadno a estado FINALIZADO");
        break
        
      }
      
    }

     

  }

  useEffect(()=>{

    if (estado === 'PENDIENTE'){
      setIconActionButton('cart-check')
    }

  })


  return (
    <BaseHeaderComponent>
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 0,
            borderColor: 'white',
            paddingHorizontal: 15,
            gap: 15
          }}
        >
          <TouchableOpacity
            onPress={() => { navigator.goBack() }}
          >
            <Icon name='arrow-left' size={25} color='white' />

          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0,
              borderColor: 'green'
            }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#6B7280'
            }}>{sliceText(title!, 25)}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 15
          }}
        >
          <TouchableOpacity
            onPress={showContextMenu}
          >
            <Icon name='dots-vertical' size={25} color='white' />
          </TouchableOpacity>

          {
            user?.id === idUsuarioCreador ?
              
                <TouchableOpacity
                  onPress={() => { handleActionShoppingList()}}
                  style={{
                    marginRight: 10

                  }}
                >
                  <Icon name={iconActionButton} size={25} color='white' />
                </TouchableOpacity>

              :
              <></>

          }



        </View>

        <Modal
          transparent={true}
          visible={isContextMenuVisible}
          onRequestClose={hideContextMenu}

        >

          <TouchableWithoutFeedback onPress={hideContextMenu}>
            <View
              style={{
                borderColor: 'red',
                borderWidth: 0,
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                backgroundColor: 'transparent'
              }}
            >

              <View
                style={{
                  width: 150,
                  backgroundColor: '#262626',
                  borderRadius: 8,
                  marginEnd: 10,
                  marginTop: 10,
                  paddingVertical: 15,
                  paddingLeft: 10,
                  paddingTop: 10,
                  gap: 10
                }}
              >
                <TouchableOpacity
                  onPress={handleCopyToClipboard}
                  style={{
                    flexDirection: 'row',
                    borderColor: 'red',
                    borderWidth: 0,
                    gap: 5
                  }}

                >
                  <Icon name='content-copy' size={20} color={'white'} />
                  <Text style={styles.contextMenu}>{code}</Text>
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() => goCollaboratorsScreen()}
                  style={{
                    flexDirection: 'row',
                    borderColor: 'red',
                    borderWidth: 0,
                    gap: 5
                  }}

                >
                  <Icon name='account-group-outline' size={20} color={'white'} />
                  <Text style={styles.contextMenu}>Colaboradores</Text>
                </TouchableOpacity>

              </View>

            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    </BaseHeaderComponent >
  )
}

const styles = StyleSheet.create({
  contextMenu: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }

});
export default HeaderShoppingDetailComponent