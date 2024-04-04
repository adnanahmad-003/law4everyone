import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
//import { useSelector } from 'react-redux';
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native"; 
const ActiveDealScreen = ({ navigation }) => {
  const [queries, setQueries] = useState([]);
  //const queries = useSelector(state => state.deals.queries);

  //Get request
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
      const token = await SecureStore.getItemAsync("authToken");
      const response = await fetch("http://localhost:3000/user/getProblems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

     // console.log(data);
      setQueries(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditDeal = (queryId , title , description) => {
    navigation.navigate("EditDeal", { queryId , title , description});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Deals</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddDeal")}
      >
        <Text style={styles.addButtonText}>Add Deal</Text>
      </TouchableOpacity>
      {queries.problems &&
        queries.problems.map((problem) => (
          <TouchableOpacity
            key={problem._id} 
            style={styles.queryContainer}
            onPress={() => handleEditDeal(problem.problemId,problem.title,problem.description)}
          >
            <Text style={styles.queryTitle}>{problem.title}</Text>
            <Text style={styles.queryDetails}>{problem.description}</Text>
            <Text style={styles.queryLastDate}>
              Last Date: {new Date(problem.deadline).toDateString()}
            </Text>
            <Text style={styles.queryStatus}>Status: {problem.status}</Text>
          </TouchableOpacity>
        ))}
    </View>
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

export default ActiveDealScreen;

