import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../theme/Theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewShoppingListScreen from '../screens/NewShoppingListScreen';
import { HomeStackNavigator } from './HomeStackNavigator';


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
        component={HomeStackNavigator} />
      <Tab.Screen name="NewShoppingList" options={{ title: 'Nuevo' }} component={NewShoppingListScreen} />
      <Tab.Screen name="Profile" options={{ tabBarLabel: 'Perfil' }} component={ProfileScreen} />
    </Tab.Navigator>
  )
}

const TabNoMaterial2 = () => {
  return (
    <Tab2.Navigator
      initialRouteName='Home'
      
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'white',
        // tabBarActiveBackgroundColor: COLORS.backgroudPrimary,
        tabBarShowLabel: true,
        tabBarStyle: {
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

          let iconName: string = '';
          switch (route.name) {
            case 'Home':
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
      <Tab2.Screen name="Home" options={{ title: 'Inicio' }} component={HomeScreen} />
      <Tab2.Screen name="NewShoppingList" options={{ title: 'Nuevo' }} component={NewShoppingListScreen} />
      <Tab2.Screen name="Profile" options={{ tabBarLabel: 'Perfil' }} component={ProfileScreen} />
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
