import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../src/features/Common/Login";
import Signup from "../../src/features/User/Screens/Signup/Signup";
import SignupLawyer from "../../src/features/Advocate/Screens/SignupLawyer/SignupLawyer";
import EmailVerification from "../../src/features/Common/EmailVerification";
import TabNavigator from "../User/TabNavigator";
import LawyerTabNavigator from "../Advocate/LawyerTabNavigator";
import CommentScreen from "../../src/components/CommentsScreen";
import AdvocateLogin from "../../src/features/Common/AdvocateLogin";
import ViewAdvocateProfile from "./../../src/components/ViewAdvocateProfile";
const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LawyerTabs">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdvocateLogin"
          component={AdvocateLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupLawyer"
          component={SignupLawyer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LawyerTabs"
          component={LawyerTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CommentScreen"
          component={CommentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewAdvocateProfile"
          component={ViewAdvocateProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStackNavigator;
