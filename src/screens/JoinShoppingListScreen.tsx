import React, { useContext, useRef, useState } from 'react'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { Image, TextInput, ToastAndroid, View } from 'react-native'
import { GenericHeaderComponent } from '../components/GenericHeaderComponent'
import expenseBanner from '../../assets/expenseBanner.png';
import InputV1Component from '../components/inputs/InputV1Component';
import { AuthContext } from '../context/AuthContext';
import { ButtonV2Component } from '../components/buttons/ButtonV2Component';
import { useJoinShoppingList } from '../hooks/shoppingList/useJoinShoppingList';
import { errorLog } from '../utils/HandlerError';


const JoinShoppingListScreen = () => {

  const { authState } = useContext(AuthContext);
  console.log("auth: ", authState);
  const user = authState.user

  const [textValue, setTextValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [habilitarBoton, setHabilitarBoton] = useState(false)
  const inputRef = useRef<TextInput>(null);


  const handleOnTextChange = (textValue: string) => {
    setTextValue(textValue)
    if (textValue.length >= 5) {
      setHabilitarBoton(true)
    } else {
      setHabilitarBoton(false)
    }
  }

  const { isLoading, setIsLoading, joinShoppingList, saveJoinShoppingList } = useJoinShoppingList()

  const sendRequestJoinShoppingList = async () => {
    setIsDisabled(true);
    setIsLoading(true)
    setHabilitarBoton(false)
    setTimeout(async () => {
      try {
        await saveJoinShoppingList(textValue, user!.id);
        setIsDisabled(false);
        setIsLoading(false);

      } catch (error) {
        errorLog(error.response.data.message, "Error saving join");
        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG)
        /*Snackbar.show({
          marginBottom: 50,
          textColor: 'white',
          text: error.response.data.message,
          duration: Snackbar.LENGTH_LONG,
          action: {
            text: 'UNDO',
            textColor: 'green',
            onPress: () => {  },
          },
        });*/

      } finally {
        setIsLoading(false)
        setIsDisabled(false)
        setHabilitarBoton(true)


      }
    }, 5000)

  }


  return (
    <BaseScreenComponent>
      <GenericHeaderComponent title='Unirse' />

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
          editable={!isDisabled}
          placeholder='Ingrese código de lista'
          autoCapitalize='characters'
        />

        <ButtonV2Component
          title='Enviar solicitud'
          onPress={() => sendRequestJoinShoppingList()}
          habilitarBoton={habilitarBoton}
          isLoading={isLoading}
        />
      </View>

    </BaseScreenComponent>
  )
}

export default JoinShoppingListScreen