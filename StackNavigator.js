import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import SignupLawyer from './src/screen/SignupLawyer';
import Login from './src/screen/Login';
import Signup from './src/screen/Signup';
import LawQuery from './src/screen/Home/LawQuery'
import React from "react";
import EmailVerification from './src/screen/EmailVerification';
//tabs
import HomeScreen from './src/screen/Home/HomeScreen';
import BlogScreen from './src/screen/Home/Blog/BlogScreen';
import FindLawyerScreen from './src/screen/Home/FindLawyerScreen';
import ActiveDealScreen from './src/screen/Home/ActiveDeal/ActiveDealScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import COLORS from './src/constants/Color';

import AddBlog from './src/screen/Home/Blog/AddBlog';
import AddDeal from './src/screen/Home/ActiveDeal/AddDeal';
import EditDeal from './src/screen/Home/ActiveDeal/EditDeal';
//Blog navigator
const BlogStack = createNativeStackNavigator();

const BlogStackScreen = () => (
  <BlogStack.Navigator >
    
    <BlogStack.Screen name="BlogScreen" component={BlogScreen} options={{ headerShown: false }} />
    <BlogStack.Screen name="AddBlog" component={AddBlog} options={{ headerShown: false }} />
  </BlogStack.Navigator>
);

//Deal navigator
const ActiveDeal = createNativeStackNavigator();

const ActiveDealStackScreen = () => (
  <ActiveDeal.Navigator >
    <ActiveDeal.Screen name="ActiveDealScreen" component={ActiveDealScreen} options={{ headerShown: false }} />
    <ActiveDeal.Screen name="AddDeal" component={AddDeal} options={{ headerShown: false }} />
    <ActiveDeal.Screen name="EditDeal" component={EditDeal} options={{ headerShown: false }} />
  </ActiveDeal.Navigator>
);





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
      <Tab.Screen name="Blog" component={BlogStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Connect" component={ActiveDealStackScreen} options={{ headerShown: false }} />
      
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
        <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
