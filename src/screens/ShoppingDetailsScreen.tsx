import React from 'react'
import BaseScreenComponent from '../components/BaseScreenComponent'
import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../theme/Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import HeaderShoppingDetailComponent from '../components/HeaderShoppingDetailComponent';


const ShoppingDetailsScreen = () => {

  const navigator = useNavigation();


  return (
    <BaseScreenComponent>
      {/* Header */}
      <HeaderShoppingDetailComponent />




    </BaseScreenComponent>
  )
}

export default ShoppingDetailsScreen