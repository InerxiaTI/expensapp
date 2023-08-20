import { createStackNavigator } from '@react-navigation/stack';
import ShoppingDetailsScreen from '../screens/ShoppingDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import { TabsNavigator } from './TabsNavigator';
import { AddExpenseParams, CreateShoppingRequest, ShoppingList } from '../interfaces/ShoppingInterface';
import SettingsScreen from '../screens/SettingsScreen';
import JoinShoppingListScreen from '../screens/JoinShoppingListScreen';
import NewShoppingListScreen from '../screens/NewShoppingListScreen';
import AddCollaboratorAsShopperScreen from '../screens/AddCollaboratorAsShopperScreen';
import CollaboratorsScreen from '../screens/CollaboratorsScreen';
import { CollaboratorsParams } from '../interfaces/UserInterface';

export type RootStackParams = {
  Tabs: undefined,
  HomeTab: undefined,
  ShoppingDetails: ShoppingList,
  AddExpense: AddExpenseParams,
  Login: undefined,
  NewShoppingList: undefined,
  JoinShoppingList: undefined,
  Settings: undefined,
  AddCollaboratorAsShopper: CreateShoppingRequest,
  Collaborators: CollaboratorsParams,

}

const Stack = createStackNavigator<RootStackParams>();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='HomeTab'
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        }
      }}
    >
      <Stack.Screen name="HomeTab" component={HomeScreen} />
      <Stack.Screen name="ShoppingDetails" component={ShoppingDetailsScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{animationTypeForReplace: 'push'}}/>
    </Stack.Navigator>
  )
}

export const NewShoppingListStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        }
      }}>
      <Stack.Screen name="NewShoppingList" component={NewShoppingListScreen} />
    </Stack.Navigator>
  )
}
export const JoinShoppingListStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        }
      }}>
      <Stack.Screen name="JoinShoppingList" component={JoinShoppingListScreen} />
    </Stack.Navigator>
  )
}
export const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        }
      }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

export const AuthStack = () => {
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
        <Stack.Screen name="AddExpense" component={AddExpenseScreen}/>
        <Stack.Screen name="AddCollaboratorAsShopper" component={AddCollaboratorAsShopperScreen}/>
        <Stack.Screen name="Collaborators" component={CollaboratorsScreen}/>

      </Stack.Navigator>
    );
  } else {
    return (
      <AuthStack />
    )
  }



}