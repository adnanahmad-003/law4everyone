import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../src/features/User/Screens/Home/HomeScreen';
import BlogStackScreen from './BlogStackScreen'
import BlogFeed from '../../src/features/User/Screens/Blog/BlogFeed';
import AccountStackScreen from './AccountStackScreen';
import LawQuery from '../../src/features/User/Screens/Query/LawQuery';
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../../src/constants/Color';

const Tab = createBottomTabNavigator();

const tabBarIcon = {
  Home: 'home',
  Blog: 'add-comment',
  Query: 'call-to-action',
  BlogFeed: 'question-answer',
  Account: 'call-to-action',
};

const LawyerTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = tabBarIcon[route.name];
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.purple,
        tabBarInactiveTintColor: '#ccc',
        tabBarInactiveBackgroundColor: "#f2f2f2",
        tabBarActiveBackgroundColor: "#e6e6e6",
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: { padding: 3 }
      })}
      initialRouteName="Account"
    >
      <Tab.Screen name="Query" component={LawQuery} options={{ headerShown: false }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="BlogFeed" component={BlogFeed} options={{ headerShown: false }} />
      <Tab.Screen name="Blog" component={BlogStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={AccountStackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default LawyerTabNavigator;
