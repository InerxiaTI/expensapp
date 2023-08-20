import React, { useContext, useState } from 'react'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { Image, Text, View } from 'react-native'
import HeaderNewShoppingListComponent from '../components/HeaderNewShoppingListComponent'
import expenseBanner from '../../assets/expenseBanner.png';
import InputV1Component from '../components/inputs/InputV1Component';
import ButtonV1Component from '../components/buttons/ButtonV1Component';
import { useJoinShoppingList } from '../hooks/useJoin';
import { AuthContext } from '../context/AuthContext';


const JoinShoppingListScreen = () => {

  const {authState} = useContext(AuthContext);
  console.log("auth: ", authState);
  const user = authState.user

  const [textValue, setTextValue] = useState('');


  const handleOnTextChange = (textValue: string) => {
    setTextValue(textValue)
  }

  const {isLoading, setIsLoading, joinShoppingList, saveJoinShoppingList} = useJoinShoppingList()

  const sendRequestJoinShoppingList = async () => {
    // setIsDisabled(true);
    // setIsLoading(true);
    console.log("Llega aquí...");
    

    try {
      await saveJoinShoppingList(textValue, user!.id);
      // setIsDisabled(false);
      setIsLoading(false);

    } catch (error) {
      console.error("Falla al guardar: " + error);
    }
  }


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

        <InputV1Component
          title='Código de la lista'
          onChangeText={handleOnTextChange}
          value={textValue}
          placeholder='Ingrese código de lista'
        />

        <ButtonV1Component 
          title='Enviar solicitud'
          onPress={() => sendRequestJoinShoppingList()}
        />

      </View>

    </BaseScreenComponent>
  )
}

export default JoinShoppingListScreen