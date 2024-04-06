import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
//import { useSelector } from 'react-redux';
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native"; 
const AccountPage = ({ navigation }) => {
  const [accountDetails, setAccountDetails] = useState( {
  email: "",
  fullname: "",
  phone: "",
  password: "",
  registrationNumber: "",
  expertise: [],
  bio: "No bio",
  experience: "",});


  //Get request
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
      const response = await fetch("http://localhost:3000/user/getProblems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

     // console.log(data);
      setAccountDetails(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("EditAccountPage")}
      >
        <Text style={styles.addButtonText}>Edit Details</Text>
      </TouchableOpacity>
      <View>
        <Text>{accountDetails.email}</Text>
        <Text>{accountDetails.fullname}</Text>
        <Text>{accountDetails.bio}</Text>
        <Text>{accountDetails.expertise}</Text>
        <Text>{accountDetails.experience}</Text>
        <Text>{accountDetails.registrationNumber}</Text>
        <Text>{accountDetails.phone}</Text>
        <Text>{accountDetails.password}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  queryContainer: {
    margin: 5,
    backgroundColor: "#fefefe",
    padding: 20,
    borderRadius: 10,
  },
  queryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  queryDetails: {
    fontSize: 16,
    marginTop: 5,
  },
  queryLastDate: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
  },
  queryStatus: {
    fontSize: 14,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AccountPage;

