import React, { useContext, useEffect, useRef, useState } from 'react'
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { usersDatabase } from '../testData/testData'
import { AuthContext } from '../context/AuthContext'
import { User } from '../interfaces/UserInterface'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { height } = Dimensions.get('window');


const LoginScreen = () => {
  const { signIn } = useContext(AuthContext);
  const passwordInputRef = useRef<TextInput>(null);


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log("email: " + email);


  const handleAuth = () => {
    console.log("email: " + email);
    console.log("password: " + password);

    let user = findUserByUsernameAndPassword(email, password)
    console.log(JSON.stringify(user));
    if (user && user.activo === true) {
      console.log("usuario encontrado");
      signIn(user)

    } else {
      console.log("usuario o contraseña incorrecta / o usuario inactivo");

    }

  }

  const findUserByUsernameAndPassword = (email: string, password: string) => {
    return usersDatabase.find(
      (user: User) => user.correo === email && user.contrasena === password
    );
  };

  useEffect(() => {
    const getUserFromStorage = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        // Actualizar el contexto con los datos del usuario almacenados
        signIn(parsedUserData);
      }
    };

    getUserFromStorage();
  }, []);

  return (
    <SafeAreaView style={{ borderColor: 'white', borderWidth: 0, flex: 1 }}>
      <View
        style={{
          flex: 1,
          borderColor: 'blue',
          borderWidth: 0,
          alignItems: 'center',

        }}
      >
        {/* cuadro de inpust */}
        <View
          style={{
            borderColor: 'red',
            borderWidth: 0,
            height: height * 0.55,
            width: '90%',
            marginTop: height * 0.09,
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View
              style={{
                marginHorizontal: 33,
                borderColor: 'blue',
                borderWidth: 0,

              }}
            >
              <View style={styles.searchContainer}>

                <TextInput
                  value={email}
                  keyboardType='email-address'
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current!.focus()}
                  autoCapitalize='none'
                  placeholder='Email'
                  onChangeText={setEmail}
                  placeholderTextColor={'#89898A'}
                  style={styles.searchTextInput}
                />
              </View>
              <View style={styles.searchContainer}>

                <TextInput
                  ref={passwordInputRef} // Referencia al input de contraseña
                  value={password}
                  secureTextEntry={true}
                  returnKeyType="done" // Cambiar el tipo de tecla
                  onSubmitEditing={handleAuth}
                  keyboardType='default'
                  placeholder='Contraseña'
                  onChangeText={setPassword}
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

          </KeyboardAvoidingView>


          {/* Boton */}
          <View
            style={{
              borderWidth: 0,
              borderColor: 'yellow',
              marginHorizontal: 33,
              marginTop: height * 0.08
            }}
          >
            <TouchableOpacity
              onPress={() => handleAuth()}
              style={{
                backgroundColor: '#7600D3',
                borderRadius: 20,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 3,
              }}
            >

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: 'white'

                }}
              >Login</Text>
            </TouchableOpacity>
          </View>


        </View>

        {/* cuadro de texto y login con google */}

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





      </View>

    </SafeAreaView>
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