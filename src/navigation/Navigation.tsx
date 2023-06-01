import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import OrdenesScreen from '../screens/OrdenesScreen';
import MedidasScreen from '../screens/MedidasScreen';
import TipoMedidaScreen from '../screens/TipoMedidaScreen';
import LavadoScreen from '../screens/LavadoScreen';
import HomeScreen from '../screens/HomeScreen';
import ComentarioScreen from '../screens/ComentarioScreen';
import ModulosScreen from '../screens/ModulosScreen';


export type RootStackParams = {
    LoginScreen: undefined,
    OrdenesScreen: undefined,
    MedidasScreen: undefined,
    TipoMedidaScreen: undefined,
    LavadoScreen: undefined,
    HomeScreen: undefined,
    ComentarioScreen: undefined,
    ModulosScreen: undefined
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
            <Stack.Screen name='HomeScreen' options={{ title: 'HomeScreen' }} component={HomeScreen} />
            <Stack.Screen name='OrdenesScreen' options={{ title: 'OrdenesScreen' }} component={OrdenesScreen} />
            <Stack.Screen name='MedidasScreen' options={{ title: 'MedidasScreen' }} component={MedidasScreen} />
            <Stack.Screen name='TipoMedidaScreen' options={{ title: 'TipoMedidaScreen' }} component={TipoMedidaScreen} />
            <Stack.Screen name='LavadoScreen' options={{ title: 'LavadoScreen' }} component={LavadoScreen} />
            <Stack.Screen name='ComentarioScreen' options={{ title: 'ComentarioScreen' }} component={ComentarioScreen} />
            <Stack.Screen name='ModulosScreen' options={{ title: 'ModulosScreen' }} component={ModulosScreen} />

        </Stack.Navigator>
    )
}
