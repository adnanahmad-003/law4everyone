import { View, Text, Image, StyleSheet } from 'react-native';
import { memo } from 'react';
import ProfileBar from './ProfileBar';
import CommentsLikesBar from './CommentsLikesBar';
const CharacterListItem = ({ character }) => {
  //console.log('Re-rendering: ', character.id);
  const profileImage = require('./../../assets/Images/lawyer.jpg');
  const profileName ='Mr. XYZ';
  return (
    <View style={styles.container}>
        <ProfileBar profileImage={profileImage} profileName={profileName}/>
      <Text style={styles.name}>{character.name}</Text>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CommentsLikesBar comments={15} likes={35} />
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
