import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActiveCases from "../../src/features/Advocate/Screens/Cases/ActiveCases";
import ViewUsersProfile from "../../src/features/Advocate/Screens/Cases/ViewUsersProfile";
import RequestedCases from './../../src/features/Advocate/Screens/Cases/RequestedCases'
const ActiveCasesStack = createNativeStackNavigator();

const ActiveCasesStackScreen = () => (
  <ActiveCasesStack.Navigator>
    <ActiveCasesStack.Screen name="ActiveCasesScreen" component={ActiveCases} options={{ headerShown: false }} />
    <ActiveCasesStack.Screen name="ViewUsersProfile" component={ViewUsersProfile} options={{ headerShown: false }} />
    <ActiveCasesStack.Screen name="RequestedCases" component={RequestedCases} options={{ headerShown: false }} />
  </ActiveCasesStack.Navigator>
);

export default ActiveCasesStackScreen;
