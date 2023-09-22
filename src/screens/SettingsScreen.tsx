import React, { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { AuthContext } from '../context/AuthContext';
import { reset } from '../navigation/servicesUtil/NavigationService';

const SettingsScreen = () => {

  const {logOut} = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
    reset(0, 'Auth', {})

  }

  return (
    <BaseScreenComponent
    >
        <Text className="text-blue-300 text-3xl">ProfileSSS screen</Text>

        {/* Boton */}
        <View
            style={{
              borderWidth: 0,
              borderColor: 'yellow',
              marginHorizontal: 33,
              marginTop: 12
            }}
          >
            <TouchableOpacity
              onPress={() => handleLogOut()}
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
              >Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
    </BaseScreenComponent>
  )
}

export default SettingsScreen