
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../src/screens/Home';
import GetProducts from '../src/screens/GetProducts';
import DetailProduct from '../src/screens/DetailProduct';
import Login from '../src/screens/Login';


const MyStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false, // Ocultar el encabezado de navegación
        }}
      />
      <Stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: false, // Ocultar el encabezado de navegación
        }} />
      <Stack.Screen name="Tienda" component={GetProducts} />
      <Stack.Screen name="ProductDetails" component={DetailProduct} />
    </Stack.Navigator>
  );
};

export default MyStack;
