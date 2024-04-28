import { SafeAreaView, StyleSheet, Text, View,TextInput,TouchableOpacity,ImageBackground, Pressable ,Keyboard,Alert ,Image} from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Botton';
import * as SecureStore from 'expo-secure-store';
//user redux
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../../../Redux/action';
import COLORS from '../../constants/Color';
import { BASE_URL } from '../../constants/Url';
import Loader from './../../components/Loader';
const Login = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [responseData,setResponse]= useState({
    message:'',
    isSignedIn:false
  });
  const navigation = useNavigation();
  const [isUser, setUser] = useState(true);
 
  

  const [inputs, setInputs] = React.useState({
    email: '',
   password: ''});
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  
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
      setIsLoading(true);
    }
  };

  const login= async () => { 
    try {
      
      const apiUrl = `${BASE_URL}/user/signin`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        
        body:JSON.stringify({user:inputs}),
      });
      
      const jsonData = await response.json();
      setIsLoading(false);
       console.log(jsonData,'login')
       setResponse({message:jsonData.message,isSignedIn:jsonData.isSignedIn})
      if(jsonData.isSignedIn){
        navigation.navigate('UserTabs');
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
      navigation.navigate('EmailVerification', { email: inputs.email , nextNavigate: 'UserTabs'})
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
  const handleNavigateToAdvocate = ()=>{
    navigation.navigate('AdvocateLogin');
  };
  
  
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ marginTop: 10 }}>
        <Image
          source={require("../../../assets/Images/Warner.png")}
          style={{ height: 200, resizeMode: "contain", alignSelf: "center" }}
        />
        <Text
          style={{
            fontSize: 31,
            textAlign: "center",
            fontWeight: "600",
            color: COLORS.brown1,
          }}
        >
          Login
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                shadowColor: COLORS.brown1,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 5,
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 6,
                backgroundColor: COLORS.brown4,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: COLORS.brown2,
                  fontWeight: "500",
                }}
              >
                USER
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigateToAdvocate}>
            <View
              style={{
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: COLORS.brown2,
                  fontWeight: "500",
                }}
              >
                ADVOCATE
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {responseData.isSignedIn ? null : (
          <Text style={{ color: "white" }}>{responseData.authToken}</Text>
        )}
        <View style={{ marginTop: 50, marginHorizontal: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            placeholderTextColor="#fff"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            placeholderTextColor="#fff"
            error={errors.password}
            password
          />
          <Button title="Log In" onPress={validate} />
        </View>
        <Loader visible={isLoading} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 12,
        }}
      >
        <Text style={{ fontSize: 15, color: COLORS.brown2 }}>
          Create new account{" "}
        </Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={{ color: COLORS.brown4 }}>Click Here</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Login

