import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { memo } from 'react';
import ProfileBar from './ProfileBar';
import CommentsLikesBar from './CommentsLikesBar';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import * as SecureStore from 'expo-secure-store';
import {BASE_URL} from './../constants/Url'
const CharacterListItem = ({ character, isLiked, setIsLiked }) => {
  const likesCount = character.likes.length;
  const [myLike, setMyLike] = useState(character.isLiked);
  const commentsCount = character.comments.length;
  const [likes, setLikes] = useState(likesCount);
  const navigation = useNavigation();
  const blogId = character.blogId;
  const advocateId = character.advocateId;
 //console.log(isLiked);
  const fetchLikes = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      const response = await fetch(`${BASE_URL}/user/likeorUnlikeBlog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ blogId: blogId }), 
      });
      const data = await response.json();
      if (data.message)
        return data.message; 
      else
        return data.response;
    } catch (error) {
      console.error('Error fetching likes:', error);
      throw error; 
    }
  };

  const handleLikePress = async () => {
    setIsLiked(!isLiked);
    if (myLike) {
      setLikes(Math.max(likes - 1, 0));
    } else {
      setLikes(Math.max(likes + 1, 0));
    }
    setMyLike(!myLike);
    await fetchLikes(blogId);
  };

  const handleCommentsPress = () => {
    navigation.navigate('CommentScreen', { blogId: blogId , precomments : character.comments });
  };
  const handleNavigatetoAdvocate = () => {
    navigation.navigate('ViewAdvocateProfile', {advocateId:advocateId});
  };


  const image = `data:image/png;base64,${character.image}`;
  const userImage = `data:image/png;base64,${character.advocates[0].personalDetails.profileImage}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigatetoAdvocate}>
      <ProfileBar profileImage={userImage} profileName={character.advocates[0].personalDetails.userName} />
      </TouchableOpacity>
      <Text style={styles.name}></Text>
      <Image source={{ uri: image}} style={styles.image} />
      
        <CommentsLikesBar
          isLiked= {myLike}
          comments={commentsCount}
          likes={likes}
          onLikePress={handleLikePress}
          onCommentsPress={handleCommentsPress}
        />
        <View><Text style={styles.description}>description:  {character.description}</Text></View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin:10,
    backgroundColor: '#fff',
    paddingTop:10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 15,
    marginTop: 3,
    marginBottom:10
  },
  image: {
    width: '100%',
    height: 340,
  },
});

export default memo(
  CharacterListItem,
  (prevProps, nextProps) => prevProps.character.id === nextProps.character.id
);
