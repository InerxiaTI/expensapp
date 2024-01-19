import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import { TabsNavigator } from './TabsNavigator';
import { AddExpenseParams, ShoppingList } from '../interfaces/ShoppingInterface';
import SettingsScreen from '../screens/SettingsScreen';
import NewShoppingListScreen from '../features/create-shopping-list/screens/NewShoppingListScreen';
import { AddCollaboratorAsShopperParams } from '../features/add-shopping/screens/AddCollaboratorAsShopperScreen';
import { CollaboratorsParams } from '../interfaces/UserInterface';
import ErrorInesperadoScreen from '../screens/error/ErrorGeneralScreen';
import { infoLog } from '../utils/HandlerError';
import LanguageScreen from '../screens/LanguageScreen';
import LoadingComponent from '../components/LoadingComponent';

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
  Language: undefined,
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
    initialRouteName='Settings'
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        }
      }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
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
  console.log("MAINS STACK NAVI logueado: " + JSON.stringify(authState));

  if (authState.status === 'checking') return <LoadingComponent />

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
      {
        (authState.status !== 'authenticated')
        ?(
          <Stack.Screen name="Auth" component={AuthNavigation} />
        )
        : (
         <>
            <Stack.Screen name="Tabs" component={TabsNavigator} />
            <Stack.Screen name="ErrorInesperado" component={ErrorInesperadoScreen} />
         </>
        )
      }
    
     
    </Stack.Navigator>
  );




}
