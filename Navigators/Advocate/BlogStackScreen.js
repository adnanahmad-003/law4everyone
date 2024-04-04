import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BlogScreen from '../../src/features/Advocate/Screens/Blog/BlogScreen';
import AddBlog from '../../src/features/Advocate/Screens/Blog/AddBlog';

const BlogStack = createNativeStackNavigator();

const BlogStackScreen = () => (
  <BlogStack.Navigator>
    <BlogStack.Screen name="BlogScreen" component={BlogScreen} options={{ headerShown: false }} />
    <BlogStack.Screen name="AddBlog" component={AddBlog} options={{ headerShown: false }} />
  </BlogStack.Navigator>
);

export default BlogStackScreen;
