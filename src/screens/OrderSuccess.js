import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const OrderSuccess = () => {

  const navigation = useNavigation();

  const handleNavigateToMain = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold', marginBottom: 20}}>OrderSuccess</Text>
      <Button title='Go back to Home Screen' onPress={handleNavigateToMain} color={'green'}/>
    </View>
  )
}

export default OrderSuccess

const styles = StyleSheet.create({})