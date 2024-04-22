import { SafeAreaView, StyleSheet, Text, View,TextInput,TouchableOpacity,ImageBackground, Pressable,Keyboard, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Input from '../../../../components/Input';
import Button from '../../../../components/Botton';
import COLORS from '../../../../constants/Color';
import Loader from '../../../../components/Loader';
import UploadProfile from "../../../../components/UploadProfile";
//redux user 
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../../../../../Redux/action';
const Signup = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  //profile image
  const [profileImageUri1, setProfileImageUri1] = useState('');
  const [inputs, setInputs] = React.useState({
    email: 'trendymodernvibes@gmail.com',
    name: 'Adnan',
    phone: 123,
    password: '123456',
  });
  const[responseData,setResponse]=useState({
    message:'',
    isSignedUp:false
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

   if (!inputs.name) {
      handleError('Please input fullname', 'name');
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
    // Function to handle setting profile image URI for the first image
    const handleSetProfileImageUri1 = (uri) => {
      setProfileImageUri1(uri);
    };

  const register = async () => {
    setLoading(true);
    setTimeout(async () => { 
      try {
        dispatch(
          setUserData({
            userName: inputs.name,
            location: [],
            email: inputs.email,
            phone: inputs.phone,
          })
        );
        setLoading(false);
    const formData = new FormData();
    formData.append('email', inputs.email);
    formData.append('name', inputs.name);
    formData.append('phone', inputs.phone);
    formData.append('password', inputs.password);
    formData.append('files', {
      uri: uri1,
      type: 'image/jpg', 
      name: 'image1.jpg' 
    });

    const apiUrl = 'http://localhost:3000/user/signup';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
      body: formData,
    });

    const jsonData = await response.json();
    setResponse(jsonData);
    console.log(jsonData);

    if (jsonData.isSignedUp) {
      navigation.navigate('EmailVerification', { email: inputs.email ,nextNavigate: 'login' })
    } else {
      Alert.alert(
        'Login Please',
        jsonData.message,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ],
        { cancelable: false }
      );
    }   
      }
       catch (error) {
        console.log('Error', 'Something went wrong',{error});
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
        source={require('../../../../../assets/Images/Login.jpg')}
        style={{height:900}}
      >
     
     <View style={{marginTop:80,marginHorizontal:20}}>
      <Text style={{fontSize:31,textAlign:"center",fontWeight:"600",color:"white"}}>SignUp</Text>
      
      <View style={{marginTop:50}}> 
      <UploadProfile setImageUri={handleSetProfileImageUri1} />
      <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'name')}
            onFocus={() => handleError(null, 'name')}
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
      <Button title="Signup" onPress={validate} />
          
     </View>
     <View style={{flexDirection:"row",justifyContent:"center",marginTop:12}}><Text style={{fontSize:15,color:"white"}}>Already have a account </Text><Pressable onPress={()=>navigation.goBack()}><Text style={{color:"#7727C8"}}>Login</Text></Pressable></View>
     </ImageBackground>
     </ScrollView>
    </SafeAreaView>
  
  )
}

export default Signup

const styles = StyleSheet.create({})