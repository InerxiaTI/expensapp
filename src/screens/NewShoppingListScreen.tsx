import React, { useRef, useState, useEffect, useContext } from 'react'
import { Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import expenseBanner from '../../assets/expenseBanner.png';
import BaseScreenComponent from '../components/BaseScreenComponent';
import { GenericHeaderComponent } from '../components/GenericHeaderComponent';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import InputV1Component from '../components/inputs/InputV1Component';
import { ButtonV2Component } from '../components/buttons/ButtonV2Component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNewShoppingLists } from '../hooks/shoppingList/useNewShoppingList';
import { errorLog } from '../utils/HandlerError';


const NewShoppingListScreen = () => {

  const { authState } = useContext(AuthContext);
  const user = authState.user

  const isFocused = useIsFocused();
  const { isLoading, setIsLoading, codigo, setCodigo, createShoppingList } = useNewShoppingLists()


  const [textValue, setTextValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [habilitarBoton, setHabilitarBoton] = useState(false)
  const inputRef = useRef<TextInput>(null);


  const handleOnTextChange = (textValue: string) => {
    setTextValue(textValue)
    if (textValue.length >= 4) {
      setHabilitarBoton(true)
    } else {
      setHabilitarBoton(false)
    }
  }

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

      <GenericHeaderComponent title='Crear lista' showArrowBack>
        <>
          <TouchableOpacity
            onPress={resetFields}
          >
            <Icon name='reload' size={25} color='white' />
          </TouchableOpacity>

        </>
      </GenericHeaderComponent>

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

        <View>
          <Text style={styles.textInfoInput}>Código para unirse</Text>
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#201F21',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 5,
            marginBottom: 16,
            height: 50
          }}>

            <Text style={styles.searchTextInputDisabled}>
              {codigo}
            </Text>

          </View>
        </View>


        {/* Boton */}

        <ButtonV2Component
          title='Guardar'
          onPress={() => newShoppingList()}
          habilitarBoton={habilitarBoton}
          isLoading={isLoading}
        />

      </View>



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