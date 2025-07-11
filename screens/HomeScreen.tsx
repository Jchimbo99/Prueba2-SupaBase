import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Ícono y título */}
      <Ionicons name="home-outline" size={120} color="white" style={styles.icon} />
      <Text style={styles.title}>Bienvenido</Text>

      {/* Botón Login */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Botón Registro */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.buttonText}>Registro</Text>
      </TouchableOpacity>

      {/* Autor */}
      <Text style={styles.footer}>Desarrollado por Jorge Chimbo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#043346',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#00aaff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    fontSize: 16,
    color: '#ccc',
  },
});
