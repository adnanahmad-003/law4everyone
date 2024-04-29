import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "./../../../../constants/Color";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../../../constants/Url";

const BlogScreen = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    retrieveBlogs();
  }, []);

  const retrieveBlogs = async () => {
    try {
      const blogsString = await AsyncStorage.getItem("blogs");
      if (blogsString !== null) {
        const blogsData = JSON.parse(blogsString);
        setBlogs(blogsData);
      }
    } catch (error) {
      console.error("Error retrieving blogs:", error);
    }
  };

  const deleteBlog = async (index) => {
    try {
      const updatedBlogs = blogs.filter((blog, i) => i !== index);
      await AsyncStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleDelete = (index) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => deleteBlog(index) },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text
            style={{ fontSize: 25, fontWeight: "600", color: COLORS.brown1 }}
          >
            Add a new blog
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddBlog")}
          >
            <Text style={styles.addButtonText}>Add Blog</Text>
          </TouchableOpacity>
        </View>
        {blogs.map((blog, index) => (
          <View key={index} style={styles.blogContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text style={styles.title}>{blog.title}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>

            <Image source={{ uri: blog.image }} style={styles.image} />
            <Text style={styles.content}>description : {blog.content}</Text>
            <Text style={styles.tags}>Tags: {blog.tags}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  blogContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 10,
    color: COLORS.brown2,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.brown2,
  },
  tags: {
    fontSize: 14,
    fontStyle: "italic",
    color: COLORS.brown2,
  },
  deleteButton: {
    backgroundColor: COLORS.brown4,
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: COLORS.brown1,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BlogScreen;
