import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from 'react';
import { AppNavigator } from "./src/navigation/AppNavigator";
import { UserContext } from "./src/context/UserContext";

const Stack = createNativeStackNavigator()
export default function App() {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }} >
      <AppNavigator />
    </UserContext.Provider>
  )
};

