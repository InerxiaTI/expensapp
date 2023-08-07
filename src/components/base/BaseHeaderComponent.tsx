import React from 'react'
import { View } from 'react-native'
import { COLORS } from '../../theme/Theme'


interface BaseHeaderProps {
    children: JSX.Element, 
}

const BaseHeaderComponent = ({children}: BaseHeaderProps) => {


  return (
    <View style={{
        backgroundColor: COLORS.backgroudPrimary,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0,
        borderColor: 'red'
      }}>
        {children}
    </View>
  )
}

export default BaseHeaderComponent