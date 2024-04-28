import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const CommentsLikesBar = ({isLiked, comments, likes, onLikePress, onCommentsPress }) => {
  //console.log(isLiked);
  return (
    <View style={styles.container}>
      
       <TouchableOpacity style={styles.item} onPress={onLikePress}>
       <AntDesign name="heart" size={24} color={isLiked ? "red" : "#ede0d4"} />
        <Text style={styles.label}>Like</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onCommentsPress}>
        
        <Text style={styles.label}>Comments</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} >
        <Text style={styles.text}>{comments}</Text>
        <Text style={styles.label}>Comments</Text>
      </TouchableOpacity>
     
      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>{likes}</Text>
        <Text style={styles.label}>Likes</Text>
      </TouchableOpacity>
      </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
    margin:10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
  },
  label: {
    marginLeft: 5,
    fontSize: 16,
  },
});

export default CommentsLikesBar;
