import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import React from 'react'// App.jsx
import { View, Text, StatusBar } from 'react-native'
import { TabsNavigator } from './src/navigation/TabsNavigator'
import { COLORS } from './src/theme/Theme';

// Define tu propio theme personalizado
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Personaliza los colores según tus preferencias
    primary: 'blue',        // Color principal del tema
    background: COLORS.backgroudPrimary,    // Color de fondo de la app
    card: COLORS.backgroudPrimary,      // Color de fondo de las pantallas
    text: 'white',          // Color del texto
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
            <StatusBar animated={true} translucent backgroundColor="transparent" barStyle="dark-content" />

      <TabsNavigator />
    </NavigationContainer>
  )
}

export default App