import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { COLORS } from '../theme/Theme'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const HeaderShoppingDetailComponent = () => {
    const navigator = useNavigation();


  return (
    <View style={{
        backgroundColor: COLORS.backgroudPrimary,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>

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
            <Icon name='arrow-left' size={30} color='white' />

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
            <Icon name='dots-vertical' size={30} color='white' />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { console.log("B") }}
            style={{
              marginRight: 10

            }}
          >
            <Icon name='cart-plus' size={30} color='white' />
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => { console.log("C") }}
            style={{
              marginRight: 10

            }}
          >
            <Icon name='check-circle-outline' size={30} color='white' />
          </TouchableOpacity>

        </View>
      </View>
  )
}

export default HeaderShoppingDetailComponent