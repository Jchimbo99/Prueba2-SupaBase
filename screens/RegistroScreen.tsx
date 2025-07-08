import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

export default function RegistroScreen({navigation}: any) {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')

    return (
    <View style={styles.container}>
      <Text style={styles.title}>RegistroScreen</Text>
      <MaterialIcons name="account-circle" size={44} color="black" />
      <TextInput placeholder='Email'  style={styles.input} onChangeText={setCorreo}/>
      <TextInput placeholder='Password' style={styles.input} onChangeText={setContrasena}/>


     <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
      <Text style={styles.textButton} >Registro</Text>
     </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    fontSize: 20,
    borderRadius: 5, 
    width: '80%',
  },
  button: {
    backgroundColor: '#043346',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})