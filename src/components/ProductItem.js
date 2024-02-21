import { StyleSheet, Text, View, Pressable, Image, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from '../Globals/UserContext'
import { useCart } from "../Globals/CartContext";


const ProductItem = ({ item }) => {

  const [addedToCart, setAddedToCart] = useState(false);
  const { 
    userId, 
    setUserId,
    userUsername,
    setUserUsername, 
  } = useContext(UserContext);
  const navigation = useNavigation();
  const { cartState, cartDispatch } = useCart();

  useEffect(() => {
    // Check if the item is already in the cart
    const isInCart = cartState.cart.some((cartItem) => cartItem.id === item.id);
    setAddedToCart(isInCart);
  }, [cartState.cart, item.id]);

  const addToCart = () => {
    if (addedToCart) {
      // Remove the item from the cart if it's already added
      cartDispatch({
        type: 'REMOVE_FROM_CART',
        payload: { id: item.id },
      });
    } else {
      // Add the item to the cart if it's not added
      cartDispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: 1,
        },
      });
    }
  };

  return (
    <Pressable 
      onPress={() => navigation.navigate('Item Details', {
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.category,
        description: item.description,
        image: item.image,
        rating: item.rating.rate,
        count: item.rating.count,
      })}
      style={{ 
        marginHorizontal: 20, 
        marginVertical: 25 
      }}
    >
      <Image
        style={{ width: 125, height: 125, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />

      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>${item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>

      <Pressable
        onPress={addToCart}
        style={{
          backgroundColor: addedToCart ? 'gray' : 'green',
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text style={{ color: 'white'}}>Added to Cart</Text>
          </View>
        ) : (
          <Text style={{ color: 'white'}}>Add to Cart</Text>
        )}
        {/* <Text style={{ color: 'white'}}>Add to Cart</Text> */}
      </Pressable>
    </Pressable>
  )
}

export default ProductItem