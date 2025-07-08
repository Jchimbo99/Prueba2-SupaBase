import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function RegistroScreen({navigation}: any) {
  return (
    <View>
      <Text>RegistroScreen</Text>
      <TextInput placeholder='Email'  style={styles.input}/>
      <TextInput placeholder='Password' style={styles.input}/>
     <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
      <Text>Registro</Text>
     </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
})