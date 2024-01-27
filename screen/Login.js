import { SafeAreaView, StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react';

const Login = () => {
  
  const [isUser, setUser] = useState(false);
  const handleClick = () => {
    setUser(!isUser);
  };
  const [inputValue, setInputValue] = useState('');
  const [password,setPassword]=useState('');
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleInputChange = (text) => {
    setInputValue(text);
  };
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  }
  const handleBlur = () => {
    setIsFocused(false);
  }
  const handleFocus1 = () => {
    setIsFocused1(!isFocused1);
  };
  const handleBlur1 = () => {
    setIsFocused1(false);
  }
  return (
    <SafeAreaView style={{backgroundColor:"white",height:900}} >
      <View style={{height:180,backgroundColor:"#7727C8",borderBottomLeftRadius:190,}}></View>
     <View style={{marginTop:60}}>
      <Text style={{fontSize:31,textAlign:"center",fontWeight:"600"}}>Login</Text>
      <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:"center",marginTop:40}}>
        <TouchableOpacity onPress={handleClick}>
        <View style={{ borderColor: isUser ? '#7727C8' : 'transparent',paddingHorizontal:14,paddingVertical:6,borderRadius:6,borderWidth:1}}><Text style={{fontSize:17}}>User</Text></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClick}>
        <View style={{borderColor: isUser ? 'transparent':'#7727C8',paddingHorizontal:14,paddingVertical:6,borderRadius:6,borderWidth:1}}><Text style={{fontSize:17}}>Advocate</Text></View>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:50}}>
      <TextInput
        style={{ height: 40, borderWidth: 1, paddingHorizontal: 10 , marginHorizontal:5,marginBottom:10,borderRadius:8,borderWidth: isFocused?2:1}}
        placeholder="email.."
        onChangeText={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
      />
      <TextInput
        style={{ borderRadius:8,height: 40, borderWidth: 1, paddingHorizontal: 10 , marginHorizontal:5,borderWidth: isFocused1?2:1}}
        placeholder="Password"
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        onFocus={handleFocus1}
        onBlur={handleBlur1}
        value={password}
      />
      </View>
      <TouchableOpacity style={{marginTop:50}} >
        <View style={{alignSelf:"center",paddingVertical:6,borderRadius:6,width:100,backgroundColor:"#7727C8"}}><Text style={{fontSize:17,textAlign:"center"}}>Login</Text></View>
        </TouchableOpacity>
     </View>
     <View><Text style={{fontSize:15,textAlign:"center"}}>Create new account </Text></View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({})