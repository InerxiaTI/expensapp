import React, { useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { COLORS } from '../theme/Theme'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseHeaderComponent from './base/BaseHeaderComponent'

const HeaderShoppingDetailComponent = () => {
  const navigator = useNavigation();

  return (
    <BaseHeaderComponent>
      <>
        <View
          style={{
            width: 80,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => { navigator.goBack() }}
            style={{
              width: '100%',
              paddingHorizontal: 15

            }}
          >
            <Icon name='arrow-left' size={25} color='white' />

          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 15
          }}
        >
          <TouchableOpacity
            onPress={() => { console.log("Navega hacia atras") }}
          >
            <Icon name='dots-vertical' size={25} color='white' />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { console.log("B") }}
            style={{
              marginRight: 10

            }}
          >
            <Icon name='cart-check' size={25} color='white' />
          </TouchableOpacity>

        </View>
      </>
    </BaseHeaderComponent>
  )
}

export default HeaderShoppingDetailComponent