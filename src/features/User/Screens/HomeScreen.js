import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Touchable, TouchableOpacity } from 'react-native';

//redux to set location
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../../../../Redux/action';


import * as Location from 'expo-location';
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
<View>
<TouchableOpacity onPress={handleLocationUpdate}>
          <Text>Enable location</Text>
        </TouchableOpacity>
</View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:"black"
  },
  paragraph:{
   color:"white"
  }
})