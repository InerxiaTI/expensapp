import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { StatusBar } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { AuthProvider } from '../context/AuthContext';
import { ShoppingProvider } from '../context/ShoppingContext';
import { TabBarProvider } from '../context/TabBarContext';
import { ShoppingV2Provider } from '../features/shopping/context/ShoppingV2Context';
import { COLORS } from '../theme/Theme';
import { infoLog } from '../utils/HandlerError';
import { MainStackNavigator } from './MainStackNavigator';
import { navigatorRef, isReadyNavigationRef } from './servicesUtil/NavigationService';

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

const Application = () => {

  const setNavigationColor = (color: any) => {
    changeNavigationBarColor(color);
  };

  setNavigationColor(COLORS.tabNavigatorPrimaryColor)

  return (
    <NavigationContainer 
      theme={MyTheme}
      ref={ref => {
        navigatorRef.current = ref
      }}
      onReady={()=>{
        isReadyNavigationRef.current = true;
        infoLog(`isReadyNavigationRef Navigator General: ${isReadyNavigationRef.current}`)
      }}
      >

      <AppState>
        <ShoppingProvider>
          <ShoppingV2Provider>
          <TabBarProvider>
            <StatusBar animated={true} translucent backgroundColor="#3c3b3f" barStyle="default" />
            <MainStackNavigator />
          </TabBarProvider>
          </ShoppingV2Provider>
        </ShoppingProvider>
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
export default Application