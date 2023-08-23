import React, { useRef, useState, useEffect, useContext } from 'react'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import expenseBanner from '../../assets/expenseBanner.png';
import BaseScreenComponent from '../components/BaseScreenComponent';
import { GenericHeaderComponent } from '../components/GenericHeaderComponent';
import { useNewShoppingLists, useShoppingLists } from '../hooks/useShopping';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import InputV1Component from '../components/inputs/InputV1Component';
import { ButtonV2Component } from '../components/buttons/ButtonV2Component';

const NewShoppingListScreen = () => {

  const { authState } = useContext(AuthContext);
  console.log("auth: ", authState);
  const user = authState.user

  const isFocused = useIsFocused();
  const { isLoading, setIsLoading, shoppingList,codigo, setCodigo, saveShoppingList } = useNewShoppingLists()
  console.log("888888888888888888888888888888888\n \t " + JSON.stringify(shoppingList));



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

    try {
      await saveShoppingList(textValue, user!.id);
      setIsDisabled(false);
      setIsLoading(false);
      setHabilitarBoton(false)

      // getShoppingLists(user!)
      // navigation.dispatch() se quiere llamar la función para actualizar las listas de compras
      //navigation.goBack() // Volver a la pantalla anterior

    } catch (error) {
      console.error("Falla al guardar: " + error);
    }
  }

  // const clearComponents = ()=>{
  //   setTextValue('')
  //     setCodigoGenerado('')
  //     setHabilitarBoton(false)
  //     setIsDisabled(false)
  // }


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
      <GenericHeaderComponent title='Crear lista' showArrowBack />

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
          keyboardType='email-address'
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

      </View>


      {/* Boton */}

      <ButtonV2Component
        title='Guardar'
        onPress={() => newShoppingList()}
        habilitarBoton={habilitarBoton}
        isLoading={isLoading}
      />

    </BaseScreenComponent>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6B7280',
    backgroundColor: '#201F21'

  },
  searchTextInput: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1,
    fontWeight: '500',
    color: 'white',
    height: 50,
    borderWidth: 0,
    borderColor: 'red',
  },
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