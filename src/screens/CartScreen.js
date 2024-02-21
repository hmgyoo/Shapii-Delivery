import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { useCart } from '../Globals/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cartState, cartDispatch } = useCart();
  const cart = cartState.cart;
  const navigation = useNavigation();

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // checkout 
  const handleCheckout = () => {
    // navigate to the success screen and clear cart
    navigation.navigate('Success');
    cartDispatch({ type: 'CLEAR_CART'})
  };

  const handleDelete = (itemId) => {
    // Remove item from cart
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: { id: itemId }});
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Cart Screen</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        cart.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>Price: ${item.price}</Text>
              <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
      <View style={styles.bottomContainer}>
        <Text style={styles.totalText}>Total Price: ${cart.length > 0 ? totalPrice.toFixed(2) : '0.00'}</Text>
        {cart.length > 0 && (
          <TouchableOpacity onPress={handleCheckout}>
            <Text style={styles.checkoutButton}>Checkout</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    flex: 1,
    textAlignVertical: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  quantity: {
    fontSize: 14,
    color: 'gray',
  },
  deleteButton: {
    color: 'red',
    marginTop: 5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default CartScreen;