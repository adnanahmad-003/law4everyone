import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const [accountDetails, setAccountDetails] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      const response = await fetch("http://localhost:3000/user/getUserProfile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      console.log(data.message);
      setAccountDetails(data.user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const image = `data:image/png;base64,${accountDetails.profileImage}`;
  return (
    <View style={styles.container}>

      <View style={styles.profileInfo}>
      <Image source={{uri : image}} style={styles.profileImage} />
        <Text style={styles.username}>{accountDetails.userName}</Text>
        <Text style={styles.name}>{accountDetails.name}</Text>
        <View style={styles.header}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsItem}>
          <Text style={styles.detailsTitle}>Email</Text>
          <Text style={styles.detailsText}>{accountDetails.email}</Text>
        </View>
        <View style={styles.detailsItem}>
          <Text style={styles.detailsTitle}>Phone</Text>
          <Text style={styles.detailsText}>{accountDetails.phone}</Text>
        </View>
        <View style={styles.detailsItem}>
          <Text style={styles.detailsTitle}>Location</Text>
          <Text style={styles.detailsText}>
            {accountDetails.address?.city}, {accountDetails.address?.state}, {accountDetails.address?.zipCode}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  editButton: {
    backgroundColor: '#9c6644',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailsItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  detailsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsText: {
    color: '#777',
  },
});

export default HomeScreen;
