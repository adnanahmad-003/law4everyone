import { useState } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UploadProfile = ()=> {
  const [image, setImage] = useState(null);
  //const [selected , setSelected]=useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
       {image? <Image source={{ uri: image }} style={styles.profileImage} />:<Image source={require('../../assets/Images/profile.jpg')} style={styles.profileImage}/>}
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
      },
      profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40, 
        marginBottom: 3,
      },
      profileMock:{
        width: 80,
        height: 80,
        borderRadius: 40, 
        marginBottom: 3,
      }
});
export default UploadProfile;