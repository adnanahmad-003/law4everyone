import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity , Platform  } from "react-native";
//import { useSelector } from 'react-redux';
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from './../../../../constants/Url';
import COLORS from './../../../../constants/Color';
import Loader from './../../../../components/Loader';
const ActiveDealScreen = ({ navigation }) => {
  const [queries, setQueries] = useState([]);
  //const queries = useSelector(state => state.deals.queries);
 //console.log(BASE_URL);
 const{isLoading,setIsLoading}=useState(false);
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
      setIsLoading(true);
      const token = await SecureStore.getItemAsync("authToken");
      const response = await fetch(`${BASE_URL}/user/getProblems`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

     // console.log(data);
     setIsLoading(false);
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
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',margin:10}}>
      <Text style={styles.title}>Active Cases</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddDeal")}
      >
        <Text style={styles.addButtonText}>Add Cases</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("NotificationUser")}
      >
        <Text style={styles.addButtonText}>Case Notification</Text>
      </TouchableOpacity>
      </View>
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
         <Loader visible={isLoading} />
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
    color:COLORS.brown2
  },
  queryContainer: {
    margin: 5,
    backgroundColor: COLORS.brown4,
    padding: 20,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
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
    backgroundColor: COLORS.brown1,
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

