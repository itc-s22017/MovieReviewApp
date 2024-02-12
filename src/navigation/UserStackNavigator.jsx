import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MovieDetail from "../screens/MovieDetail";
import { StyleSheet } from "react-native";
import SearchMovie from "../screens/SearchMovie";
import CreateReviewScreen from "../screens/CreateReviewScreen";
import { UserScreen } from "../screens/UserScreen";
import Ranking from "../screens/Ranking";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

export const UserStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserScreen"
                component={UserScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#202328",
                    },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    title: 'ユーザー情報'
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
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    title: 'ユーザー情報'
                }}
            />
            <Stack.Screen
                name="UserDetailScreen"  
                component={UserScreen}
                options={{
                    title: "ユーザー情報",
                    headerStyle: {
                        backgroundColor: "#202328",
                    },
                    headerTintColor: "#fff",
                    headerTitleAlign: "center",
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
            <Stack.Screen
                name="Ranking"
                component={Ranking}
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

// export const SearchAndDetail = () => (
//     <RootStack.Navigator>
//         <RootStack.Group screenOptions={{ presentation: "modal" }}>
//             <RootStack.Screen
//                 name="SearchForBottom"
//                 component={SearchForBottom}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="CreateReviewScreen"
//                 component={CreateReviewScreen}
//                 options={{
//                     headerStyle: {
//                         backgroundColor: "#202328",
//                     },
//                     headerTintColor: "#fff",
//                     headerTitleAlign: "center",
//                     // headerShown: false,
//                 }}
//             />
//         </RootStack.Group>
//     </RootStack.Navigator>
// );


const style = StyleSheet.create({
    all: {
        marginRight: 10,
    },
});
