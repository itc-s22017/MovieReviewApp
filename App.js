import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieList from "./src/screens/MovieList";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { View,Text } from "react-native"

const Stack = createNativeStackNavigator()
export default function App() {

  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        console.log(user)
        setUser(user)
      } else {
        setUser('')
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {user ?
          <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Home', headerStyle: { backgroundColor: '£202328' }, headerTintColor: '£fff' }} />
          :
          <Stack.Screen name='Register' component={RegisterScreen} options={{ title: 'Register', headerStyle: { backgroundColor: '£202328' }, headerTintColor: '£fff', headerTitleAlign: "center" }} />
        } */}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

