import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView ,ActivityIndicator} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native"; 
import { BASE_URL } from "../../../../constants/Url";
import Loader from "../../../../components/Loader";
const RequestedCases = ({ navigation }) => {
  const [queries, setQueries] = useState([]);
  const [userDetails , setUserDetails]= useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      isLoading(true);
      const token = await SecureStore.getItemAsync("authToken");
      const response = await fetch(`${BASE_URL}/advocate/getRequestedProblems`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      //console.log(data);
        setQueries(data.requestedProblems.problemDetails);
        setUserDetails(data.requestedProblems.userDetails);
        isLoading(false);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const handleProfileView = (userId) => {
    navigation.navigate("ViewUsersProfile", {userId:userId});
  };


  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.title}>Requested Cases</Text>
      {queries && queries.map((problem, index) => (
  <View key={problem._id} style={styles.queryContainer}>
    <TouchableOpacity onPress={() => handleProfileView(userDetails[index].userId)} style={{backgroundColor:'gray'}}>
      <Text>View User Profile</Text>
    </TouchableOpacity>
    <Text style={styles.queryTitle}>{problem.title}</Text>
    <Text style={styles.queryDetails}>{problem.description}</Text>
    <Text style={styles.queryLastDate}>
      Last Date: {new Date(problem.deadline).toDateString()}
    </Text>
    <Text style={styles.queryStatus}>Status: {problem.status}</Text>
  </View>
))}
  <Loader visible={isLoading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  queryContainer: {
    margin: 5,
    backgroundColor: "#fefefe",
    padding: 20,
    borderRadius: 10,
  },
  queryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  queryDetails: {
    fontSize: 16,
    marginTop: 5,
  },
  queryLastDate: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
  },
  queryStatus: {
    fontSize: 14,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RequestedCases;

