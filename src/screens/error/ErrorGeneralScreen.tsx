import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParams } from '../../navigation/MainStackNavigator'
import BaseScreenComponent from '../../components/BaseScreenComponent'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ButtonV2Component } from '../../components/buttons/ButtonV2Component'

interface ErrorInesperadoProps extends StackScreenProps<RootStackParams, 'ErrorInesperado'> { }


const ErrorInesperadoScreen = ({ route, navigation }: ErrorInesperadoProps) => {
  return (
    <BaseScreenComponent screen='Error'>
      <View
        style={{
          height: '60%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

        <Icon name="alert-circle-outline" size={230} color="#F972CB" />
        <Text
          style={{
            color: '#F972CB',
            fontSize: 40,
            fontWeight: '700'
          }}>Oops!</Text>

        <View
          style={{
            width: '90%',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '700'
            }}
          >{`Estamos presentando intermitencia. \nVuelve a intentarlo.`}</Text>
        </View>

      </View>
      <View
        style={{
          height: '40%',
          paddingHorizontal: 30,
          paddingBottom: 20,
          justifyContent: 'flex-end'
        }}
      >
        <ButtonV2Component
          buttonColor='#F972CB'
          textColor='#000'
          title='Volver al inicio'
          onPress={() => { navigation.navigate('Auth') }}
        />
      </View>

    </BaseScreenComponent>
  )
}

export default ErrorInesperadoScreen