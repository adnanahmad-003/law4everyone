import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from "react-native";
import io from 'socket.io-client';
import {BASE_URL} from './../../../../constants/Url'
import COLORS from "../../../../constants/Color";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "../../../../components/Loader";
const NotificationUser = () => {
    const [notification, setNotification] = useState([]);
    const[advocate,setAdvocates]=useState([]);
    const [accept,setAccept]=useState(false);
    const[isLoading,setIsLoading]=useState(false);
  useEffect(() => {
    fetchData();
    
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  
 //console.log(notification);
    const fetchData = async () => {
        try {
          setIsLoading(true);
          const token = await SecureStore.getItemAsync("authToken");
          const response = await fetch(`${BASE_URL}/user/getUserNotifications`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          });
          const data = await response.json();
          //console.log(data);
          setAdvocates(data.notifications);
          setIsLoading(false);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const handleCaseAccept = async(advocateId,status)=>{
        try {
            console.log(advocateId);
            const token = await SecureStore.getItemAsync("authToken");
            const response = await fetch(`${BASE_URL}/user/advocateRequestResponse`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                advocateId: advocateId,
                requestResponse: status
              })
            });
            const data = await response.json();
            console.log(data.message);
            
            setAdvocates(prevAdvocates => prevAdvocates.filter(advocate => advocate.advocateInfo?.advocateId !== advocateId));
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        
      
      
  return (
    <ScrollView>
      {advocate.length == 0 && (
        <Text style={{ margin: 10, fontSize: 24, fontWeight: "500" }}>
          No notification
        </Text>
      )}
      {advocate &&
        advocate.map((problem) => (
          <View key={problem._id} style={styles.advocateCard}>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{problem.title}</Text>
              <Text style={styles.description}>{problem.description}</Text>
              <Text style={styles.userName}>
                User Name: {problem.advocateInfo?.userName}
              </Text>
              <Text style={styles.name}>
                Name: {problem.advocateInfo?.name}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: COLORS.brown4, marginRight: 7 },
                ]}
                onPress={() =>
                  handleCaseAccept(problem.advocateInfo?.advocateId, true)
                }
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: COLORS.brown1 }]}
                onPress={() =>
                  handleCaseAccept(problem.advocateInfo?.advocateId, false)
                }
              >
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      <Loader visible={isLoading} />
    </ScrollView>
  );
}

export default NotificationUser

const styles = StyleSheet.create({
  advocateCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    backgroundColor:'#fff',
    borderRadius:5
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
    backgroundColor:'#fff',
    
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  });