import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
//import { useSelector } from 'react-redux';
import COLORS from './../../../../constants/Color';
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native"; 
import { useNavigation ,useRoute} from '@react-navigation/native';
import {BASE_URL} from './../../../../constants/Url';
//import { useSelector } from 'react-redux';
const ViewUsersProfile = () => {
  //const advocateId = useSelector((state) => state.advocateId); 
  const route = useRoute();
  const { userId } = route.params; 
 
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
      //console.log(userId,'UserId');
      const response = await fetch(`${BASE_URL}/advocate/viewUserProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       
        body: JSON.stringify({ userId:userId }), 
      });
      const data = await response.json();
      //console.log(data);
     setAccountDetails(data.userInfo);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const image = `data:image/png;base64,${accountDetails.profileImage}`;

  

 
  return (
      <View style={styles.container}>
     <Text style={styles.title}>User account details</Text>
      <View style={styles.profileInfo}>
      <Image source={{uri : image}} style={styles.profileImage} />
        <Text style={styles.username}>{accountDetails.userName}</Text>
        <Text style={styles.name}>{accountDetails.name}</Text>
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
};

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
    color: COLORS.brown1,
  },
  name: {
    fontSize: 16,
    color: COLORS.brown1,
    marginBottom: 5,
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
    color: COLORS.brown2
  },
  detailsText: {
    color: COLORS.brown4,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.brown4,
  },
  buttonActive: {
    backgroundColor: COLORS.brown2,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  title:{
    fontSize:20,
    fontWeight:'600',
    color:COLORS.brown1,
    margin:10
  }
});

export default ViewUsersProfile;

