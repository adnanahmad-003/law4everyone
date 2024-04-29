import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import io from 'socket.io-client';
import {BASE_URL} from './../../../../constants/Url';
import Loader from "../../../../components/Loader";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
//import Loader from "../../../../components/Loader";
const Notification = () => {
    
    const[advocate,setAdvocates]=useState([]);
    const[isLoading,setIsLoading]=useState(false);
   
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
          setIsLoading(true);
          const token = await SecureStore.getItemAsync("authToken");
          const response = await fetch(`${BASE_URL}/advocate/getNotifications`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          });
          const data = await response.json();
          console.log(data);
          setAdvocates(data.notifications);
          setIsLoading(false);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
     
        
      
      
  return (
    <ScrollView>
    <Text style={{fontWeight:'600',fontSize:23,margin:10,marginTop:20}}>Notifications </Text>
    {advocate &&
      advocate.map((problem) => (
        <View key={problem._id} style={styles.advocateCard}> 
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{problem.title}</Text>
            <Text style={styles.description}>{problem.description}</Text>
            <Text style={styles.userName}>User Name: {problem.userInfo?.userName}</Text>
            <Text style={styles.name}>Name: {problem.userInfo?.name}</Text>
            <Text style={styles.email}>Email: {problem.userInfo?.email}</Text>
          </View>
        </View>
      ))}
       {advocate.length == 0 && (
        <Text style={{ margin: 10, fontSize: 14, fontWeight: "500" }}>
          No notification
        </Text>
      )}
      <Loader visible={isLoading} />
  </ScrollView>
  )
}

export default Notification

const styles = StyleSheet.create({
  advocateCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  });