import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import io from 'socket.io-client';


import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

const NotificationUser = () => {
    const [notification, setNotification] = useState([]);
    const [accept,setAccept]=useState(false);
   
  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('caseAcceptRequest', (data) => {
      setNotification(data);
      return () => {
        socket.disconnect();
      };
    });
    
  }, []);

  useFocusEffect(
    React.useCallback(() => {
    }, [])
  );
  

    const fetchData = async () => {
        try {
          
          const token = await SecureStore.getItemAsync("authToken");
          const response = await fetch("http://localhost:3000/user/getUserNotifications", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          });
          const data = await response.json();
          console.log(data);
          setAdvocates(data);
          
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const handleCaseAccept = async()=>{
        try {
            
            const token = await SecureStore.getItemAsync("authToken");
            const response = await fetch(`http://localhost:3000/advocate/getProblems`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.json();
            console.log(data.message);
            setAdvocates(data);
            
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        const handleCaseDecline = async()=>{
            try {
                
                const token = await SecureStore.getItemAsync("authToken");
                const response = await fetch(`http://localhost:3000/advocate/getProblems`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                });
                const data = await response.json();
                console.log(data.message);
                setAdvocates(data);
               
                
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };
      
      
  return (
    <View>
        <Text>All the Advocates</Text>
        <Text>{notification.title}</Text>
        <Text>{notification.description}</Text>
        <Text>{notification.advocateInfo?.userName}</Text>
        <Text>{notification.advocateInfo?.name}</Text>
        <Text>{notification.advocateInfo?.email}</Text>
    </View>
  )
}

export default NotificationUser

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