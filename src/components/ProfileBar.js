import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ProfileBar = ({ profileImage, profileName }) => {
  return (
    <View style={styles.profileBar}>
      <Image source={{uri : profileImage}} style={styles.profileImage} />
      <Text style={styles.profileName}>{profileName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginLeft: 20, 
    marginRight:10
  },
  profileName: {
    fontSize: 16,
    fontWeight:'500'
  },
});

export default ProfileBar;
