import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../pages/home/app';
import DataUser from '../../pages/dataUser/app';
import MedicoForm from '../../pages/DoctorForm/app';

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
                <Tab.Screen name="USER" component={DataUser} />
                <Tab.Screen name="MEDICO" component={MedicoForm} />

            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomMenu;