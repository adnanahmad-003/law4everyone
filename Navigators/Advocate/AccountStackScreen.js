import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountPage from './../../src/features/Advocate/Screens/Account/AccountPage';

const AccountStack = createNativeStackNavigator();

const AccountStackScreen = () => (
  <AccountStack.Navigator>
    <AccountStack.Screen name="AccountPage" component={AccountPage} options={{ headerShown: false }} />
  </AccountStack.Navigator>
);

export default AccountStackScreen;