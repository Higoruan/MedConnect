import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../pages/home/app';
import Patient from '../../pages/Patient/app';
import HospAdd from '../../pages/Hospital/add';
import HospView from '../../pages/Hospital/view';
// import DoctorAdd from '../../pages/Doctor/add';
// import DoctorView from '../../pages/Doctor/view';
import CidsAdd from '../../pages/Cids/add';
import ConsultaAdd from '../../pages/Consultar/add';
import AtestadoAdd from '../../pages/Atestado/add';
import AtestadoView from '../../pages/Atestado/view';
import ConsultarView from '../../pages/Consultar/view';
import CidsView from '../../pages/Cids/view';
import Dashboard from '../../pages/dashboard/app';

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
                <Tab.Screen name="🤧➕" component={Patient} />
                {/* <Tab.Screen name="👨🏻‍⚕️➕" component={DoctorAdd} /> */}
                {/* <Tab.Screen name="👨🏻‍⚕️📄" component={DoctorView} /> */}
                <Tab.Screen name="😷➕" component={CidsAdd} />
                <Tab.Screen name="!!" component={ConsultaAdd} />
                <Tab.Screen name="!!!" component={ConsultarView} />
                <Tab.Screen name="📃➕" component={AtestadoAdd} />
                <Tab.Screen name="📃" component={AtestadoView} />
                <Tab.Screen name="😷📄" component={CidsView} />
                <Tab.Screen name="📊" component={Dashboard} />

            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomMenu;