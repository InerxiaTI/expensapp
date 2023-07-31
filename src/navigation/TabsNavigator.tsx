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
    <Tab2.Navigator
      initialRouteName='Home'
      
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarStyle:{
          height: 70,
          paddingBottom: 10,
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

          return <Icon name={iconName} size={30} color={color} />
        },
      })}

    >
      <Tab2.Screen name="HomeStack" options={{ title: 'Inicio' }} component={HomeStackNavigator} />
      <Tab2.Screen name="NewShoppingList" options={{ title: 'Nuevo' }} component={NewShoppingListScreen} />
      <Tab2.Screen name="Profile" options={{ tabBarLabel: 'Perfil' }} component={ProfileScreen} />
    </Tab2.Navigator>
  )
}

