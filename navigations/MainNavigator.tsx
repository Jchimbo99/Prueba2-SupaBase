import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegistroScreen from '../screens/RegistroScreen'
import { NavigationContainer } from '@react-navigation/native'
import PerfilScreen from '../screens/PerfilScreen'

const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Registro' component={RegistroScreen} />
      <Stack.Screen name='Perfil' component={PerfilScreen} />

    </Stack.Navigator>
  )
}

export default function Navegador() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}