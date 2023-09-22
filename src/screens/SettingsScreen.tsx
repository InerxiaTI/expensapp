import React, { useContext, useEffect } from 'react'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { AuthContext } from '../context/AuthContext';
import { reset } from '../navigation/servicesUtil/NavigationService';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const SettingsScreen = () => {

  const { logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
    reset(0, 'Auth', {})

  }



  return (
    <BaseScreenComponent screen='Settings' statusBarColor='#270C3D'>
      <View
        style={{
          backgroundColor: '#270C3D',
          height: 150
        }}
      >
        <Text>Nombre usuario</Text>
      </View>
      <ScrollView
        style={{
          borderColor: 'yellow',
          borderWidth: 0
        }}
      >
        {/* Card settings */}
        <TouchableOpacity
          onPress={handleLogOut}
          style={{
            backgroundColor: '#262626',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              borderColor: 'red',
              borderWidth: 0,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 15,
              gap: 24
            }}
          >
            {/* Icon */}
            <View>
              <Icon name="logout" size={25} color="white"/>

            </View>

            {/* Texto */}
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontStyle: 'normal',
                  fontWeight: '400'
                }}
              >Cerrar sesión</Text>

            </View>
          </View>

          {/* Common icon */}
          <View
            style={{
              marginRight: 12
            }}
          >
              <Icon name="chevron-right" size={25} color="white"/>
          </View>

        </TouchableOpacity>


      </ScrollView>


    </BaseScreenComponent>
  )
}

export default SettingsScreen