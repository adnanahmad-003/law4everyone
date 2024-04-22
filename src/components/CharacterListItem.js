import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { memo } from 'react';
import ProfileBar from './ProfileBar';
import CommentsLikesBar from './CommentsLikesBar';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import * as SecureStore from 'expo-secure-store';

const CharacterListItem = ({ character, isLiked, setIsLiked }) => {
  const likesCount = character.likes.length;
  const [myLike, setMyLike] = useState(character.isLiked);
  const commentsCount = character.comments.length;
  const [likes, setLikes] = useState(likesCount);
  const navigation = useNavigation();
  const blogId = character.blogId;
 console.log(isLiked);
  const fetchLikes = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      const response = await fetch(`http://localhost:3000/user/likeorUnlikeBlog`, {
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
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setMyLike(!myLike);
    await fetchLikes(blogId);
  };

  const handleCommentsPress = () => {
    navigation.navigate('CommentScreen', { blogId: blogId , precomments : character.comments });
  };

  const image = `data:image/png;base64,${character.image}`;
  const userImage = `data:image/png;base64,${character.advocates[0].personalDetails.profileImage}`;

  return (
    <View style={styles.container}>
      <ProfileBar profileImage={userImage} profileName={character.advocates[0].personalDetails.userName}/>
      <Text style={styles.name}>{character.name}</Text>
      <Image source={{ uri: image}} style={styles.image} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CommentsLikesBar
          isLiked= {myLike}
          comments={commentsCount}
          likes={likes}
          onLikePress={handleLikePress}
          onCommentsPress={handleCommentsPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flex: 1,
    borderRadius: 10,
  },
  name: {
    height: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkslategrey',
    alignSelf: 'Left',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default memo(
  CharacterListItem,
  (prevProps, nextProps) => prevProps.character.id === nextProps.character.id
);
