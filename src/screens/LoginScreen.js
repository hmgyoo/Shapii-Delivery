import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable, 
  Alert,
} from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios'
import { UserContext } from '../Globals/UserContext'

const LoginScreen = ({ navigation }) => {

  const { 
    userId, 
    setUserId,
    userUsername,
    setUserUsername, 
  } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // login function
  const handleLogin = async () => {
    try {
      // fetch all users
      const userResponse = await axios.get('https://fakestoreapi.com/users');
      const users = userResponse.data;

      // find the user with specified username
      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        // update userId with context
        setUserId(user.id);
        setUserUsername(user.username);
        console.log(userId);

        await AsyncStorage.setItem('user', JSON.stringify(user));

        // fetch user details using user id
        const userDetailsResponse = await axios.get(`https://fakestoreapi.com/users/${user.id}`);
        const userDetails = userDetailsResponse.data;

        console.log(userDetails);
        navigation.replace('Main');
        
      } else {
        Alert.alert("Login Error", "Invalid username or password");
        console.log('Invalid email or password');
      } 
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 50
      }}
    >
      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center '}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 12,
              color: 'black',
              alignSelf: 'center'
            }}
          >
          Log in to your account
          </Text>
        </View>

        {/* Username of the user */}
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#d9d9d9',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Entypo name='email' color='gray' size={24} style={{ marginLeft: 8}} />
            <TextInput 
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={{
                color: 'gray',
                marginVertical: '10',
                width: 300,
                fontSize: username ? 16 : 16,
              }}
              placeholder='Enter your username'
            />
          </View>
        </View>

        {/* Password */}
        <View style={{ marginTop: 10}}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            backgroundColor: '#d9d9d9',
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
          }}>
            <Entypo name='lock' color='gray' size={24} style={{ marginLeft: 8}} />
            <TextInput 
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: 'gray',
                marginVertical: '10',
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder='Enter your password'
            />
          </View>
      </View>

      {/* Keep me logged in */}
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Keep me logged in</Text>

        <Text style={{ color: "#007FFF", fontWeight: "500" }}>
          Forgot Password
        </Text>
      </View>

      <View style={{ marginTop: 80}}></View>
        
      {/* Login */}
      <Pressable
        onPress={handleLogin}
        style={{
          width: 200,
          marginTop: 80,
          backgroundColor: "green",
          borderRadius: 6,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 15,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Login
        </Text>
      </Pressable>

      <Pressable
        // onPress={() => navigation.navigate("Register")}
        style={{ marginTop: 15 }}
      >
        <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
          Don't have an account? <Text style={{ color: '#007FFF', fontWeight: 'bold' }}>Sign Up</Text>
        </Text>
      </Pressable>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen