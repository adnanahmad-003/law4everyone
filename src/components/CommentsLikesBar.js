import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const CommentsLikesBar = ({isLiked, comments, likes, onLikePress, onCommentsPress }) => {
  //console.log(isLiked);
  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.item} onPress={onLikePress}>
       <AntDesign name="heart" size={24} color={isLiked ? "red" : "#fff"} />
        <Text style={styles.label}>Like</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} >
        <Text style={styles.text}>{comments}</Text>
        <Text style={styles.label}>Comments</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onCommentsPress}>
        <Text style={styles.text}>{comments}</Text>
        <Text style={styles.label}>  SeeComments</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  item: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#999',
  },
});

export default CommentsLikesBar;
