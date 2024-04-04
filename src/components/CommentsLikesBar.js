import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommentsLikesBar = ({ comments, likes }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.text}>{comments}</Text>
        <Text style={styles.label}>Comments</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>{likes}</Text>
        <Text style={styles.label}>Likes</Text>
      </View>
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
