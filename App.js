import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieList from "./src/screens/MovieList";

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='MovieList' component={MovieList} options={{title: '映画一覧',headerStyle: { backgroundColor: '£202328'},headerTintColor:'£fff'}}>

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

