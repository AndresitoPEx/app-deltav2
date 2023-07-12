import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ProductDetails = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los detalles del producto
    axios
      .get(`https://tungsten-rustic-pewter.glitch.me/producto/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del producto:', error);
      });

    // Realizar la solicitud HTTP para obtener la imagen del producto
    axios
      .get(`https://tungsten-rustic-pewter.glitch.me/imagenes/${product?.imagen}`)
      .then((response) => {
        setImage(response.data.nombre);
      })
      .catch((error) => {
        console.error('Error al obtener la imagen del producto:', error);
      });
  }, [productId, product?.imagen]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando detalles del producto...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.productCard}>
        <Image source={{ uri: image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.nombre}</Text>
          <Text style={styles.productPrice}>S/. {product.precio}</Text>
          <Text style={styles.productDescription}>{product.descripcion}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>AGREGAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadingText: {
    fontSize: 18,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  productInfo: {
    flex: 1,
    marginLeft: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 10,
    color: '#888',
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#F28322',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default ProductDetails;
