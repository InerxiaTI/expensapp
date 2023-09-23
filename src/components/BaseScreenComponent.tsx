import React, { useEffect } from 'react'
import { StatusBar, StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { infoLog } from '../utils/HandlerError';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

interface BaseScreenProps {
  children: any,
  screen?: string
  statusBarColor?: string, 
  style?: StyleProp<ViewStyle>,
}

const BaseScreenComponent = ({ children, style, screen, statusBarColor }: BaseScreenProps) => {

  const { top, bottom } = useSafeAreaInsets();

  console.log(top);
  console.log("Bottom" + bottom);

  useFocusEffect(
    useCallback(() => {
      infoLog("BASE SCREEN: " + screen);
      if (screen == 'Settings' && statusBarColor) {
        StatusBar.setBackgroundColor(statusBarColor);
      } else {
        StatusBar.setBackgroundColor('transparent')
      }
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
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