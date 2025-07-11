import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../supabase/Config';

export default function OperacionesScreen() {
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [monto, setMonto] = useState('');
    const [idOperacion, setIdOperacion] = useState<string | null>(null);


    useEffect(() => {
        const newId = Math.floor(Math.random() * 1000000).toString();
        setIdOperacion(newId);
    }, []);

    async function guardarOperacion() {
        const cantidadNum = parseInt(cantidad);
        const montoNum = parseFloat(monto);


        if (isNaN(cantidadNum) || isNaN(montoNum) || descripcion.trim() === '') {
            Alert.alert('Error', 'Completa todos los campos correctamente.');
            return;
        }


        if (montoNum < 0) {
            Alert.alert('Monto inválido', 'El monto no puede ser negativo.');
            return;
        }


        if (montoNum < 1 || montoNum > 20) {
            Alert.alert(
                'Monto fuera de rango',
                'El monto es menor a $1 o mayor a $20. ¿Deseas continuar?',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Sí, continuar', onPress: () => insertarOperacion(cantidadNum, montoNum) },
                ]
            );
        } else {

            insertarOperacion(cantidadNum, montoNum);
        }
    }


    async function insertarOperacion(cantidadNum: number, montoNum: number) {
        const { error } = await supabase.from('operaciones').insert({
            id_operacion: idOperacion,
            descripcion,
            cantidad: cantidadNum,
            precio: montoNum,
        });

        if (error) {
            Alert.alert('Error', 'No se pudo guardar la operación.');
            console.error(error);
        } else {
            Alert.alert('Éxito', 'Operación guardada correctamente.');
            
            setDescripcion('');
            setCantidad('');
            setMonto('');
            const newId = Math.floor(Math.random() * 1000000).toString();
            setIdOperacion(newId);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>OPERACIONES</Text>

            <MaterialCommunityIcons name="hand-coin" size={120} color="#043346" style={styles.icon} />

            <Text style={styles.label}>ID Operación</Text>
            <Text style={styles.idOperacion}>{idOperacion}</Text>

            <TextInput
                placeholder="Descripción"
                style={styles.input}
                value={descripcion}
                onChangeText={setDescripcion}
            />

            <TextInput
                placeholder="Cantidad"
                style={styles.input}
                keyboardType="number-pad"
                value={cantidad}
                onChangeText={setCantidad}
            />

            <TextInput
                placeholder="Precio ($)"
                style={styles.input}
                keyboardType="decimal-pad"
                value={monto}
                onChangeText={setMonto}
            />

            <TouchableOpacity style={styles.button} onPress={guardarOperacion}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f6f7',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#043346',
        marginVertical: 20,
    },
    icon: {
        marginBottom: 30,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'flex-start',
        color: '#043346',
    },
    idOperacion: {
        fontSize: 18,
        marginBottom: 15,
        alignSelf: 'flex-start',
        color: '#666',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#043346',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#043346',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
