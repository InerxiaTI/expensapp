import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'// App.jsx
import { View, Text, StatusBar } from 'react-native'
import { TabsNavigator } from './src/navigation/TabsNavigator'
import { COLORS } from './src/theme/Theme';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { HomeStackNavigator } from './src/navigation/HomeStackNavigator';

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
        <StatusBar animated={true} translucent backgroundColor="transparent" barStyle="dark-content" />
        <HomeStackNavigator />
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

function useContext(AuthContext: any): { signIn: any; authState: any; } {
  throw new Error('Function not implemented.');
}
