
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();

import HomeScreen from '../screens/Home';
import GetProducts from '../screens/GetProducts';
import PostProducts from '../screens/PostProducts';
import DetailProduct from '../screens/DetailProduct';

const MyStack = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Home" component={GetProducts} />
        <Stack.Screen name="Agregar Productos" component={PostProducts} />
        <Stack.Screen name="Detalle" component={DetailProduct} />
      </Stack.Navigator>
    );
};

export default MyStack;
