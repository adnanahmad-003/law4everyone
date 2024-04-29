import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import COLORS from "./../../../../constants/Color";

//import { useDispatch, useSelector } from 'react-redux';
//import { addAdvocateId } from '../../../../../Redux/action';
import { BASE_URL } from "../../../../constants/Url";
const ActiveCases = ({ navigation }) => {
  //const dispatch = useDispatch();
  // const advocateId = useSelector((state) => state.advocateId);
  const [isCaseRequestAllowed, setIsCaseRequestAllowed] = useState(true);
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 15;

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
      const response = await fetch(
        `${BASE_URL}/advocate/getProblems?limit=${limit}&skip=${skip}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (skip === 0) {
        setQueries(data.problems);
      } else if (data.problems && skip > 0) {
        setQueries((prevQueries) => [...prevQueries, ...data.problems]);
      }
      setSkip(skip + limit);
      setIsLoading(false);
      //console.log(skip);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProfileView = (userId) => {
    // console.log(userId);
    navigation.navigate("ViewUsersProfile", { userId: userId });
  };
  const handleRequestCase = async (userId, problemId) => {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      //console.log(userId,'UserId');
      const response = await fetch(
        `${BASE_URL}/advocate/sendCaseAcceptRequest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({ problemId: problemId }),
        }
      );
      const data = await response.json();
      //console.log(data.message);
      setIsCaseRequestAllowed(data.isCaseRequestAllowed);
      if (data.isCaseRequestAllowed) {
        Alert.alert("Success", "Request sent successfully");
      } else {
        Alert.alert("Limit Exceeded", "Case request limit exceeded");
      }

      setQueries((prevQueries) =>
        prevQueries.filter((problem) => problem.problemId !== problemId)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <Text style={styles.title}>Active Cases</Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.brown1,
            padding: 6,
            borderRadius: 5,
          }}
          onPress={() => {
            navigation.navigate("RequestedCases");
          }}
        >
          <Text style={{ color: "#fff" }}>Requested Cases</Text>
        </TouchableOpacity>
      </View>
      {queries &&
        queries.map((problem) => (
          <TouchableOpacity key={problem._id} style={styles.queryContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "left",
                marginBottom: 10,
              }}
            >
              <Image
                source={{
                  uri: `data:image/png;base64,${problem.user.profileImage}`,
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  marginRight: 20,
                }}
              />
              <Text
                style={{ fontSize: 18, fontWeight: "700", marginRight: 10 }}
              >
                {`${problem.user.userName}`}{" "}
              </Text>
              <Text>{`${problem.user.name}`}</Text>
            </View>
            <Text style={styles.queryTitle}>{`${problem.title}`}</Text>
            <Text style={styles.queryDetails}>{problem.description}</Text>
            <Text style={styles.queryLastDate}>
              Deadline: {new Date(problem.deadline).toDateString()}
            </Text>
            <Text style={styles.queryStatus}>Status: {problem.status}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  handleRequestCase(problem.userId, problem.problemId)
                }
                style={{
                  backgroundColor: COLORS.brown1,
                  padding: 6,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "#fff" }}>make Request</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleProfileView(problem.userId)}
                style={{
                  backgroundColor: COLORS.brown1,
                  padding: 6,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "#fff" }}>View Full Profile</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

      {isLoading && <ActivityIndicator size="large" color="brown" />}
      {!isLoading && queries.length === 0 && <Text>No data available</Text>}
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
    color: COLORS.brown2,
  },
  queryContainer: {
    margin: 5,
    backgroundColor: COLORS.brown4,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  queryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  queryDetails: {
    fontSize: 15,
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
    fontWeight: "bold",
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

export default ActiveCases;
