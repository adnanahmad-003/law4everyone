import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ProfileBar = ({ profileImage, profileName }) => {
  return (
    <View style={styles.profileBar}>
      <Image source={profileImage} style={styles.profileImage} />
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
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    borderRadius: 25, // Ensures the image is circular
    marginRight: 10, // Adjust spacing between image and name
  },
  profileName: {
    fontSize: 16, // Adjust font size as needed
  },
});

export default ProfileBar;
