import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommentsProfileBar from './CommentsProfileBar';
import {BASE_URL} from './../constants/Url';
import * as SecureStore from 'expo-secure-store';

const CommentScreen = ({ route }) => {
  const { blogId , precomments} = route.params;
  const navigation = useNavigation();
  const [comments, setComments] = useState(precomments);
  const [newComment, setNewComment] = useState('');
  const userImage = require('./../../assets/Images/profile.jpg');

  useEffect(() => {
    setComments(precomments);
  }, []);

  const fetchComments = async (blogId, comment) => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      const response = await fetch(`${BASE_URL}/user/commentOnBlog`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ blogId: blogId, comment: comment }),
      });

      const data = await response.json();
      console.log(data)
      console.log(data.message)
      if (data.message)
        return data.message;
      else {
        return data.response;
      }
    } catch (error) {
      console.error('Error adding string:', error);
      throw error;
    }
  };

  const addComment = async () => {
    if (newComment.trim() !== '') {
      const newCommentObj = {
        _id: '',
        comment: newComment,
        commentedBy: 'You',
        timeStamp: new Date().toISOString(), 
        userType: 'user', 
      };
      
      setComments([...comments, newCommentObj]);
      await fetchComments(blogId, newComment); 
      setNewComment('');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };
  const image = `data:image/png;base64,${comments.image}`;
  //console.log(comments);
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Button title="Go Back" onPress={handleGoBack} />
      <Text style={styles.heading}>Previous Comments</Text>
    </View>
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <View style={styles.commentContainer}>
          <CommentsProfileBar profileName={'Adnan'} />
          <View style={styles.commentContent}>
            <Text style={styles.commentText}>{item.comment}</Text>
            <Text style={styles.timestamp}>Timestamp: {formatTimestamp(item.timeStamp)}</Text>
            <Text style={styles.userType}>User Type: {item.userType}</Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item._id}
    />
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={text => setNewComment(text)}
      />
      <Button title="Add Comment" onPress={addComment} />
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentContent: {
    marginLeft: 10,
  },
  commentText: {
    fontSize: 16,
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
  },
  userType: {
    fontSize: 12,
    color: '#777',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default CommentScreen;
