import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity ,ScrollView} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import COLORS from "../../../../constants/Color";

const AccountPage = ({ navigation }) => {
  const [accountDetails, setAccountDetails] = useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
    registrationNumber: "",
    expertise: [],
    bio: "No bio",
    experience: "",
  });

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
      setAccountDetails(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{accountDetails.email}</Text>

        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.text}>{accountDetails.fullname}</Text>

        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.text}>{accountDetails.bio}</Text>

        <Text style={styles.label}>Expertise:</Text>
        <Text style={styles.text}>{accountDetails.expertise.join(", ")}</Text>

        <Text style={styles.label}>Experience:</Text>
        <Text style={styles.text}>{accountDetails.experience}</Text>

        <Text style={styles.label}>Registration Number:</Text>
        <Text style={styles.text}>{accountDetails.registrationNumber}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.text}>{accountDetails.phone}</Text>

        <Text style={styles.label}>Password:</Text>
        <Text style={styles.text}>{accountDetails.password}</Text>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditAccountPage")}
      >
        <Text style={styles.editButtonText}>Edit Details</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop:40,
    color:COLORS.brown1
  },
  editButton: {
    backgroundColor: COLORS.brown4,
    padding: 12,
    borderRadius: 8,
    alignSelf: "flex-end",
    
    alignSelf:'center'
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailsContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    borderRadius:10,
    height:50,
    color:'#fff',
    padding:10,
    backgroundColor:COLORS.brown2
    
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    
  },
});

export default AccountPage;
