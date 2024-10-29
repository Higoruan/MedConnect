import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../pages/home/app';
import DataUser from '../../pages/dataUser/app';
import Register from '../../pages/Register/app';

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { position: 'absolute', bottom: 0, left: 0, right: 0 },
                }}
            >
                <Tab.Screen name="Página Inicial" component={HomeScreen} options={{ tabBarIcon: () => (
                    <Ionicons name="home" size={24} color="gray" />
                ) }}/>
                <Tab.Screen name="Perfil" component={DataUser} options={{ tabBarIcon: () => (
                    <Ionicons name="person" size={24} color="gray" />
                ) }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomMenu;