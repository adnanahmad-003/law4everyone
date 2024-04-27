import { StyleSheet, Text, View ,TextInput} from 'react-native'
import React from 'react'
import COLORS from '../constants/Color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({label,
    iconName,
    error,
    password,
    onFocus = () => {},
    ...props}) => {
    const [hidePassword, setHidePassword] = React.useState(password);
    const [isFocused, setIsFocused] = React.useState(false); 
  return (
    <View style={{marginBottom: 20}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.purple
              : COLORS.white,
            alignItems: 'center',
          },
        ]}>
            <Icon
          name={iconName}
          style={{color: COLORS.white, fontSize: 22, marginRight: 10}}
        />
        <TextInput
        autoCapitalize={false}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color: COLORS.white, flex: 1,}}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: COLORS.white, fontSize: 22}}
          />
        )}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  )
}

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 17,
    color: COLORS.brown4,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.brown1,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Input

