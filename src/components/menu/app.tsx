import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../pages/home/app';
import Patient from '../../pages/Patient/add';
import HospAdd from '../../pages/Hospital/add';
import HospView from '../../pages/Hospital/view';
import DoctorAdd from '../../pages/doctor/add';
import DoctorView from '../../pages/doctor/view';
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
                <Tab.Screen name="Hospitais" component={HospView} />
                <Tab.Screen name="Add Hosp." component={HospAdd} />
                <Tab.Screen name="Pacientes" component={Patient} />
                <Tab.Screen name="Medicos" component={DoctorView} />
                <Tab.Screen name="Add Med." component={DoctorAdd} />
                <Tab.Screen name="Cids" component={CidsView} />
                <Tab.Screen name="Add. Cid" component={CidsAdd} />
                <Tab.Screen name="Culsultas" component={ConsultarView} />
                <Tab.Screen name="Add Consulta" component={ConsultaAdd} />
                <Tab.Screen name="Atestados" component={AtestadoView} />
                <Tab.Screen name="Add. Atestado" component={AtestadoAdd} />
                <Tab.Screen name="📊" component={Dashboard} />

            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomMenu;