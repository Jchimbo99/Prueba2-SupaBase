import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

export default function PerfilScreen() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [edad, setEdad] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PerfilScreen</Text>
      <MaterialIcons name='person' size={300} color='black' />
      
      <Text style={styles.text}>Nombre: {nombre}</Text>
      <Text style={styles.text}>Email: {email}</Text>
      <Text style={styles.text}>Edad: {edad}</Text>

      <TouchableOpacity onPress={() => null} style={styles.button}>
        <Text style={styles.textButton}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#748ccb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})