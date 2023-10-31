import React, { useContext, useEffect, useRef, useState } from 'react'
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, ToastAndroid, ActivityIndicator, BackHandler } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLogin } from '../hooks/useLogin'
import { useFocusEffect } from '@react-navigation/native';
import { infoLog } from '../utils/HandlerError';
import { reset } from '../navigation/servicesUtil/NavigationService';
import BaseScreenComponent from '../components/BaseScreenComponent';
import { ButtonV2Component } from '../components/buttons/ButtonV2Component';
import { useForm } from '../hooks/useForm';
import SplashScreen from 'react-native-splash-screen';

const { height } = Dimensions.get('window');


const LoginScreen = () => {
  const { signIn, authState } = useContext(AuthContext);
  const [shouldNavigateToTabs, setShouldNavigateToTabs] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { isLoading, setIsLoading, validateUser } = useLogin()
  const [habilitarBoton, setHabilitarBoton] = useState(false)

  const passwordInputRef = useRef<TextInput>(null);

  const { form, onChangeValidate, isValidEmail } = useForm({
    email: {
      email: ''
    },
    password: {
      password: ''
    }

  })




  const handleAuth = async () => {
    setIsDisabled(true)
    setIsLoading(true)
    setHabilitarBoton(false)

    setTimeout(async () => {
      console.log("Esperando...");
      if (form.email && form.password) {
        try {
          console.log("1.");
          let myuser = await validateUser(form.email.email, form.password.password);
          const userLogged = myuser?.data.body
          console.log("6.", JSON.stringify(myuser?.data.body.correo));


          if (userLogged) {
            if (userLogged && userLogged.activo === true) {
              console.log("usuario encontrado");
              signIn(userLogged)
              setShouldNavigateToTabs(true);

            } else {
              console.log("usuario o contraseña incorrecta / o usuario inactivo");
              ToastAndroid.show("Usuario o contraseña incorrecta", ToastAndroid.LONG)
            }

          }

        } catch (error) {
          console.log("ERROR: " + error);
          ToastAndroid.show(error.response.data.message, ToastAndroid.LONG)
        } finally {
          setIsLoading(false)
          setIsDisabled(false)
          setHabilitarBoton(true)


        }
      } else {
        ToastAndroid.show("Usuario o contraseña incorrecta", ToastAndroid.LONG)
        setIsLoading(false)
        setIsDisabled(false)
        setHabilitarBoton(true)


      }

    }, 2000)


  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        infoLog("NO HACER NADA")
        return true
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );


  useEffect(() => {
    const getUserFromStorage = async () => {
      const userData = await AsyncStorage.getItem('user');

      if (userData) {
        const parsedUserData = JSON.parse(userData);
        signIn(parsedUserData);
        setShouldNavigateToTabs(true);
      }
    };
    getUserFromStorage();

  }, [])

  useEffect(() => {
    if (shouldNavigateToTabs && authState.isLoggedIn == true) {
      reset(0, 'Tabs', {})
    } else {
      if (Platform.OS === 'android') {
        SplashScreen.hide()
      }
    }
  }, [shouldNavigateToTabs, authState.isLoggedIn])


  return (
    <BaseScreenComponent>

      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}
      >
        {/* cuadro de inputs y boton */}
        <View
          style={{
            borderColor: 'red',
            borderWidth: 0,
            height: height * 0.55,
            width: '90%',
            marginTop: height * 0.1,
            borderRadius: 8,
            backgroundColor: '#262626'
          }}
        >

          <Text
            style={{
              color: '#6B7280',
              fontSize: 24,
              fontWeight: '700',
              fontStyle: 'normal',
              marginTop: height * 0.06,
              alignSelf: 'center'

            }}
          >Iniciar sesión</Text>

          {/* Inputs */}
          <View
            style={{
              marginHorizontal: 33,
              borderColor: 'blue',
              borderWidth: 0,

            }}
          >
            <View style={styles.searchContainer}>

              <TextInput
                editable={!isDisabled}
                keyboardType='email-address'
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current!.focus()}
                autoCapitalize='none'
                placeholder='Email'
                onChangeText={(value) => onChangeValidate(value, 'email', setHabilitarBoton, () => {
                  return isValidEmail(value);
                })}
                placeholderTextColor={'#89898A'}
                style={styles.searchTextInput}
              />
            </View>
            <View style={styles.searchContainer}>

              <TextInput
                editable={!isDisabled}
                ref={passwordInputRef} // Referencia al input de contraseña
                secureTextEntry={true}
                returnKeyType="done" // Cambiar el tipo de tecla
                onSubmitEditing={handleAuth}
                keyboardType='default'
                placeholder='Contraseña'
                onChangeText={(value) => onChangeValidate(
                  value, 'password', setHabilitarBoton, () => {
                    if (value.length >= 4) {
                      return true
                    }
                    return false
                  })}
                placeholderTextColor={'#89898A'}
                style={styles.searchTextInput}
              />
            </View>

            <View
              style={{
                borderColor: 'red',
                borderWidth: 0,
                marginTop: 10,
                flexDirection: 'row-reverse'
              }}
            >

              <Text
                style={{
                  color: '#59D8E0',
                  fontSize: 14,
                  fontWeight: '700',

                }}
              >Olvidaste la contraseña?</Text>
            </View>
          </View>


          {/* Boton */}
          <View
            style={{
              borderWidth: 0,
              borderColor: 'yellow',
              marginHorizontal: 33,
              marginTop: height * 0.08
            }}
          >

            <ButtonV2Component
              onPress={handleAuth}
              title='Login'
              isLoading={isLoading}
              habilitarBoton={habilitarBoton}

            />
          </View>
        </View>

        {/* cuadro de no tienes cuenta y login con google */}
        <View
          style={{
            borderColor: 'red',
            borderWidth: 0,
            width: '90%',

          }}
        >
          <View
            style={{
              borderColor: 'blue',
              borderWidth: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
              marginTop: 24

            }}

          >
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: '700',
              }}
            >No tienes una cuenta?</Text>
            <Text
              style={{
                color: '#59D8E0',
                fontSize: 14,
                fontWeight: '700'
              }}
            >Crear cuenta</Text>

          </View>

          <View
            style={{
              borderColor: 'yellow',
              borderWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: height * 0.06

            }}
          >
            <Text
              style={{
                color: '#6B7280',
                fontSize: 24,
                fontWeight: '700'
              }}
            >O inicia sesión con</Text>

            <View
              style={{
                marginTop: height * 0.03,
                flexDirection: 'row',
                gap: 10,
              }}
            >

              <TouchableOpacity
                style={{
                  backgroundColor: '#6B7280',
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8

                }}
              >
                <Icon
                  name='google'
                  color='black'
                  size={40}

                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#6B7280',
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8

                }}
              >
                <Icon
                  name='facebook'
                  color='black'
                  size={40}

                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#6B7280',
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8

                }}
              >
                <Icon
                  name='github'
                  color='black'
                  size={40}

                />
              </TouchableOpacity>
            </View>

          </View>

        </View>

      </ScrollView>

    </BaseScreenComponent>

  )
}


const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
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
    fontWeight: '400',
    color: 'white',
    height: 50,
  },

});
export default LoginScreen