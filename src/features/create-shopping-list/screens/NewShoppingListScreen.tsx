import React, { useRef, useState, useEffect, useContext } from 'react'
import { Image, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import expenseBanner from '../../../../assets/expenseBanner.png';
import BaseScreenComponent from '../../../components/BaseScreenComponent';
import { GenericHeaderComponent } from '../../../components/GenericHeaderComponent';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import InputV1Component from '../../../components/inputs/InputV1Component';
import { ButtonV2Component } from '../../../components/buttons/ButtonV2Component';
import { useNewShoppingLists } from '../hooks/useNewShoppingList';
import { errorLog } from '../../../utils/HandlerError';
import ToolItemComponent from '../../../components/base/ToolItemComponent';
import ConfirmDialogComponent from '../../../components/base/ConfirmDialogComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Clipboard from '@react-native-clipboard/clipboard';



const NewShoppingListScreen = () => {

  const { authState } = useContext(AuthContext);
  const navigator = useNavigation();

  const user = authState.user

  const isFocused = useIsFocused();
  const { isLoading, setIsLoading, codigo, setCodigo, createShoppingList } = useNewShoppingLists()


  const [textValue, setTextValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [habilitarBoton, setHabilitarBoton] = useState(false)
  const inputRef = useRef<TextInput>(null);

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigator.setOptions({
      headerStyle: {
        backgroundColor: 'white',
      },
      headerShown: true,
      header: () => (
        <GenericHeaderComponent title='Crear lista'>
          <>
            <ToolItemComponent
              onPress={resetFields}
              icon='reload'
            />
          </>
        </GenericHeaderComponent>
      ),

    });
  }, [navigator]);

  const handleOnTextChange = (textValue: string) => {
    setTextValue(textValue)
    if (textValue.length >= 4) {
      setHabilitarBoton(true)
    } else {
      setHabilitarBoton(false)
    }
  }

  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const showConfirmationDialog = () => {
    setConfirmationVisible(true);
  };

  const hideConfirmationDialog = () => {
    setConfirmationVisible(false);
  };

  const handleConfirmAction = () => {
    // Lógica a ejecutar cuando se presiona el botón "Aceptar"
    console.log('Acción confirmada');
    newShoppingList()
    hideConfirmationDialog();
  };

  // const showConfirmationDialog = () => {
  //   Alert.alert(
  //     'Confirmación',
  //     '¿Estás seguro de que quieres realizar esta acción?',
  //     [
  //       {
  //         text: 'Cancelar',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Aceptar',
  //         onPress: () => {
  //           // Lógica a ejecutar cuando se presiona el botón "Aceptar"
  //           console.log('Acción confirmada');
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  const newShoppingList = async () => {
    setIsDisabled(true);
    setIsLoading(true);
    setHabilitarBoton(false)

    try {
      await createShoppingList(textValue, user!.id);
      ToastAndroid.show("Lista creada con exito", ToastAndroid.SHORT)
      setIsDisabled(false);
      setIsLoading(false);

    } catch (error) {
      errorLog("Falla al guardar lista", error)
      ToastAndroid.showWithGravity("No se pudo guardar la lista de compras", ToastAndroid.LONG, 1)
      setCodigo('')

    } finally {
      setIsLoading(false)
      setIsDisabled(false)
    }
  }

  const resetFields = () => {
    setTextValue('')
    setCodigo('')
    setHabilitarBoton(false)
    setIsDisabled(false)
  }

  const handleCopyToClipboard = () => {
    Clipboard.setString(codigo);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Texto copiado al portapapeles', ToastAndroid.SHORT);
    } else {
      // Puedes implementar una notificación similar para otras plataformas
    }
  };

  useEffect(() => {

    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
    // Restablecer los campos al montar la pantalla
    if (!isFocused) {
      setTextValue('')
      setCodigo('')
      setHabilitarBoton(false)
      setIsDisabled(false)

    }

  }, [isFocused]);


  return (
    <BaseScreenComponent>

      {/* Imagen */}

      <View style={{
        width: '100%',
        alignItems: 'center',
        borderWidth: 0,
        borderColor: 'red'
      }}>
        <Image
          source={expenseBanner}
          style={{ width: 100, height: 100 }}
        />
      </View>

      {/* Inputs */}

      <View
        style={{
          borderWidth: 0,
          borderColor: 'white',
          paddingHorizontal: 28
        }}
      >
        <InputV1Component
          title='Nombre'
          placeholder='Nombre de la lista'
          onChangeText={handleOnTextChange}
          value={textValue}
          editable={!isDisabled}
          autoFocus={isFocused}
          refOwn={inputRef}

        />

        {
          codigo && (
            <View>
            <Text style={styles.textInfoInput}>Código para unirse</Text>
            <View style={{
              flexDirection: 'row',
              backgroundColor: '#201F21',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 20,
              marginTop: 5,
              marginBottom: 16,
              height: 50
            }}>
  
              <Text style={styles.searchTextInputDisabled}>
                {codigo}
              </Text>

              <TouchableOpacity
                  onPress={handleCopyToClipboard}
                  style={{
                    flexDirection: 'row',
                    borderColor: 'red',
                    borderWidth: 0,
                    gap: 5,
                    marginRight: 15
                  }}

                >
                  <Icon name='content-copy' size={20} color={'white'} />
                </TouchableOpacity>
  
            </View>
          </View>
          )
        }
       


        {/* Boton */}

        <ButtonV2Component
          title='Guardar'
          onPress={() => handleConfirmAction()}
          habilitarBoton={habilitarBoton}
          isLoading={isLoading}
        />

      </View>


      <ConfirmDialogComponent
        visible={confirmationVisible}
        onRequestClose={hideConfirmationDialog}
        onConfirm={handleConfirmAction}
        question='¿Desea crear una nueva lista de compras?'
      />
    </BaseScreenComponent>
  )
}

const styles = StyleSheet.create({
  searchTextInputDisabled: {
    letterSpacing: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#C5C5C5',
    marginLeft: 15

  },
  textInfoInput: {
    color: '#6B7280',
    fontSize: 24,
    fontWeight: '700',
  },
})

export default NewShoppingListScreen
