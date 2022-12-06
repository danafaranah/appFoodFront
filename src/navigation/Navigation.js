import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryActions from "../Screens/CategoryActions";
import HomeScreen from "../Screens/HomeScreen";
import RecipeActions from "../Screens/RecipeActions";
import RecipeDetailScreen from "../Screens/RecipeDetailScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />

      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen name="DetailScreen" component={RecipeDetailScreen} />

      <Stack.Screen name="ActionScreen" component={RecipeActions} />

      <Stack.Screen name="CategoryScreen" component={CategoryActions} />
    </Stack.Navigator>
  );
};
