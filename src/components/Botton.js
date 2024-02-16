import React from 'react';
import {TouchableOpacity, Text,TextInput} from 'react-native';
import COLORS from '.././constants/Color';
const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: COLORS.purple,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
      }}>
      <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
