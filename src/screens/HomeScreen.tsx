import React from 'react'
import { Text, View } from 'react-native'
import { COLORS } from '../theme/Theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderHomeComponent from '../components/HeaderHomeComponent'

const HomeScreen = () => {
  return (
    <View style={{
      backgroundColor: 
      COLORS.backgroudPrimary, 
      borderColor: 'red', 
      borderWidth: 1}}>
        {/* Header Home */}
        <HeaderHomeComponent />

        {/* FlatList de lista de compras */}

    </View>
  )
}

export default HomeScreen