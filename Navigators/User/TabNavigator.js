import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import FindLawyerScreen from '../../src/features/User/Screens/FindLawyer/FindLawyerScreen';
import LawQuery from '../../src/features/User/Screens/Query/LawQuery';
import BlogFeed from '../../src/features/User/Screens/Blog/BlogFeed';
import HomeScreen from '../../src/features/User/Screens/Home/HomeScreen';
import ActiveDealStackScreen from './ActiveDealStackScreen';
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../../src/constants/Color';

const Tab = createBottomTabNavigator();

const tabBarIconMap = {
  Home: 'home',
  Blog: 'add-comment',
  FindLawyer: 'person-search',
  Connect: 'call-to-action',
  Query: 'question-answer'
};

const TabNavigator = () => {
  return (
  
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = tabBarIconMap[route.name];
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: COLORS.brown1,
        tabBarInactiveBackgroundColor: COLORS.brown4,
        tabBarActiveBackgroundColor: COLORS.brown1,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {padding:5},
        tabBarStyle:{height:70}
      })}
      initialRouteName='Home'
    >
      <Tab.Screen name="FindLawyer" component={FindLawyerScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Query" component={LawQuery} options={{ headerShown: false }} />
      <Tab.Screen name="Blog" component={BlogFeed} options={{ headerShown: false }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Connect" component={ActiveDealStackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
