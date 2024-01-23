import { CardStyleInterpolators, HeaderStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
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
                    shadowColor: '#3f007b',
                    }
            }}
        >
            <HomeStack.Screen  name="Home" component={HomeScreen} />
            <HomeStack.Screen name="ShoppingDetails" component={ShoppingDetailsScreen} 
            options={{
                title: 'ShoppingDetails',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft ,
                presentation: "card",
             }}
            />
            <HomeStack.Screen name="AddExpense" component={AddExpenseScreen} 
                options={{ 
                    presentation: "modal",
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,

                }} 
            />
            <HomeStack.Screen name="AddCollaboratorAsShopper" component={AddCollaboratorAsShopperScreen} 
            options={{
                title: 'AddCollaboratorAsShopper',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                presentation: "card",

             }}
            />
            <HomeStack.Screen name="Collaborators" component={CollaboratorsScreen} 
                options={{
                    title: 'Collaborators',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    presentation: "card"

                 }}
            />
            <HomeStack.Screen name="AssignPercentageCollaborator" component={AssignPercentageCollaboratorScreen} 
            options={{
                title: 'AssignPercentageCollaborator',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS ,
                presentation: "card",

             }}
            />
        </HomeStack.Navigator>
    )
}
