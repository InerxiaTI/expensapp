import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import React from 'react'// App.jsx
import { StatusBar } from 'react-native'
import { COLORS } from './src/theme/Theme';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { AuthProvider } from './src/context/AuthContext';
import { TabBarProvider } from './src/context/TabBarContext';
import { MainStackNavigator } from './src/navigation/MainStackNavigator';
import { ShoppingProvider } from './src/context/ShoppingContext';
import { isReadyNavigationRef, navigatorRef } from './src/navigation/servicesUtil/NavigationService';
import { infoLog } from './src/utils/HandlerError';
import container from './src/IOCContainer';
import { ShoppingListRepositoryImpl } from './src/infrastructure/repositories/ShoppingListRepositoryImpl';
import { ShoppingListService } from './src/infrastructure/services/ShoppingListService';
import { AxiosHttp } from './src/infrastructure/network/http';
import { GetShoppingListUseCase } from './src/application/useCases/getShoppingList';

const axiosHttp = new AxiosHttp()
const shoppingListService = new ShoppingListService(axiosHttp)
const shoppingListRepository = new ShoppingListRepositoryImpl(shoppingListService)
const getShoppingListUseCase = new GetShoppingListUseCase(shoppingListRepository);


container.register('axiosHttp', axiosHttp);
container.register('shoppingListService', shoppingListService);
container.register('shoppingListRepository', shoppingListRepository);
container.register('getShoppingListUseCase', getShoppingListUseCase);


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
    <NavigationContainer 
      theme={MyTheme}
      ref={navigatorRef}
      onReady={()=>{
        isReadyNavigationRef.current = true;
        infoLog(`isReadyNavigationRef Navigator General: ${isReadyNavigationRef.current}`)
      }}
      >

      <AppState>
        <ShoppingProvider>
          <TabBarProvider>
            <StatusBar animated={true} translucent backgroundColor="transparent" barStyle="default" />
            <MainStackNavigator />
          </TabBarProvider>
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


export default App


