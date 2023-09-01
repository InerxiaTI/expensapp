import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import React from 'react'// App.jsx
import { StatusBar } from 'react-native'
import { COLORS } from './src/theme/Theme';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { AuthProvider } from './src/context/AuthContext';
import { TabBarProvider } from './src/context/TabBarContext';
import { HomeStackNavigator } from './src/navigation/HomeStackNavigator';
import { ShoppingProvider } from './src/context/ShoppingContext';

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

  const setNavigationColor = (color: any) => {
    changeNavigationBarColor(color);
  };

  setNavigationColor(COLORS.tabNavigatorPrimaryColor)

  return (
    <NavigationContainer theme={MyTheme}>

      <AppState>
        <TabBarProvider>
          <ShoppingProvider>
            <StatusBar animated={true} translucent backgroundColor="transparent" barStyle="dark-content" />
            <HomeStackNavigator />
          </ShoppingProvider>
        </TabBarProvider>
      </AppState>
    </NavigationContainer>
  )
}

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}


export default App


