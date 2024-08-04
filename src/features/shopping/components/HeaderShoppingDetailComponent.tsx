import React, { useContext, useEffect, useState } from 'react'
import { View, TouchableOpacity, Modal, Text, TouchableWithoutFeedback, StyleSheet, Platform, ToastAndroid, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Clipboard from '@react-native-clipboard/clipboard';
import { sliceText } from '../../../utils/textUtil'
import { CollaboratorsParams } from '../../../interfaces/UserInterface'
import { AuthContext } from '../../../context/AuthContext'
import HeaderContainerComponent from '../../../components/base/HeaderContainerComponent'
import { useStartShoppingList } from '../hooks/useStartShoppingList'
import ToolItemComponent from '../../../components/base/ToolItemComponent'
import { errorLog, infoLog } from '../../../utils/HandlerError';
import { ShoppingContext } from '../../../context/ShoppingContext';
import { useDeleteShopping } from '../hooks/useDeleteShopping';
import ConfirmDialogComponent from '../../../components/base/ConfirmDialogComponent';
import { AddExpenseParams } from '../../../interfaces/ShoppingInterface';
import { useContextMenu } from '../hooks/useContextMenu';
import { useConfirmDialog } from '../../../hooks/useConfirmDialog';

interface HeaderShoppingDetailProps {
  idListaCompras: number;
  title?: string,
  code: string,
  idUsuarioCreador: number,
  estado: string,
}


const HeaderShoppingDetailComponent = ({
  title, code, idListaCompras, idUsuarioCreador, estado }: HeaderShoppingDetailProps) => {

  const navigator = useNavigation();
  const { authState } = useContext(AuthContext);
  const { shoppingState, setRefreshShoppings} = useContext(ShoppingContext);
  const { hideContextMenu, showContextMenu, isContextMenuVisible } = useContextMenu()


  const { hideConfirmationDialog, showConfirmationDialog, confirmationVisible } = useConfirmDialog()
  const { setIsLoading, saveStartShoppingList, shoppingList, isLoading } = useStartShoppingList()
  const { removeShopping, setIsLoading: setIsLoadingOnRemove, isLoading: isLoadingOnRemove } = useDeleteShopping()


  const [iconActionButton, setIconActionButton] = useState('cart-arrow-right')
  const [question, setQuestion] = useState("")
  const [description, setDescription] = useState("")
  const [action, setAction] = useState("none")
  const user = authState.user

  const collaboratorsParams: CollaboratorsParams = {
    idListaCompras: idListaCompras,
    idUsuarioCreador,
    estadoLista: estado
  }

  const showConfirmDialogOnDelete = () => {
    setAction("delete")
    setDescription("No podrá deshacer esta acción.")
    setQuestion(`¿Desea eliminar la compra ${shoppingState.shoppingToEdit?.descripcion}?`)
    showConfirmationDialog()
  }

  const showConfirmDialogOnChangeState = () => {
    setAction("changeState")
    showConfirmationDialog()
  }


  const goCollaboratorsScreen = () => {
    hideContextMenu();
    navigator.navigate('Collaborators', collaboratorsParams)
  }

  const handleCopyToClipboard = () => {
    Clipboard.setString(code);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Texto copiado al portapapeles', ToastAndroid.SHORT);
    } else {
      // Puedes implementar una notificación similar para otras plataformas
    }
  };


  const handleEdit = () => {
    
    navigator.navigate('AddExpense')

  }

  const handleConfirmAction = async () => {
    // Lógica a ejecutar cuando se presiona el botón "Aceptar"
    switch(action){
      case 'delete':
        await removeShoppingById();
        break;
      case 'changeState':
        handleConfirmActionToPending();
        break; 
      default: console.log("sin acción definida");
        break;
      
    }
    hideConfirmationDialog();
  };

  const handleConfirmActionToPending = async () => {
    // Lógica a ejecutar cuando se presiona el botón "Aceptar"
    await handleActionShoppingList();
  };

  const removeShoppingById = async () => {
    setIsLoadingOnRemove(true);

    try {
      await removeShopping(shoppingState.idShoppingCardSelected)
      ToastAndroid.show("Compra eliminada con exito", ToastAndroid.SHORT)
      setIsLoadingOnRemove(false);
      setRefreshShoppings(true)

    } catch (error) {
      errorLog("Falla al eliminar lista", error)
      ToastAndroid.showWithGravity("No se pudo elimnar la lista de compras", ToastAndroid.LONG, 1)

    } finally {
      setIsLoadingOnRemove(false)
      setRefreshShoppings(true)

    }
  }


  const handleActionShoppingList = async () => {

    infoLog("Handle Action")

    switch (estado) {
      case 'CONFIGURANDO': {
        // Al darle click entonces se llama al servicio para inicializar y pasar al estado PENDIENTE
        console.log("cambiando a estado PENDIENTE");
        setIsLoading(true);

        try {
          await saveStartShoppingList(idListaCompras);
          setIsLoading(false);
          hideConfirmationDialog();
          infoLog(JSON.stringify(shoppingList), "AQUI----")
          //setShoppingList(shoppingList!)
          setRefreshShoppings(true)
          //navigator.goBack() // Volver a la pantalla anterior

        } catch (error) {
          //console.error("Falla al guardar: " + error);
          errorLog("No se pudo iniciar lista de compras", error)
          if (error!.response.data.message === 'TOTAL_PERCENTAGES_MUST_BE_100_PERCENT') {
            ToastAndroid.showWithGravity("Total porcentaje debe ser 100", ToastAndroid.LONG, 1)
          } else if(error!.response.data.message === 'HAS_PENDING_REQUESTS') {
            ToastAndroid.showWithGravity("Error: Tiene solicitudes de colaboradores pendientes", ToastAndroid.LONG, 1)
          } else {
            ToastAndroid.showWithGravity("No se pudo iniciar lista de compras", ToastAndroid.LONG, 1)
          }

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
    infoLog("renderizando HEADER ####################")
    infoLog("ID SHOPPING TO EDIT OR DELETE: " + shoppingState.idShoppingCardSelected)
    infoLog("ID SHOPPING " + estado)

    switch (estado) {
      //CONFIGURANDO: estado inicial, no permite agregar compras, solo configurar porcentajes, siguiente estado: PENDIENTE
      case 'CONFIGURANDO':
        setIconActionButton('cart-arrow-right')
        setQuestion(`¿Desea iniciar la lista de compras?`)
        setDescription("No podrá deshacer esta acción.")
        break;
      //PENDIENTE O ABIERTO: estado que permite agregar compras, no configurar porcentajes, permite pasar a: EN_CIERRE
      case 'PENDIENTE':
        setIconActionButton('cart-check')
        setQuestion(`La lista pasará al estado EN CIERRE ¿Desea cerrar la lista de compras?`)
        setDescription('Podrás deshacer está acción')
        break;
      //EN_CIERRE: no permite agregar compras, es un estado previo al FINALIZADO
      //permite revisar las compras, ver los deudores y montos
      //permite regresar al estado PENDIENTE para modificar alguna compra si es necesario.
      case 'EN_CIERRE':

      break;
      //FINALIZADO: es el ultimo estado, no permite regresar a ningun estado
      //significa que ya la lista está finalizada, no permite agregar compras ni revisar,
      //y todas als deudas entre integrantes están saldadas
      case 'FINALIZADO':

      break;
    
      default:
        break;
    }
  },[shoppingState])

  return (
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
                user?.id === idUsuarioCreador && estado !== 'FINALIZADO'?
                  <ToolItemComponent
                    onPress={showConfirmDialogOnChangeState}
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
                    onPress={showConfirmDialogOnDelete}
                    icon='delete'
                  />
                  <ToolItemComponent
                    onPress={() => { handleEdit() }}
                    icon='pencil'
                  />
                </>
              )


        }

      </HeaderContainerComponent>

      <ConfirmDialogComponent
        visible={confirmationVisible}
        onRequestClose={hideConfirmationDialog}
        onConfirm={handleConfirmAction}
        question={question}
        description={description}
      />

      <Modal
        animationType='fade'
        presentationStyle='overFullScreen'
        transparent={true}
        visible={isContextMenuVisible}
        onRequestClose={hideContextMenu}
      >
        <View style={{flex: 2}}>

          {/* <StatusBar barStyle="dark-content" backgroundColor={'red'} /> */}
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

        </View>
      </Modal>
    </>
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
