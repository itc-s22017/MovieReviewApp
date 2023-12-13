import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen"

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        {/* <Stack.Screen name="Shop" component={ShopScreen} />  */}
      </Stack.Navigator>
  );
};

export const HomeStackNavigator = () => (
  <RootStack.Navigator>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="Main" component={MainStack} options={{ headerShown:false}}/>
        {/* <RootStack.Screen name="CreateReview" component={CreateReviewScreen} /> */}
      </RootStack.Group>
    </RootStack.Navigator>
);