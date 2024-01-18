import React, { useEffect } from 'react'
import { StatusBar, StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

interface BaseScreenProps {
  children: any,
  screen?: string
  statusBarColor?: string, 
  style?: StyleProp<ViewStyle>,
  headerShown?: boolean
}

const BaseScreenComponent = ({ children, style, screen, statusBarColor='transparent', headerShown=false}: BaseScreenProps) => {

  const { top } = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      if (screen == 'Settings' && statusBarColor) {
        StatusBar.setBackgroundColor(statusBarColor);
      } else {
        StatusBar.setBackgroundColor(statusBarColor)
      }
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        paddingTop: headerShown? 0:top,
        borderWidth: 0,
        borderColor: 'yellow',
        ...style as any
      }}
    >
      {children}
    </View>
  )
}

export default BaseScreenComponent