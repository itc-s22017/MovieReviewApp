import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieList from "./screens/MovieList";
import MovieDetail from "./screens/MovieDetail";
import  Ionicons  from '@expo/vector-icons/Ionicons';
import { TouchableOpacity, StyleSheet } from "react-native";
import SearchMovie from "./screens/SearchMovie";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MovieList" component={MovieList} options={({navigation}) => ({
          title: "映画一覧",
          headerStyle: {
            backgroundColor: "#202328",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('SearchMovie') }>
              <Ionicons style={style.all} name="search" size={14} color="#ccc" />
            </TouchableOpacity>
          )
          })}></Stack.Screen>
        <Stack.Screen name="MovieDetail" component={MovieDetail} options={{
          title: "映画詳細",
          headerStyle: {
            backgroundColor: "#202328"
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center"
        }} />
        <Stack.Screen name="SearchMovie" component={SearchMovie} options={{
          title: "映画検索",
          headerStyle: {
            backgroundColor: "#202328"
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const style = StyleSheet.create({
  all: {
    marginRight: 10
  }
})

