import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../pages/home/app';
import Patient from '../../pages/Patient/app';
import HospAdd from '../../pages/Hospital/add';
import HospView from '../../pages/Hospital/view';
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
                <Tab.Screen name="🏥➕" component={HospAdd} />
                <Tab.Screen name="🏥📄" component={HospView} />
                <Tab.Screen name="😷➕" component={Patient} />
                <Tab.Screen name="👨🏻‍⚕️➕" component={Doctor} />

            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomMenu;