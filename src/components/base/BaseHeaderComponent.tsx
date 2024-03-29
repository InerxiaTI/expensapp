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
        height: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'red',
        width: '100%',
      }}>
        {children}
    </View>
  )
}

export default BaseHeaderComponent