import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { supabase } from '../supabase/Config';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HistorialScreen() {
  const [operaciones, setOperaciones] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState<any>(null);
  const [icono, setIcono] = useState<string>('shopping-cart');

  useEffect(() => {
    traerOperaciones();
  }, []);

  async function traerOperaciones() {
    const { data, error } = await supabase.from('operaciones').select('*');

    if (error) {
      Alert.alert('Error', 'No se pudieron cargar las operaciones.');
      console.error(error);
    } else {
      setOperaciones(data || []);
    }
  }

  function abrirModal(item: any) {
    console.log('Item seleccionado:', item); 
    setItemSeleccionado(item);

    let iconoSeleccionado = 'shopping-cart';

    if (item.descripcion?.toLowerCase().includes('compra')) {
      iconoSeleccionado = 'shopping-cart';
    } else if (item.descripcion?.toLowerCase().includes('factura')) {
      iconoSeleccionado = 'file-text-o';
    } else {
      iconoSeleccionado = 'credit-card';
    }

    setIcono(iconoSeleccionado);
    setModalVisible(true);
  }

  function cerrarModal() {
    setModalVisible(false);
    setItemSeleccionado(null);
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.item} onPress={() => abrirModal(item)}>
      <Text style={styles.itemText}>{item.descripcion} - ${item.monto}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Operaciones</Text>

      <FlatList
        data={operaciones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString()}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Icon name={icono} size={80} color="#043346" style={{ marginBottom: 20 }} />

            {itemSeleccionado && (() => {
            
              const precioUnitario = itemSeleccionado.monto ?? itemSeleccionado.precio ?? 0;
              const cantidad = itemSeleccionado.cantidad ?? itemSeleccionado.qty ?? 0;


              const precioValido = precioUnitario !== 0 && precioUnitario !== null && precioUnitario !== undefined;
              const cantidadValida = cantidad !== 0 && cantidad !== null && cantidad !== undefined;

              return (
                <>
                  <Text style={styles.modalTitle}>Detalle de Operación</Text>
                  <Text style={styles.modalText}>
                    Item: {itemSeleccionado.descripcion || 'No disponible'}
                  </Text>

                  <Text style={styles.modalText}>
                    Cantidad: {cantidadValida ? cantidad : 'Cantidad no disponible'}
                  </Text>

                  <Text style={styles.modalText}>
                    Precio unitario: {precioValido ? `$${precioUnitario.toFixed(2)}` : 'Precio no disponible'}
                  </Text>

                  <Text style={styles.modalText}>
                    Precio total:{' '}
                    {precioValido && cantidadValida
                      ? `$${(precioUnitario * cantidad).toFixed(2)}`
                      : 'Total no disponible'}
                  </Text>

                  <TouchableOpacity onPress={cerrarModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </>
              );
            })()}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6f7',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#043346',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#043346',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#043346',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#043346',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#043346',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
