import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MovieDetail from "../screens/MovieDetail";
import { StyleSheet } from "react-native";
import SearchMovie from "../screens/SearchMovie";
import CreateReviewScreen from "../screens/CreateReviewScreen";

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
                    title:'映画検索'
                    // headerShown: false,
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
                    // headerShown:false
                }}
            />
            <Stack.Screen
                name="CreateReviewScreen"
                component={CreateReviewScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#202328",
                    },
                    headerTintColor: "#fff",
                    headerTitleAlign: "center",
                    // headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

const style = StyleSheet.create({
    all: {
        marginRight: 10,
    },
});
