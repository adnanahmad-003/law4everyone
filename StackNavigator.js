import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import SignupLawyer from './src/screen/SignupLawyer';
import Login from './src/screen/Login';
import Signup from './src/screen/Signup';
import LawQuery from './src/screen/Home/LawQuery'
import React from "react";

//tabs
import HomeScreen from './src/screen/Home/HomeScreen';
import BlogScreen from './src/screen/Home/BlogScreen';
import FindLawyerScreen from './src/screen/Home/FindLawyerScreen';
import ActiveDealScreen from './src/screen/Home/ActiveDealScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import COLORS from './src/constants/Color';


const Tab = createBottomTabNavigator();
const tabBarIconMap = {
  Home: 'home',
  Blog: 'add-comment',
  FindLawyer: 'person-search',
  Connect:"call-to-action",
  Query :"question-answer"
};
function TabNavigator() {
  return (
    <Tab.Navigator

    
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = tabBarIconMap[route.name];
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.purple,
        tabBarInactiveTintColor: '#ccc',
        tabBarInactiveBackgroundColor:"#f2f2f2",
        tabBarActiveBackgroundColor:"#e6e6e6",
        tabBarHideOnKeyboard:true,
        tabBarItemStyle:{padding:3}
      })}
     

      
      initialRouteName='Home'
    >
      <Tab.Screen name="FindLawyer" component={FindLawyerScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Query" component={LawQuery} options={{ headerShown: false }} />
      
      
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Blog" component={BlogScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Connect" component={ActiveDealScreen} options={{ headerShown: false }} />
      
    </Tab.Navigator>
  );
}


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Tabs'>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />

        <Stack.Screen name="SignupLawyer" component={SignupLawyer} options={{ headerShown: false }} />
        
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

//const styles = StyleSheet.create({});