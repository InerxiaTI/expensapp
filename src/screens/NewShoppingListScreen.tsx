import React, { useRef, useState, useEffect, useContext } from 'react'
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import expenseBanner from '../../assets/expenseBanner.png';
import BaseScreenComponent from '../components/BaseScreenComponent';
import HeaderNewShoppingListComponent from '../components/HeaderNewShoppingListComponent';
import { useNewShoppingLists, useShoppingLists } from '../hooks/useShopping';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const NewShoppingListScreen = () => {
  const navigation = useNavigation();

  const {authState} = useContext(AuthContext);
  console.log("auth: ", authState);
  const user = authState.user

  const isFocused = useIsFocused();
  const { isLoading, setIsLoading, shoppingList, saveShoppingList} = useNewShoppingLists()
  console.log("888888888888888888888888888888888\n \t "+JSON.stringify(shoppingList));
  


  const [textValue, setTextValue] = useState('');
  const [codigoGenerado, setCodigoGenerado] = useState(shoppingList?.codigoGenerado);
  const [isDisabled, setIsDisabled] = useState(false);
  const [habilitarBoton, setHabilitarBoton] = useState(false)

  const inputRef = useRef<TextInput>(null);
  const { getShoppingLists } = useShoppingLists();


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
      setCodigoGenerado(shoppingList?.codigoGenerado)
      setIsDisabled(false);
      setIsLoading(false);

      // getShoppingLists(user!)
      // navigation.dispatch() se quiere llamar la función para actualizar las listas de compras
      navigation.goBack() // Volver a la pantalla anterior

    } catch (error) {
      console.error("Falla al guardar: " + error);
    }
  }


  useEffect(() => {

    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }

    // Restablecer los campos al montar la pantalla
    if (!isFocused) {
      setTextValue('')
      setCodigoGenerado('')
      setHabilitarBoton(false)
      setIsDisabled(false)
      
    }
    
  }, [isFocused]);


  return (
    <BaseScreenComponent>
      <HeaderNewShoppingListComponent title='Crear lista' />

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
        <View>
          <Text style={styles.textInfoInput}>Nombre</Text>
          <View style={styles.searchContainer}>

            <TextInput
              ref={inputRef}
              value={textValue}
              onChangeText={handleOnTextChange}
              keyboardType='default'
              placeholder='Nombre de la lista'
              placeholderTextColor={'lightgrey'}
              style={styles.searchTextInput}
              autoFocus={isFocused}
              editable={!isDisabled}
            />
          </View>
        </View>

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
              {codigoGenerado}
            </Text>

          </View>
        </View>

      </View>


      {/* Boton */}
      <View
        style={{
          borderWidth: 0,
          borderColor: 'white',
          paddingHorizontal: 28
        }}
      >
        <TouchableOpacity
          disabled={!habilitarBoton}
          activeOpacity={0.3}
          onPress={() => newShoppingList()}
          style={{
            backgroundColor: '#18032E',
            borderRadius: 20,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3,
            opacity: habilitarBoton ? 1 : 0.4
          }}
        >

         {
           isLoading  ? (
            <ActivityIndicator color={'white'} size={20} />
            ) :
            (
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: 'white'
  
              }}
            >Guardar</Text>
            )
         }
        </TouchableOpacity>
      </View>

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