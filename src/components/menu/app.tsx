import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../pages/home/app';
import Patient from '../../pages/Patient/app';
import Hospital from '../../pages/Hospital/app';
import Doctor from '../../pages/doctor/app';

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { position: 'absolute', bottom: 0, left: 0, right: 0 },
                }}
            >
                <Tab.Screen name="HOME" component={HomeScreen} />
                <Tab.Screen name="HOSPITAL" component={Hospital} />
                <Tab.Screen name="PACIENTE" component={Patient} />
                <Tab.Screen name="MÉDICO" component={Doctor} />

            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomMenu;