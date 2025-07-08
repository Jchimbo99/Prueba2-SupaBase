import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeScreen</Text>

      <Button title='Login' onPress={() => navigation.navigate('Login')} />
        
      <Button title='Registro' onPress={() => navigation.navigate('Registro')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#043346',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
})