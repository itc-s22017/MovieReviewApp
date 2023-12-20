import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MovieDetail from "../screens/MovieDetail";
import { StyleSheet } from "react-native";
import SearchMovie from "../screens/SearchMovie";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

export const SearchForBottom = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SearchMovie"
                component={SearchMovie}
                options={{
                    headerStyle: {
                        backgroundColor: "#202328",
                    },
                    headerTintColor: "#fff",
                    headerTitleAlign: "center",
                    headerShown:false,
                }}
            />
            <Stack.Screen
                name="MovieDetail"
                component={MovieDetail}
                options={{
                    headerStyle: {
                        backgroundColor: "#202328",
                    },
                    headerTintColor: "#fff",
                    headerTitleAlign: "center",
                }}
            />
        </Stack.Navigator>
    );
};

// export const HomeStackNavigator = () => (
//     <RootStack.Navigator>
//         <RootStack.Group screenOptions={{ presentation: "modal" }}>
//             <RootStack.Screen
//                 name="Main"
//                 component={MainStack}
//                 options={{ headerShown: false }}
//             />
//             {/* <RootStack.Screen name="CreateReview" component={CreateReviewScreen} /> */}
//         </RootStack.Group>
//     </RootStack.Navigator>
// );

const style = StyleSheet.create({
    all: {
        marginRight: 10,
    },
});
