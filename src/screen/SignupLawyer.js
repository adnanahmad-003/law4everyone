import { SafeAreaView, StyleSheet, Text, View,TextInput,TouchableOpacity,ImageBackground, Pressable,Keyboard, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import Button from '../components/Botton';
import COLORS from '../constants/Color';
import Loader from '../components/Loader';


const SignupLawyer = () => {
  const [responseData, setResponseData] = useState(null);
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (isValid) {
     register();
    }
  };

  const register = async () => {
    setLoading(true);
    setTimeout(async () => { 
      try {
        setLoading(false);
        const apiUrl = 'https://your-api-endpoint.com/api';
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(inputs),
        });
        const jsonData = await response.json();
        setResponseData(jsonData);
        console.log(jsonData);
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 2000);
  };
  

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  
  
  return (
    <SafeAreaView style={{flex:1}} >
      <ScrollView style={{flex:1}}>
        <Loader visible={loading}/>
    <ImageBackground
        source={require('../../assets/Images/Login.jpg')}
        style={{height:900}}
      >
     
     <View style={{marginTop:80,marginHorizontal:20}}>
      <Text style={{fontSize:31,textAlign:"center",fontWeight:"600",color:"white"}}>Advocate Register</Text>
      
      <View style={{marginTop:50}}> 
      <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          />
          
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
    
    
      </View>
      <Button title="Register" onPress={validate} />
          
     </View>
     <View style={{flexDirection:"row",justifyContent:"center",marginTop:12}}><Text style={{fontSize:15,color:"white"}}>Already have a account </Text><Pressable onPress={()=>navigation.goBack()}><Text style={{color:"#7727C8"}}>Login</Text></Pressable></View>
     </ImageBackground>
     </ScrollView>
    </SafeAreaView>
  
  )
}

export default SignupLawyer

const styles = StyleSheet.create({})