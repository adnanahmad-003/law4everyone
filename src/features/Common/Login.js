import { SafeAreaView, StyleSheet, Text, View,TextInput,TouchableOpacity,ImageBackground, Pressable ,Keyboard,Alert} from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Botton';
import * as SecureStore from 'expo-secure-store';
//user redux
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../../../Redux/action';

const Login = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [responseData,setResponse]= useState({
    message:'',
    isSignedIn:false
  });
  const navigation = useNavigation();
  const [isUser, setUser] = useState(false);
  const handleClick = () => {
    setUser(!isUser);
  };
  

  const [inputs, setInputs] = React.useState({
    email: '',
   password: ''});
  const [errors, setErrors] = React.useState({});
  //const [loading, setLoading] = React.useState(false);
  
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login= async () => { 
    try {
      //setLoading(false);
      const apiUrl = 'http://localhost:3000/user/signin';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        
        body:JSON.stringify({user:inputs}),
      });
      
      const jsonData = await response.json();
      
       console.log(jsonData,'login')
       setResponse({message:jsonData.message,isSignedIn:jsonData.isSignedIn})
      if(jsonData.isSignedIn){
        navigation.navigate('Tabs');
        await SecureStore.setItemAsync('authToken',jsonData.authToken);
       const res= await SecureStore.getItemAsync('authToken');
       
       setResponse({message:jsonData.message,isSignedIn:jsonData.isSignedIn})
       
     }
     else if((jsonData.message=='Wrong password')){
      Alert.alert(
        'Wrong Password',
        jsonData.message,
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: true }
      );
     }
     else if(!(jsonData.isSignedIn) && (jsonData.message!='Wrong password')){
      navigation.navigate('EmailVerification', { email: inputs.email , nextNavigate: 'tabs'})
     }
    
     
      
    }
     catch (error) {
      console.log('Error', 'Something went wrong',{error});
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  
  
  
  return (
    <SafeAreaView style={{backgroundColor:"white",height:900}} >
    <ImageBackground
        source={require('../../../assets/Images/Login.jpg')}
        style={{height:900}}
      >
     <View style={{marginTop:40}}>
      <Text style={{fontSize:31,textAlign:"center",fontWeight:"600",color:"white"}}>Login</Text>
      <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",marginTop:40}}>
        <TouchableOpacity onPress={handleClick}>
        <View style={{ borderColor: isUser ? '#7727C8' : 'transparent',paddingHorizontal:14,paddingVertical:6,borderRadius:6,borderWidth:1}}><Text style={{fontSize:22,color:"white"}}>USER</Text></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClick}>
        <View style={{borderColor: isUser ? 'transparent':'#7727C8',paddingHorizontal:14,paddingVertical:6,borderRadius:6,borderWidth:1}}><Text style={{fontSize:22,color:"white"}}>ADVOCATE</Text></View>
        </TouchableOpacity>
      </View>
      {responseData.isSignedIn?null:<Text style={{color:"white"}}>{responseData.authToken}</Text>}
      <View style={{marginTop:50,marginHorizontal:20}}>
      
      
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
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
          <Button title="Log In" onPress={validate} />
          
      
      </View>
      
     </View>
     <View style={{flexDirection:"row",justifyContent:"center",marginTop:12}}><Text style={{fontSize:15,color:"white"}}>Create new account </Text><Pressable onPress={()=>isUser?navigation.navigate("Signup"):navigation.navigate("SignupLawyer")}><Text style={{color:"#7727C8"}}>Click Here</Text></Pressable></View>
     </ImageBackground>
    </SafeAreaView>
  )
}

export default Login

