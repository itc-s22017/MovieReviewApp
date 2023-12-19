import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from "@expo/vector-icons"
import { UserScreen } from '../screens/UserScreen';
import {HomeStackNavigator} from './HomeStackNavigator';


const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => { 
    return (
        <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "blue",tabBarInactiveTintColor:"gray"}}>
            <Tab.Screen name='Home'
             component={HomeStackNavigator}
             options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <Feather name="home" color={color} size={26} />
                ),
                headerShown:false
             }}
              />
            <Tab.Screen name='User'
             component={UserScreen}
             options={{
                tabBarLabel: 'User',
                tabBarIcon: ({ color }) => (
                  <Feather name="user" color={color} size={26} />
                ),
             }}
              />
        </Tab.Navigator>
    )
}