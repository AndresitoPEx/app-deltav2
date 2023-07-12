import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';

const productsData = [
  {
    id: 1,
    title: 'Product 1',
    price: '19.99',
    image: 'https://i.postimg.cc/bNczqTh8/28616300-414339525684880-3109795440802123074-o.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    price: '29.99',
    image: 'https://i.postimg.cc/DwKf2c1L/DELTA_21_MULTICAN.jpg',
  },
  {
    id: 3,
    title: 'Product 3',
    price: '39.99',
    image: 'https://i.postimg.cc/bvwZhTjL/DSC_1032.frente3.jpg',
  },
  {
    id: 3,
    title: 'Product 3',
    price: '39.99',
    image: 'https://i.postimg.cc/bvwZhTjL/DSC_1032.frente3.jpg',
  },
  {
    id: 3,
    title: 'Product 3',
    price: '39.99',
    image: 'https://i.postimg.cc/bvwZhTjL/DSC_1032.frente3.jpg',
  },
];

const HomeScreen = (props) => {
  const { navigation } = props;

  const goToPage = (page) => {
    navigation.navigate(page);
  }

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>S/. {item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PRODUCTOS NUEVOS</Text>
      <FlatList
        data={productsData}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
      <Button title="Ir a Productos" onPress={() => goToPage("Tienda")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productList: {
    paddingVertical: 10,
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 3,
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
});

export default HomeScreen;
