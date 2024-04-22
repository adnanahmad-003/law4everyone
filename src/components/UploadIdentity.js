import { useState } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UploadIdentity = ({ setImageUri })=> {
  const [image, setImage] = useState(null);
  //const [selected , setSelected]=useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
       {image? <Image source={{ uri: image }} style={styles.cardMock} />:<Image source={require('../../assets/Images/id-card.png')} style={styles.profileImage}/>}
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:'#fff',
        borderRadius:8,
        marginBottom:10
      },
      profileImage: {
        width: 80,
        height: 80,
        
        marginBottom: 3,
      },
      cardMock:{
        width: 300,
        height: 200,
      }
});
export default UploadIdentity;