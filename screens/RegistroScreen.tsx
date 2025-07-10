import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { supabase } from '../supabase/Config'

export default function RegistroScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [nombre, setnombre] = useState("")
  const [edad, setedad] = useState(0)

  async function registro() {

    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: contrasena,
    })
    //console.log(data);
    //console.log(error);

    if (data.user != null) {
      //console.log(data.user.id);
      guardar(data.user.id)
      
      navigation.navigate("Login")
    } else {
      Alert.alert("Eroor", error?.message)
    }


  }
  async function guardar(uid:String) {
    const { error } = await supabase
      .from('jugadores')
      .insert(
        { id: uid,
          nombre: nombre,
          edad:edad,
          correo:correo

        }
      )

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RegistroScreen</Text>
      <MaterialIcons name="account-circle" s
        ize={44} color="black" />
      <TextInput placeholder='Email'
        style={styles.input} onChangeText={setCorreo} />
      <TextInput placeholder='Password'
        style={styles.input} onChangeText={setContrasena} />
      <TextInput placeholder='Nombre' style={styles.input} onChangeText={setnombre} />
      <TextInput placeholder='Edad' style={styles.input} onChangeText={(texto) => setedad(+texto)} />
      <TouchableOpacity onPress={() => registro()}
        style={styles.button}>
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