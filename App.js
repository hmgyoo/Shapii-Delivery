import * as React from 'react'
import { useContext } from 'react'
import { View, Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CartScreen from './src/screens/CartScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './src/screens/LoginScreen';
import { UserProvider, UserContext } from './src/Globals/UserContext';
import InfoItemScreen from './src/screens/InfoItemScreen';
import { CartProvider } from './src/Globals/CartContext';
import OrderSuccess from './src/screens/OrderSuccess';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Tabs() {
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline'
          } else if (route.name === 'My Cart') {
            iconName = focused
              ? 'cart'
              : 'cart-outline'
          } else if (route.name === 'My Profile') {
            iconName = focused
              ? 'person-circle'
              : 'person-circle-outline'
          }

          return <Ionicons name={iconName} size={size} color={color}/>
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'green',
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} options={{ headerShown: false}}/>
      <Tab.Screen name='My Cart' component={CartScreen} options={{ headerShown: false}}/>
      <Tab.Screen name='My Profile' component={ProfileScreen} options={{ headerShown: false}}/>
    </Tab.Navigator>
  )
}

export default function App() {

  const [userId, setUserId] = React.useState(null);


  return (
    <UserProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Main' component={Tabs} options={{ headerShown: false}}/>
            <Stack.Screen name='Item Details' component={InfoItemScreen} options={{ headerShown: false}}/>
            <Stack.Screen name='Success' component={OrderSuccess} options={{ headerShown: false}}/>
          </Stack.Navigator> 
        </NavigationContainer>
      </CartProvider>
    </UserProvider>  
  )
}
