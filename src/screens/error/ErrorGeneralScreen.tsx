import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import {Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParams } from '../../navigation/MainStackNavigator'
import BaseScreenComponent from '../../components/BaseScreenComponent'

interface ErrorInesperadoProps extends StackScreenProps<RootStackParams, 'ErrorInesperado'> { }


const ErrorInesperadoScreen = ({ route, navigation }:ErrorInesperadoProps) => {
  return (
    <BaseScreenComponent>
        <Text
            style={{
                fontSize: 20,
                color: 'red'
            }}
        >PANTALLA ERRORES INESPERADOS (500)</Text>

        <Button title='Volver inicio' onPress={()=> {navigation.navigate('Auth')}}/>


    </BaseScreenComponent>
  )
}

export default ErrorInesperadoScreen