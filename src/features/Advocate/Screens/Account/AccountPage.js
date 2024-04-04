import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../../../components/Botton"; 
import Loader from "../../../../components/Loader"; 
import { EvilIcons } from '@expo/vector-icons'; 

const AccountPage = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
    registrationNumber: "",
    expertise: [],
    bio: "No bio",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user details from the server when the component mounts
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    // Simulating fetching user details from the server
    setLoading(true);
    try {
      // Replace this with your actual API endpoint
      const response = await fetch("https://your-api-endpoint.com/user-details");
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch user details");
    }
    setLoading(false);
  };

  const handleUpdateDetails = async () => {
    // Simulating updating user details on the server
    setLoading(true);
    try {
      // Replace this with your actual API endpoint
      const response = await fetch("https://your-api-endpoint.com/update-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      Alert.alert("Success", "User details updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update user details");
    }
    setLoading(false);
  };

  const handleInputChange = (value, field) => {
    setUserDetails(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Loader visible={loading} />
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
        value={userDetails.email}
        onChangeText={text => handleInputChange(text, "email")}
        placeholder="Email"
      />
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
        value={userDetails.fullname}
        onChangeText={text => handleInputChange(text, "fullname")}
        placeholder="Full Name"
      />
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
        value={userDetails.phone}
        onChangeText={text => handleInputChange(text, "phone")}
        placeholder="Phone"
      />
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
        value={userDetails.password}
        onChangeText={text => handleInputChange(text, "password")}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
        value={userDetails.registrationNumber}
        onChangeText={text => handleInputChange(text, "registrationNumber")}
        placeholder="Registration Number"
      />
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}>
        {userDetails.expertise.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ marginRight: 10, marginBottom: 10, backgroundColor: "#f0f0f0", borderRadius: 5 }}
            onPress={() => handleRemoveExpertise(item)}
          >
            <Text style={{ padding: 10 }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
        value={userDetails.bio}
        onChangeText={text => handleInputChange(text, "bio")}
        placeholder="Bio"
      />
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
        value={userDetails.experience}
        onChangeText={text => handleInputChange(text, "experience")}
        placeholder="Experience"
      />
      <Button title="Update Details" onPress={handleUpdateDetails} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ marginTop: 10, color: "blue" }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountPage;
