import React from 'react'
import { View } from 'react-native'
import { COLORS } from '../../theme/Theme'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'


interface BaseHeaderProps {
    children: JSX.Element, 
}

const BaseHeaderComponent = ({children}: BaseHeaderProps) => {
  const { top } = useSafeAreaInsets();


  return (
    <SafeAreaView style={{
        backgroundColor: COLORS.backgroudPrimary,
        height: 50+top,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0,
        borderColor: 'red',
        position: 'absolute',
        zIndex: 999,
        width: '100%',
      }}>
        {children}
    </SafeAreaView>
  )
}

export default BaseHeaderComponent