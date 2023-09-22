import { createStackNavigator } from '@react-navigation/stack';
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
import { AssignPercentageParams, CollaboratorsParams } from '../interfaces/UserInterface';
import AssignPercentageCollaboratorScreen from '../screens/AssignPercentageCollaboratorScreen';
import ErrorInesperadoScreen from '../screens/error/ErrorGeneralScreen';

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
  AssignPercentageCollaborator: any,
  ErrorInesperado: any,

}

const Stack = createStackNavigator<RootStackParams>();

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
        <Stack.Screen name="AddCollaboratorAsShopper" component={AddCollaboratorAsShopperScreen}/>
        <Stack.Screen name="Collaborators" component={CollaboratorsScreen}/>
        <Stack.Screen name="AssignPercentageCollaborator" component={AssignPercentageCollaboratorScreen}/>
        <Stack.Screen name="ErrorInesperado" component={ErrorInesperadoScreen}/>

      </Stack.Navigator>
    );
  } else {
    return (
      <AuthStack />
    )
  }



}