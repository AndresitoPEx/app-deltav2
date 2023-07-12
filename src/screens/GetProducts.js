import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const GetProducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({});
  const [categories, setCategories] = useState({});

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los datos de la API
    axios.get('https://tungsten-rustic-pewter.glitch.me/producto')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });

    axios.get('https://tungsten-rustic-pewter.glitch.me/imagenes')
      .then(response => {
        const imagesData = {};
        response.data.forEach(image => {
          imagesData[image.id] = image.nombre;
        });
        setImages(imagesData);
      })
      .catch(error => {
        console.error('Error al obtener las imágenes:', error);
      });

    axios.get('https://tungsten-rustic-pewter.glitch.me/categorias')
      .then(response => {
        const categoriesData = {};
        response.data.forEach(category => {
          categoriesData[category.id] = category.nombre;
        });
        setCategories(categoriesData);
      })
      .catch(error => {
        console.error('Error al obtener las categorías:', error);
      });
  }, []);

  const goToProductDetails = (productId) => {
    // Navegar a la pantalla de detalles del producto
    navigation.navigate('ProductDetails', { productId });
    console.log('Ver detalles del producto:', productId);
  };

  const addToCart = (productId) => {
    // Lógica para agregar el producto al carrito
    console.log('Agregar al carrito:', productId);
  };

  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => goToProductDetails(item.id)}
      >
        <Image source={{ uri: images[item.imagen] }} style={styles.cardImage} />
        <View style={styles.cardInfoContainer}>
          <Text style={styles.cardName}>{item.nombre}</Text>
          <Text style={styles.cardPrice}>S/. {item.precio}</Text>
          <Text style={styles.cardCategory}>{categories[item.categoria]}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item.id)}
          >
            <Text style={styles.addButtonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderCard}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgray',
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cardInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  cardCategory: {
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#F28322',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GetProducts;
