import React, { createContext, useReducer, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../Globals/UserContext'

const CartContext = createContext();

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    // Add other cases for quantity updates, removal, etc.

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { userId } = useContext(UserContext);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Retrieve cart info for the specific user
        const cartFromStorage = await AsyncStorage.getItem(`cart_${userId}`);
        const parsedCart = JSON.parse(cartFromStorage);

        if (parsedCart) {
          dispatch({ type: 'SET_CART', payload: parsedCart });
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [userId]);

  useEffect(() => {
    // Save the cart in AsyncStorage whenever it changes
    AsyncStorage.setItem(`cart_${userId}`, JSON.stringify(state.cart));
  }, [state.cart, userId]);

  return (
    <CartContext.Provider value={{ cartState: state, cartDispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};