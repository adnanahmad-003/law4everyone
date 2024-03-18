import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation ,useRoute} from '@react-navigation/native';
const EmailVerification = () => {
    const navigation = useNavigation();
    const route = useRoute();
   const {email} = route.params;
   const {nextNavigate} = route.params;
   //console.log(email);
    const checkVerification= async () => { 
        try {
          //setLoading(false);
          const apiUrl = 'http://localhost:3000/user/isUserVerified';
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            
            body:JSON.stringify({email:email}),
          });
          
          const jsonData = await response.json();
          
           console.log(jsonData)
         if(jsonData.isEmailVerified && nextNavigate ==='login'){
            navigation.navigate('Login')
         }
         if(jsonData.isEmailVerified && nextNavigate ==='tabs'){
          navigation.navigate('Login')
       }
         
          
        }
         catch (error) {
          console.log('Error', 'Something went wrong',{error});
        }
      };

  return (
    <View>
      <Text>Please do Email Verification</Text>
      <TouchableOpacity onPress={checkVerification}>
        <Text>Have you verified your Email👍</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EmailVerification

const styles = StyleSheet.create({})