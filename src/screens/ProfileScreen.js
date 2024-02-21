import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Globals/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

  const navigation = useNavigation(); 
  
  const { 
    userId, 
    setUserId,
    userUsername,
    setUserUsername, 
  } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(null);

  const handleLogout = async () => {
    try {

      // // Clear userId and userUsername from context
      // setUserId(null);
      // setUserUsername(null);

      // Navigate to the login screen and replace the current screen
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Retrieve user info
        const userFromStorage = await AsyncStorage.getItem('user');
        const parsedUser = JSON.parse(userFromStorage);

        if (parsedUser && parsedUser.id === userId) {
          // set user details
          setUserDetails(parsedUser);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>
      {userDetails ? (
        <View style={styles.userDetailsContainer}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.value}>{userDetails.id}</Text>

          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{userDetails.username}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userDetails.email}</Text>

          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>
            {userDetails.name.firstname} {userDetails.name.lastname}
          </Text>

          {/* Add more fields as needed */}
        </View>
      ) : (
        <Text>Loading user details...</Text>
      )}

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userDetailsContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});