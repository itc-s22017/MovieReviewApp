import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { UserScreen } from "../screens/UserScreen";
import { HomeStackNavigator } from "./HomeStackNavigator";
import SearchMovie from "../screens/SearchMovie";

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="検索"
        component={SearchMovie}
        options={{
          tabBarLabel: "検索",
          tabBarIcon: ({ color }) => (
            <Feather name="search" color={color} size={26} />
          ),
          headerTitleAlign: "center",
          headerTintColor:'white',
          headerStyle:{
            backgroundColor:'#202328'
          }
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: "User",
          tabBarIcon: ({ color }) => (
            <Feather name="user" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
