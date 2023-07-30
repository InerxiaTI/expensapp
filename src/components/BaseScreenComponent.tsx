import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface BaseScreenProps {
    children: any
}

const BaseScreenComponent = ({children}:BaseScreenProps) => {
  return (
    <SafeAreaView>
        {children}
    </SafeAreaView>
  )
}

export default BaseScreenComponent