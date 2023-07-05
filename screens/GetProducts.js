import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const GetProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los datos de la API
    axios.get('http://localhost:3001/producto')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.nombre}</Text>
        <Text style={styles.itemPrice}>{item.precio}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
});

export default GetProducts;
