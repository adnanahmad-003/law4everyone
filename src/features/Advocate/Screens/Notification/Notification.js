import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { BASE_URL } from "./../../../../constants/Url";
import COLORS from "../../../../constants/Color";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "../../../../components/Loader";

const Notification = () => {
  const [advocate, setAdvocates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch(`${BASE_URL}/advocate/getNotifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAdvocates(data.notifications);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ScrollView>
      {isLoading ? (
        <Loader visible={true} />
      ) : (
        <>
          {advocate.length === 0 && (
            <Text style={styles.noNotificationText}>
              No notifications found
            </Text>
          )}
          {advocate.map((problem) => (
            <View key={problem._id} style={styles.advocateCard}>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{problem.title}</Text>
                <Text style={styles.description}>{problem.description}</Text>
                <Text style={styles.userName}>
                  {problem.userInfo?.userName}
                </Text>
                <Text style={styles.name}>{problem.userInfo?.name}</Text>
                <Text style={styles.userName}>
                  {problem.problemInfo?.title}
                </Text>
                <Text style={styles.name}>
                  {problem.problemInfo?.description}
                </Text>
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noNotificationText: {
    margin: 10,
    fontSize: 24,
    fontWeight: "500",
  },
  advocateCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    backgroundColor: COLORS.brown5,
  },
  detailsContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default Notification;
