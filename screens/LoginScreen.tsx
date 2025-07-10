import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { supabase } from '../supabase/Config'

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena,
    })
    //console.log(data);  
    //console.log(error);
    
    if( data.user!=null){
      navigation.navigate("Perfil")
      
    }else{
      Alert.alert("Eror", error?.message)
    }
    
  }


  return (
    <View style={styles.container}>

      <Text style={styles.title}>LoginScreen</Text>
      <MaterialIcons name='login' size={30} color='black' />
      <TextInput placeholder='Email' style={styles.input} onChangeText={setCorreo} />
      <TextInput placeholder='Password' style={styles.input} onChangeText={setContrasena} />

      <TouchableOpacity onPress={() => login()}
        style={styles.button}>
        <Text style={styles.textButton}>Login</Text>
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