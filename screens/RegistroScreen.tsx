import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../supabase/Config';

export default function RegistroScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const [celular, setCelular] = useState('');

  async function registro() {
    if (!correo || !contrasena || !nombre || !celular) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      Alert.alert('Error', 'Correo electrónico no válido.');
      return;
    }

    if (contrasena.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: correo,
        password: contrasena,
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      if (data?.user != null) {
        await guardar(data.user.id);
        Alert.alert('Éxito', 'Usuario registrado correctamente');
        navigation.navigate('Login');
      }
    } catch (err) {
      Alert.alert('Error', 'Error al registrar usuario.');
    }
  }

  async function guardar(uid: string) {
    const { error } = await supabase.from('administracion').insert({
      id: uid,
      nombre,
      celular,
      correo,
    });

    if (error) {
      console.error('Error al guardar datos adicionales:', error.message);
      Alert.alert('Error al guardar', error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <MaterialIcons name="account-circle" size={80} color="#043346" style={styles.icon} />
        <Text style={styles.title}>Registro de usuario</Text>

        <TextInput
          placeholder="Ingrese Correo"
          style={styles.input}
          onChangeText={setCorreo}
          value={correo}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          placeholder="Ingrese Contraseña"
          style={styles.input}
          onChangeText={setContrasena}
          value={contrasena}
          secureTextEntry
        />
        <TextInput
          placeholder="Ingrese Usuario"
          style={styles.input}
          onChangeText={setNombre}
          value={nombre}
        />
        <TextInput
          placeholder="Número de Celular"
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={setCelular}
          value={celular}
        />

        <TouchableOpacity onPress={registro} style={styles.button}>
          <Text style={styles.textButton}>REGISTRAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#043346',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 12,
    marginVertical: 8,
    fontSize: 18,
    borderRadius: 8,
    width: '100%',
  },
  button: {
    backgroundColor: '#043346',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
