import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import { TabsNavigator } from './TabsNavigator';
import { AddExpenseParams, ShoppingList } from '../interfaces/ShoppingInterface';
import SettingsScreen from '../screens/SettingsScreen';
import NewShoppingListScreen from '../screens/NewShoppingListScreen';
import { AddCollaboratorAsShopperParams } from '../screens/AddCollaboratorAsShopperScreen';
import { CollaboratorsParams } from '../interfaces/UserInterface';
import ErrorInesperadoScreen from '../screens/error/ErrorGeneralScreen';
import { infoLog } from '../utils/HandlerError';

export type RootStackParams = {
  Auth: undefined,
  Tabs: undefined,
  Home: undefined,
  ShoppingDetails: ShoppingList,
  AddExpense: AddExpenseParams,
  Login: undefined,
  NewShoppingList: undefined,
  JoinShoppingList: undefined,
  Settings: undefined,
  AddCollaboratorAsShopper: AddCollaboratorAsShopperParams,
  Collaborators: CollaboratorsParams,
  AssignPercentageCollaborator: any,
  ErrorInesperado: any,

}

const Stack = createStackNavigator<RootStackParams>();

export const NewShoppingListStack = () => {
  return (
    <Stack.Navigator
      // initialRouteName='NewShoppingList'
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

const AuthStack = createStackNavigator();

export const AuthNavigation = () => {

  infoLog("EN EL AUTH NAVIGATION")


  return (
    <AuthStack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        }
      }}
    >
      <AuthStack.Screen name="Login" options={{
        gestureEnabled: false
      }} component={LoginScreen} />
    </AuthStack.Navigator>
  );
}
const StackError = createStackNavigator();


export const ErrorGeneralStack = () => {
  return (
    <StackError.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        }
      }}>
      <StackError.Screen name="ErrorInesperado" component={ErrorInesperadoScreen} />
    </StackError.Navigator>
  )
}

export const MainStackNavigator = () => {

  const { authState } = useContext(AuthContext);
  console.log("MAINS STACK NAVI logueado: " + authState.isLoggedIn);

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
      <Stack.Screen name="Auth" component={AuthNavigation} />
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      <Stack.Screen name="ErrorInesperado" component={ErrorInesperadoScreen} />
    </Stack.Navigator>
  );




}