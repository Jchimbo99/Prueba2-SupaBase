import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeScreen({navigation}: any) {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='Login' onPress={() => navigation.navigate('Login')} />
      <Button title='Registro' onPress={() => navigation.navigate('Registro')} />
    </View>
  )
}

const styles = StyleSheet.create({})