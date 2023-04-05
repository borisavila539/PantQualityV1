import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import { OrdenesScreen } from '../screens/OrdenesScreen';

export type RootStackParams = {
    LoginScreen: undefined,
    OrdenesScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
    return (
        <Stack.Navigator
            screenOptions={
                {
                    headerShown: false
                }
            }>
            <Stack.Screen name='LoginScreen' options={{ title: 'LoginScreen' }} component={LoginScreen} />
            <Stack.Screen name='OrdenesScreen' options={{ title: 'OrdenesScreen' }} component={OrdenesScreen} />
        </Stack.Navigator>
    )
}
