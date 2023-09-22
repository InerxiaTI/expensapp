import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/SettingsScreen';
import { COLORS } from '../theme/Theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewShoppingListScreen from '../screens/NewShoppingListScreen';
import { NewShoppingListStack, SettingsStack } from './MainStackNavigator';
import { AuthContext } from '../context/AuthContext';
import { useTabBarVisibility } from '../context/TabBarContext';
import { HomeNavigation } from './HomeNavigation';
import { JoinShoppingListNavigation } from './JoinShoppingListNavigation';
import { useNavigation } from '@react-navigation/core';
import { infoLog } from '../utils/HandlerError';
import { getCurrentRoute, getCurrentScreenName } from './servicesUtil/NavigationService';


const Tab = createMaterialBottomTabNavigator();
const Tab2 = createBottomTabNavigator();

export const TabsNavigator = () => {
  return (
    TabNoMaterial2()
  )
}

const TabMaterial = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      inactiveColor='grey'
      // style={{
      //   borderRadius: 30
      // }}

      // barStyle={ {
      //   borderTopWidth: 0,
      //   backgroundColor: COLORS.tabNavigatorPrimaryColor,
      //   borderRadius: 2,
      //   borderColor: 'red',
      //   borderWidth: 1
      // }}

      //       barStyle={{
      //         borderWidth: 0.5,
      //         borderBottomWidth: 1,
      //         backgroundColor:'white',
      //         borderTopLeftRadius: 30,
      //         borderTopRightRadius: 30,
      //         borderColor: 'transparent',
      //         overflow: 'hidden',
      // }}

      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused }) => {

          let iconName: string = '';
          switch (route.name) {
            case 'HomeStack':
              iconName = focused ? 'home' : 'home-outline'
              break;

            case 'NewShoppingList':
              iconName = focused ? 'plus-circle' : 'plus-circle-outline'
              break;

            case 'Profile':
              iconName = focused ? 'account' : 'account-outline'
              break;
          }

          return <Icon name={iconName} size={24} color={color} />
        },
      })}

    >
      <Tab.Screen name="HomeStack"
        options={{
          tabBarLabel: 'Home',
          tabBarColor: 'red'
        }}
        component={HomeNavigation} />
      <Tab.Screen name="NewShoppingList" options={{ title: 'Nuevo' }} component={NewShoppingListScreen} />
      <Tab.Screen name="Profile" options={{ tabBarLabel: 'Perfil' }} component={ProfileScreen} />
    </Tab.Navigator>
  )
}





const TabNoMaterial2 = () => {
  const { authState } = useContext(AuthContext);
  console.log("TabNoMaterial2 logueado: " + authState.isLoggedIn);
  const currentRouteName = getCurrentScreenName();

  infoLog("current screen: " + currentRouteName, "TAB_BAR");

  const isRoutePartOfTabBar = () => {
    const tabBarRoutes = ["HomeStack", "NewShoppingListStack", "JoinShoppingListStack", "SettingsStack", 
    "Home", "NewShoppingList", "JoinShoppingList", "Settings", "Tabs"];
    return tabBarRoutes.includes(currentRouteName);
  };
  return (
    <Tab2.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: 'white',
        // tabBarActiveBackgroundColor: COLORS.backgroudPrimary,
        tabBarShowLabel: true,
        tabBarStyle: {
          display: isRoutePartOfTabBar()? 'flex' : 'none',
          borderTopWidth: 0,
          backgroundColor: COLORS.tabNavigatorPrimaryColor,
          paddingTop: 7,
          // borderTopLeftRadius: 30,
          // borderTopRightRadius: 30,
          // borderLeftWidth: 0.2,
          // borderRightWidth: 0.2,
          // borderColor: 'white',
          // position: 'absolute',
          // overflow: 'hidden',

          shadowColor: "green",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,

          elevation: 12,

        },
        tabBarIcon: ({ color, focused }) => {
          // infoLogTag("ICON: "+route.name, "TAB_BAR")
          let iconName: string = '';
          switch (route.name) {
            case 'HomeStack':
              iconName = focused ? 'home' : 'home-outline'
              break;

            case 'NewShoppingListStack':
              iconName = focused ? 'plus-circle' : 'plus-circle-outline'
              break;
            case 'JoinShoppingListStack':
              iconName = focused ? 'account-multiple' : 'account-multiple-outline'
              break;

            case 'SettingsStack':
              iconName = focused ? 'cog' : 'cog-outline'
              break;
          }

          return <Icon name={iconName} size={24} color={color} />
        },
      })}

    >
      <Tab2.Screen name="HomeStack" options={{ title: 'Inicio' }} component={HomeNavigation} />
      <Tab2.Screen name="NewShoppingListStack" options={{ title: 'Nuevo' }} component={NewShoppingListStack} />
      <Tab2.Screen name="JoinShoppingListStack" options={{ title: 'Unirse' }} component={JoinShoppingListNavigation} />
      <Tab2.Screen name="SettingsStack" options={{ tabBarLabel: 'Ajustes'}} component={SettingsStack} />
    </Tab2.Navigator>
  )





}

const TabNoMaterial = () => {
  return (
    <Tab2.Navigator
      initialRouteName='Home'

      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarShowLabel: true,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: COLORS.tabNavigatorPrimaryColor,
        },
        tabBarIcon: ({ color, focused }) => {

          let iconName: string = '';
          switch (route.name) {
            case 'HomeStack':
              iconName = focused ? 'home' : 'home-outline'
              break;

            case 'NewShoppingList':
              iconName = focused ? 'plus-circle' : 'plus-circle-outline'
              break;

            case 'Profile':
              iconName = focused ? 'account' : 'account-outline'
              break;
          }

          return <Icon name={iconName} size={24} color={color} />
        },
      })}

    >
      <Tab2.Screen name="HomeStack" options={{ title: 'Inicio' }} component={HomeStackNavigator} />
      <Tab2.Screen name="NewShoppingList" options={{ title: 'Nuevo' }} component={NewShoppingListScreen} />
      <Tab2.Screen name="Profile" options={{ tabBarLabel: 'Perfil' }} component={ProfileScreen} />
    </Tab2.Navigator>
  )
}
