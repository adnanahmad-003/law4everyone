import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActiveDealScreen from '../../src/features/User/ActiveDeal/ActiveDealScreen';
import AddDeal from '../../src/features/User/ActiveDeal/AddDeal';
import EditDeal from '../../src/features/User/ActiveDeal/EditDeal';

const ActiveDeal = createNativeStackNavigator();

const ActiveDealStackScreen = () => (
  <ActiveDeal.Navigator>
    <ActiveDeal.Screen name="ActiveDealScreen" component={ActiveDealScreen} options={{ headerShown: false }} />
    <ActiveDeal.Screen name="AddDeal" component={AddDeal} options={{ headerShown: false }} />
    <ActiveDeal.Screen name="EditDeal" component={EditDeal} options={{ headerShown: false }} />
  </ActiveDeal.Navigator>
);

export default ActiveDealStackScreen;
