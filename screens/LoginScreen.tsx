import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../supabase/Config';

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  async function login() {
    if (!correo || !contrasena) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña.');
      return;
    }

  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      Alert.alert('Error', 'Correo electrónico no válido.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena,
    });

    if (data.user) {
      navigation.replace('App'); 
    } else {
      
      if (error?.message?.includes('Invalid login credentials')) {
        Alert.alert('Error', 'Correo o contraseña incorrectos.');
      } else {
        Alert.alert('Error', error?.message || 'Error desconocido');
      }
    }
  }

  return (
    <View style={styles.container}>
      <MaterialIcons name="lock" size={100} color="#043346" style={styles.icon} />
      <Text style={styles.title}>LOGIN</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setCorreo}
        value={correo}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setContrasena}
        value={contrasena}
      />

      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={styles.textButton}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    color: '#043346',
  },
  input: {
    borderWidth: 1, 
    borderColor: 'gray', 
    padding: 10, 
    marginVertical: 10,
    fontSize: 18, 
    borderRadius: 8, 
    width: '80%',
  },
  button: {
    backgroundColor: '#043346', 
    paddingVertical: 12, 
    paddingHorizontal: 30,
    borderRadius: 8, 
    marginTop: 20,
  },
  textButton: {
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold',
  },
});
