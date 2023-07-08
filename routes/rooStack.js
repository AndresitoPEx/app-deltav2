

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import HomeScreen from '../src/screens/Home';
import GetProducts from '../src/screens/GetProducts';
import DetailProduct from '../src/screens/DetailProduct';

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={GetProducts} />
      <Stack.Screen name="Detalle" component={DetailProduct} />
    </Stack.Navigator>
  );
};

export default MyStack;
