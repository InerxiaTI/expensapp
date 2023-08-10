import { createStackNavigator } from '@react-navigation/stack';
import ShoppingDetailsScreen from '../screens/ShoppingDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import { TabsNavigator } from './TabsNavigator';
import { ShoppingList } from '../interfaces/ShoppingInterface';

export type RootStackParams = {
  HomeTab: undefined,
  ShoppingDetails: ShoppingList,
  AddExpense: undefined,
  Login: undefined,

}

const Stack = createStackNavigator<RootStackParams>();

export const HomeStackNavigator = () => {

  const { authState } = useContext(AuthContext);
  console.log("logueado: " + authState.isLoggedIn);

  if (authState.isLoggedIn) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            elevation: 0,
            shadowColor: 'transparent',
          }
        }}
      >
        <Stack.Screen name="HomeTab" component={TabsNavigator} />
        <Stack.Screen name="ShoppingDetails" component={ShoppingDetailsScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false,
          headerStyle: {
            elevation: 0,
            shadowColor: 'transparent',
          }
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }



}