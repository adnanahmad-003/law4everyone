import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActiveDealScreen from '../../src/features/User/Screens/ActiveDeal/ActiveDealScreen';
import AddDeal from '../../src/features/User/Screens/ActiveDeal/AddDeal';
import EditDeal from '../../src/features/User/Screens/ActiveDeal/EditDeal';
import NotificationUser from './../../src/features/User/Screens/ActiveDeal/NotificationUser'
const ActiveDeal = createNativeStackNavigator();

const ActiveDealStackScreen = () => (
  <ActiveDeal.Navigator>
    <ActiveDeal.Screen name="ActiveDealScreen" component={ActiveDealScreen} options={{ headerShown: false }} />
    <ActiveDeal.Screen name="AddDeal" component={AddDeal} options={{ headerShown: false }} />
    <ActiveDeal.Screen name="EditDeal" component={EditDeal} options={{ headerShown: false }} />
    <ActiveDeal.Screen name="NotificationUser" component={NotificationUser} options={{ headerShown: false }} />
  </ActiveDeal.Navigator>
);

export default ActiveDealStackScreen;
