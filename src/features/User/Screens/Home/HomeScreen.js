import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Touchable, TouchableOpacity } from 'react-native';

import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native"; 
//redux to set location
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../../../../../Redux/action';


import * as Location from 'expo-location';
import COLORS from '../../../../constants/Color';
const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
 // const [responseData, setResponseData] = useState(null);
  const [postResponse, setPostResponse] = useState(null);


  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleLocationUpdate = () => {
    const newLocation = [location]; 
    dispatch(updateLocation(newLocation));
    console.log(userData);
  };

  /*const postData = async () => {
    try {
      const response = await fetch('YOUR_POST_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseData),
      });
      const data = await response.json();
      setPostResponse(data);
    } catch (error) {
      console.error('Error posting data: ', error);
    }
  };*/

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const newLocation = [location]; 
      dispatch(updateLocation(newLocation));
      console.log(userData);
    })();
  }, []);



  const [accountDetails, setAccountDetails] = useState( {
    email: "",
    fullname: "",
    phone: "",
   });
  
  
    //Get request
  /*  useEffect(() => {
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
    };*/
  

 /* useEffect(() => {
    if (location) {
      (async () => {
        try {
          const { latitude, longitude } = location.coords;
          const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const json = await response.json();
          setResponseData(json);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      })();
    }
  }, [location]);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }*/

  return (
    <View style={{flex:1,alignContent:'center'}}>
      <Text style={styles.title}>Account Details</Text>
      <TouchableOpacity  style={styles.enabletext} onPress={handleLocationUpdate}>
        <Text >Enable location</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Edit account details</Text>
        </TouchableOpacity>

        <View>
          <Text>{accountDetails.email}</Text>
          <Text>{accountDetails.fullname}</Text>
          <Text>{accountDetails.phone}</Text>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
 
  title:{
    color:COLORS.brown1,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf:'center',
    marginTop:80
  },
  enabletext:{
    alignSelf:'center',
  },
  addButton: {
    backgroundColor:COLORS.brown4,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
    height:45,
    textAlignVertical:'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "bold",
    
  },
});

export default HomeScreen;