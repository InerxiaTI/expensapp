import { createStackNavigator } from '@react-navigation/stack';
import ShoppingDetailsScreen from '../screens/ShoppingDetailsScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export const HomeStackNavigator = () => {
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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ShoppingDetails" component={ShoppingDetailsScreen} />
    </Stack.Navigator>
  );
}