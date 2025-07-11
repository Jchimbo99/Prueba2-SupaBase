import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../supabase/Config';
import { useNavigation } from '@react-navigation/native';

export default function PerfilScreen() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [celular, setCelular] = useState('');

  async function leerUsuario() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      Alert.alert('Error', 'No se pudo obtener usuario');
      return;
    }

    traerUsuario(user.id);
  }

  async function traerUsuario(uid: string) {
    const { data, error } = await supabase
      .from('administracion')
      .select()
      .eq('id', uid)
      .single();

    if (error || !data) {
      Alert.alert('Error', 'No se pudieron cargar los datos del usuario');
      return;
    }

    setNombre(data.nombre);
    setEdad(data.edad || '');
    setEmail(data.correo);
    setCelular(data.celular || '');
  }

  useEffect(() => {
    leerUsuario();
  }, []);

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    } else {
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' as never }],
      });
    }
  }

  return (
    <View style={styles.container}>
      <MaterialIcons name="person" size={150} color="#043346" />
      <Text style={styles.bienvenida}>Hola, {nombre} 👋</Text>
      <Text style={styles.autorizacion}>
        Autorización de uso de datos: <Text style={{ color: 'green' }}>ACTIVADO</Text>
      </Text>
      <Text style={styles.mensaje}>Mantén actualizados tus datos</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{nombre}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Número de celular:</Text>
        <Text style={styles.value}>{celular}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Correo electrónico:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <TouchableOpacity onPress={logout} style={styles.button}>
        <Text style={styles.textButton}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6f7',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  bienvenida: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#043346',
  },
  autorizacion: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '600',
  },
  mensaje: {
    fontSize: 14,
    marginBottom: 20,
    fontStyle: 'italic',
    color: '#555',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 12,
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#043346',
    width: 150,
  },
  value: {
    fontSize: 18,
    color: '#333',
    flexShrink: 1,
  },
  button: {
    marginTop: 30,
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  textButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
