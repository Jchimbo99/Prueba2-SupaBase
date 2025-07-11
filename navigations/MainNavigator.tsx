import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import BottonNavigator from './BottonNavigator';

const Stack = createStackNavigator();

export default function Navegador() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="App" component={BottonNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
