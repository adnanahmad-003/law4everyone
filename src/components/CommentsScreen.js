import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommentsProfileBar from './CommentsProfileBar';

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
      const response = await fetch(`http://localhost:3000/user/commentOnBlog`, {
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

  return (
    <View style={styles.container}>
      <Button title="Go Back" onPress={handleGoBack} />
      <Text style={styles.heading}>Previous Comments</Text>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <CommentsProfileBar profileImage={userImage} profileName={'Adnan'} />
            <Text style={styles.comment}>{item.comment}</Text>
            <Text style={styles.timestamp}>Timestamp: {item.timeStamp}</Text>
            <Text style={styles.userType}>User Type: {item.userType}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={text => setNewComment(text)}
      />
      <Button title="Add Comment" onPress={addComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comment: {
    margin: 10,
    fontSize: 16,
    padding: 3,
    color: '#fff',
  },
  commentBox: {
    margin: 10,
    padding: 3,
    borderRadius: 4,
    backgroundColor: '#7727C8',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default CommentScreen;
