import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/ProfileScreen';
import NewBuyListScreen from '../screens/NewBuyListScreen';
import { COLORS } from '../theme/Theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';


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
            case 'Home':
              iconName = focused ? 'home' : 'home-outline'
              break;

            case 'NewBuyList':
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
      <Tab2.Screen name="Home" options={{ title: 'Inicio' }} component={HomeScreen} />
      <Tab2.Screen name="NewBuyList" options={{ title: 'Nuevo' }} component={NewBuyListScreen} />
      <Tab2.Screen name="Profile" options={{ tabBarLabel: 'Perfil' }} component={ProfileScreen} />
    </Tab2.Navigator>
  )
}

