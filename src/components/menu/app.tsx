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
                <Tab.Screen name="HOSPITAL ADD" component={HospAdd} />
                <Tab.Screen name="HOSPITAL VIEW" component={HospView} />
                <Tab.Screen name="PACIENTE" component={Patient} />
                {/* <Tab.Screen name="👨🏻‍⚕️➕" component={DoctorAdd} /> */}
                {/* <Tab.Screen name="👨🏻‍⚕️📄" component={DoctorView} /> */}
                <Tab.Screen name="CIDS ADD" component={CidsAdd} />
                <Tab.Screen name="CIDS VIEW" component={CidsView} />
                <Tab.Screen name="CONSULTA ADD" component={ConsultaAdd} />
                <Tab.Screen name="CONSULTA VIEW" component={ConsultarView} />
                <Tab.Screen name="ATESTADO ADD" component={AtestadoAdd} />
                <Tab.Screen name="ATESTADO VIEW" component={AtestadoView} />
                <Tab.Screen name="📊" component={Dashboard} />

            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomMenu;