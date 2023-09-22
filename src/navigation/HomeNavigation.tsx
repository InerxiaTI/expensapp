import { createStackNavigator } from "@react-navigation/stack";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import HomeScreen from "../screens/HomeScreen";
import ShoppingDetailsScreen from "../screens/ShoppingDetailsScreen";
import { RootStackParams } from "./MainStackNavigator";
import AddCollaboratorAsShopperScreen from "../screens/AddCollaboratorAsShopperScreen";
import AssignPercentageCollaboratorScreen from "../screens/AssignPercentageCollaboratorScreen";
import CollaboratorsScreen from "../screens/CollaboratorsScreen";

const HomeStack = createStackNavigator<RootStackParams>();

export const HomeNavigation = () => {
    return (
        <HomeStack.Navigator
            // initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent',
                }
            }}
        >
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="ShoppingDetails" component={ShoppingDetailsScreen} />
            <HomeStack.Screen name="AddExpense" component={AddExpenseScreen} options={{ animationTypeForReplace: 'push' }} />
            <HomeStack.Screen name="AddCollaboratorAsShopper" component={AddCollaboratorAsShopperScreen} />
            <HomeStack.Screen name="Collaborators" component={CollaboratorsScreen} />
            <HomeStack.Screen name="AssignPercentageCollaborator" component={AssignPercentageCollaboratorScreen} />
        </HomeStack.Navigator>
    )
}