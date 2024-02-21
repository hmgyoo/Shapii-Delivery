import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

const InfoItemScreen = () => {
  
  const route = useRoute();
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcons name='arrow-back-circle' color='green' size={40}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <IonIcons name='heart-outline' color='green' size={40}/>
          </TouchableOpacity>
      </View>
      <Image
        source={{uri: route.params.image}}
        style={styles.image}
      />
      <ScrollView style={styles.details}>
        <View >
          <View style={styles.titleRow}>
            <Text style={styles.title}>{route.params.title}</Text>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>{`$ ${route.params.price}`}</Text>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              {/* <Text style={styles.rating}>{`★ ${product.rating.rate}`}</Text> */}
              <IonIcons 
                name='star'
                size={24}
                color={'#fff'}
              />
              <Text style={styles.ratingText}>{`  (${route.params.rating})`}</Text>
            </View>
            <View style={styles.rating}>
              {/* <Text style={styles.rating}>{`★ ${product.rating.rate}`}</Text> */}
              <MaterialIcons 
                name='numbers'
                size={24}
                color={'#fff'}
              />
              <Text style={styles.ratingText}>{`  (${route.params.count})`}</Text>
            </View>
          </View>

          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.descText}>{route.params.description}</Text>
          </View>

          <View style={styles.cartRow}>
            <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
              <Text style={styles.cartTitle}>BUY NOW! </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}} style={styles.addCart}>
              <MaterialIcons name='shopping-bag' size={22} color={'#fff'}/>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default InfoItemScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    width: '91%',
    zIndex: 999,
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
    // objectFit: 'contain'
  },
  details: {
    marginTop: -10,
    backgroundColor: 'green',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    top: 20,
  },
  ratingRow: {
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    top: 20,
  },
  rating: {
    top: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: '7%'

  },
  ratingText: {
    color: '#D9D9D9',
    fontWeight: '600'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    width: '60%',
    color: '#fff'
  },
  priceWrapper: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    marginRight: '8%'

  },
  price: {
    paddingHorizontal: 15,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  descriptionWrapper: {
    marginTop: 40,
    marginHorizontal: 20
  },
  description: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  descText: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 8,
    color: '#fff',
    marginTop: 10,
  },
  cartRow: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  cartBtn: {
    width: '70%',
    backgroundColor: '#353535',
    padding: 4,
    borderRadius: 15,
    // marginLeft: 20,
    
  },
  cartTitle: {
    paddingLeft: 15,
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: 8,
    backgroundColor: '#353535',
    alignItems: 'center',
    justifyContent: 'center'
  }

})