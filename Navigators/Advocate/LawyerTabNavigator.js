import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../src/features/User/Screens/Home/HomeScreen';
import BlogStackScreen from './BlogStackScreen'
import BlogFeed from '../../src/features/User/Screens/Blog/BlogFeed';
import AccountStackScreen from './AccountStackScreen';
import LawQuery from '../../src/features/User/Screens/Query/LawQuery';
import { MaterialIcons } from '@expo/vector-icons';
import ActiveCases from '../../src/features/Advocate/Screens/Cases/ActiveCases';
import COLORS from '../../src/constants/Color';
import ActiveCasesStackScreen from './ActiveCasesStackScreen'
import Notification from './../../src/features/Advocate/Screens/Notification/Notification'
const Tab = createBottomTabNavigator();

const tabBarIcon = {
  ActiveCases: 'home',
  Blog: 'add-comment',
  Notification: 'call-to-action',
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
      <Tab.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Tab.Screen name="ActiveCases" component={ActiveCasesStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="BlogFeed" component={BlogFeed} options={{ headerShown: false }} />
      <Tab.Screen name="Blog" component={BlogStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={AccountStackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default LawyerTabNavigator;
