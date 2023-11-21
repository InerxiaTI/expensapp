import { createStackNavigator } from '@react-navigation/stack';
import JoinShoppingListScreen from '../features/join-shopping-list/screens/JoinShoppingListScreen';
import { RootStackParams } from './MainStackNavigator';


const JoinShoppingListStack = createStackNavigator<RootStackParams>();

export const JoinShoppingListNavigation = () => {
    return (
      <JoinShoppingListStack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            elevation: 0,
            shadowColor: 'transparent',
          }
        }}>
        <JoinShoppingListStack.Screen name="JoinShoppingList" component={JoinShoppingListScreen} />
      </JoinShoppingListStack.Navigator>
    )
  }
