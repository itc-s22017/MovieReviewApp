import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import AuthStackNavigator from './AuthStackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { MainTabNavigator } from './MainTabNavigator';
import { UserContext } from '../context/UserContext';


export const AppNavigator = () => {
    const { user } = useContext(UserContext)
    return (
        <NavigationContainer>
            {!user ? <AuthStackNavigator /> : <MainTabNavigator />}
        </NavigationContainer>
    )
}
