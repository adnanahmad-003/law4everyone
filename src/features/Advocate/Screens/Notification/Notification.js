import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView ,ActivityIndicator} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native"; 

const Notification = () => {
  const [notification,setNotification]=useState([]);

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
      const response = await fetch(`http://localhost:3000/advocate/getProblems`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
     // console.log(data,'notification page');
      setNotification(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  return (
    <View>
      <Text>Notification</Text>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})