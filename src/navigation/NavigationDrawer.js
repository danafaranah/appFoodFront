import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/HomeScreen";
import CategoryActions from "../Screens/CategoryActions";
import RecipeActions from "../Screens/RecipeActions";
import RecipeDetailScreen from "../Screens/RecipeDetailScreen";

import {DrawerContent} from "../Screens/DrawerContent"
import colors from "../config/colors";

const Drawer = createDrawerNavigator();

export const NavigationDrawer = () => {

    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}  options={{headerTintColor:{color:colors.white}}}>

            <Drawer.Screen name="HomeScreen" component={HomeScreen}  options={{ headerStyle:{backgroundColor:colors.blue, borderBottomWidth:2, borderBottomColor: colors.orange}, headerTitleStyle:{color:colors.white, fontSize:30, fontWeight: "bold"}, title:"Home"}}/>

            <Drawer.Screen name="DetailScreen" component={RecipeDetailScreen} options={{headerShown: false}}/>

            <Drawer.Screen name="Recipe" component={RecipeActions} options={{headerShown: false}}/>

            <Drawer.Screen name="Category" component={CategoryActions} options={{headerShown: false}}/>
        </Drawer.Navigator>
    )
}  