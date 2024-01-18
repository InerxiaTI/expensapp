import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from "@react-navigation/stack";
import AddExpenseScreen from "../features/add-shopping/screens/AddExpenseScreen";
import HomeScreen from "../features/shopping-list/screens/HomeScreen";
import ShoppingDetailsScreen from "../features/shopping/screens/ShoppingDetailsScreen";
import { RootStackParams } from "./MainStackNavigator";
import AddCollaboratorAsShopperScreen from "../features/add-shopping/screens/AddCollaboratorAsShopperScreen";
import AssignPercentageCollaboratorScreen from "../features/shopping/screens/AssignPercentageCollaboratorScreen";
import CollaboratorsScreen from "../features/shopping/screens/CollaboratorsScreen";

const HomeStack = createStackNavigator<RootStackParams>();

export const HomeNavigation = () => {
    return (
        <HomeStack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent',
                    }
            }}
        >
            <HomeStack.Screen  name="Home" component={HomeScreen} />
            <HomeStack.Screen name="ShoppingDetails" component={ShoppingDetailsScreen} 
            options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS ,
             }}
            />
            <HomeStack.Screen name="AddExpense" component={AddExpenseScreen} options={{ presentation: "modal"}} />
            <HomeStack.Screen name="AddCollaboratorAsShopper" component={AddCollaboratorAsShopperScreen} />
            <HomeStack.Screen name="Collaborators" component={CollaboratorsScreen} />
            <HomeStack.Screen name="AssignPercentageCollaborator" component={AssignPercentageCollaboratorScreen} />
        </HomeStack.Navigator>
    )
}
