import React from 'react'
import { Platform, StatusBar, StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

interface BaseScreenProps {
  children: any,
  screen?: string
  statusBarColor?: string, 
  style?: StyleProp<ViewStyle>,
  noHeaderShown?: boolean
}

const BaseScreenComponent = ({ children, style, screen, statusBarColor='#3c3b3f', noHeaderShown=false}: BaseScreenProps) => {

  const { top } = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      if(Platform.OS === 'android'){
        if (screen == 'Settings') {
          StatusBar.setBackgroundColor("#3f007b");
        } else {
          StatusBar.setBackgroundColor(statusBarColor)
        }
      }
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        paddingTop: noHeaderShown?top:0,
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