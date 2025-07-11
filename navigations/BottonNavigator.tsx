import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OperacionesScreen from '../screens/OperacionesScreen';
import HistorialScreen from '../screens/HistorialScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottonNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName = '';

                    switch (route.name) {
                        case 'Operaciones':
                            iconName = 'add-circle-outline';
                            break;
                        case 'Historial':
                            iconName = 'list-outline';
                            break;
                        case 'Perfil':
                            iconName = 'person-outline';
                            break;
                        default:
                            iconName = 'home-outline';
                    }

                    return <Ionicons name={iconName as any}  size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Operaciones" component={OperacionesScreen} />
            <Tab.Screen name="Historial" component={HistorialScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
}
