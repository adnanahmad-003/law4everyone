import React, { useState } from 'react';
import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import Input from '../../components/Input';
import Button from '../../components/Botton';
import { setUserData } from '../../../Redux/action';

const Login = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isUser, setUser] = useState(false);
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [responseData, setResponse] = useState({ message: '', isSignedIn: false });

  const handleClick = () => {
    setUser(!isUser);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const validate = () => {
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

  const login = async () => {
    try {
      const apiUrl = 'http://localhost:3000/user/signin';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: inputs }),
      });

      const jsonData = await response.json();
      setResponse({ message: jsonData.message, isSignedIn: jsonData.isSignedIn });

      if (jsonData.isSignedIn) {
        navigation.navigate('UserTabs');
        await SecureStore.setItemAsync('authToken', jsonData.authToken);
        const res = await SecureStore.getItemAsync('authToken');
      } else if (jsonData.message === 'Wrong password') {
        Alert.alert('Wrong Password', jsonData.message, [{ text: 'OK' }]);
      } else {
        navigation.navigate('EmailVerification', { email: inputs.email, nextNavigate: 'tabs' });
      }
    } catch (error) {
      console.log('Error', 'Something went wrong', { error });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require('../../../assets/Images/Login.jpg')} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 31, fontWeight: '600', color: '#FFFFFF', marginBottom: 40 }}>Login</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={handleClick}>
              <View style={{ borderColor: isUser ? '#FFFFFF' : '#A87C7C', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6, borderWidth: 1 }}>
                <Text style={{ fontSize: 20, color:'#FFFFFF' }}>USER</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClick}>
              <View style={{ borderColor: isUser ? '#FFFFFF' : '#A87C7C', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6, borderWidth: 1 }}>
                <Text style={{ fontSize: 20, color: '#FFFFFF' }}>ADVOCATE</Text>
              </View>
            </TouchableOpacity>
          </View> 
          {responseData.isSignedIn && <Text style={{ color: 'white' }}>{responseData.authToken}</Text>}
          <View style={{ width: '80%' }}>
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
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <Text style={{ fontSize: 15, color: '#FFFFFF' }}>Create new account:</Text>
            <TouchableOpacity onPress={() => isUser ? navigation.navigate("Signup") : navigation.navigate("SignupLawyer")}>
              <Text style={{ color: '#A87C7C', marginLeft: 5 }}>Click Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
