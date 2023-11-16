import React, { useContext, useEffect, useState } from 'react'
import { View, TouchableOpacity, Modal, Text, TouchableWithoutFeedback, StyleSheet, Platform, ToastAndroid, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Clipboard from '@react-native-clipboard/clipboard';
import { sliceText } from '../utils/textUtil'
import { CollaboratorsParams } from '../interfaces/UserInterface'
import { AuthContext } from '../context/AuthContext'
import HeaderContainerComponent from './base/HeaderContainerComponent'
import { useStartShoppingList } from '../hooks/shoppingList/useStartShoppingList'
import ToolItemComponent from './base/ToolItemComponent'
import { errorLog, infoLog } from '../utils/HandlerError';
import { ShoppingContext } from '../context/ShoppingContext';
import { useDeleteShopping } from '../hooks/shoppingList/useDeleteShopping';
import ConfirmDialogComponent from './base/ConfirmDialogComponent';

interface HeaderShoppingDetailProps {
  idListaCompras: number;
  title?: string,
  code: string,
  idUsuarioCreador: number,
  estado: string,
}


const HeaderShoppingDetailComponent = ({ title, code, idListaCompras, idUsuarioCreador, estado }: HeaderShoppingDetailProps) => {
  const navigator = useNavigation();
  const { authState } = useContext(AuthContext);
  const user = authState.user

  const { shoppingState, setRefreshShoppings } = useContext(ShoppingContext);


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
    saveStartShoppingList } = useStartShoppingList()

  const { removeShopping, setIsLoading: setIsLoadingOnRemove, isLoading: isLoadingOnRemove } = useDeleteShopping()

  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const showConfirmationDialog = () => {
    setConfirmationVisible(true);
  };

  const hideConfirmationDialog = () => {
    setConfirmationVisible(false);
  };

  const handleConfirmAction = async () => {
    // Lógica a ejecutar cuando se presiona el botón "Aceptar"
    console.log('Acción confirmada');
    await removeShoppingById();
    hideConfirmationDialog();
  };

  const removeShoppingById = async () => {
    // setIsDisabled(true);
    setIsLoadingOnRemove(true);
    // setHabilitarBoton(false)

    try {
      await removeShopping(shoppingState.idShoppingCardSelected)
      ToastAndroid.show("Lista eliminada con exito", ToastAndroid.SHORT)
      // setIsDisabled(false);
      setIsLoadingOnRemove(false);
      setRefreshShoppings(true)

    } catch (error) {
      errorLog("Falla al eliminar lista", error)
      ToastAndroid.showWithGravity("No se pudo elimnar la lista de compras", ToastAndroid.LONG, 1)

    } finally {
      setIsLoadingOnRemove(false)
      // setIsDisabled(false)
    }
  }

  const [iconActionButton, setIconActionButton] = useState('cart-arrow-right')

  const handleActionShoppingList = async () => {

    switch (estado) {
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

  useEffect(() => {

    infoLog("ID SHOPPING TO EDIT OR DELETE: " + shoppingState.idShoppingCardSelected)


    if (estado === 'PENDIENTE') {
      setIconActionButton('cart-check')
    }

  })


  return (
    // <BaseHeaderComponent>
    <>
      <HeaderContainerComponent
        title={sliceText(title!, 25)}
        showArrowBack
      >
        {
          !shoppingState.shoppingCardSelected || shoppingState.idShoppingCardSelected === 0 ?

            <>
              <ToolItemComponent
                onPress={showContextMenu}
                icon='dots-vertical'
              />
              {
                user?.id === idUsuarioCreador ?
                  <ToolItemComponent
                    onPress={handleActionShoppingList}
                    icon={iconActionButton}
                  />
                  :
                  <></>
              }
            </>
            :

            isLoadingOnRemove ? (
              <ActivityIndicator color={'white'} size={20} />
            ) :
              (
                <>
                  <ToolItemComponent
                    onPress={showConfirmationDialog}
                    icon='delete'
                  />
                </>
              )


        }

      </HeaderContainerComponent>

      <ConfirmDialogComponent
        visible={confirmationVisible}
        onRequestClose={hideConfirmationDialog}
        onConfirm={handleConfirmAction}
        question='¿Desea crear una nueva lista de compras?'
      />

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
    // </BaseHeaderComponent >
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