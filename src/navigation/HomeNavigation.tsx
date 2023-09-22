import { createStackNavigator } from "@react-navigation/stack";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import HomeScreen from "../screens/HomeScreen";
import ShoppingDetailsScreen from "../screens/ShoppingDetailsScreen";
import { RootStackParams } from "./MainStackNavigator";

const HomeStack = createStackNavigator<RootStackParams>();

export const HomeNavigation = () => {
    return (
        <HomeStack.Navigator
            initialRouteName='HomeTab'
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent',
                }
            }}
        >
            <HomeStack.Screen name="HomeTab" component={HomeScreen} />
            <HomeStack.Screen name="ShoppingDetails" component={ShoppingDetailsScreen} />
            <HomeStack.Screen name="AddExpense" component={AddExpenseScreen} options={{ animationTypeForReplace: 'push' }} />
        </HomeStack.Navigator>
    )
}