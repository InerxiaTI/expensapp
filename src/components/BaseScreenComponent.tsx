import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface BaseScreenProps {
    children: any,
    style?: StyleProp<ViewStyle>,
}

const BaseScreenComponent = ({children, style}:BaseScreenProps) => {

  const { top, bottom } = useSafeAreaInsets();

  console.log(top);
  console.log("Bottom"+bottom);

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