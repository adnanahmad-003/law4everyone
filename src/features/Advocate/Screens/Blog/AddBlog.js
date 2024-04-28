import React, { useState,useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image, TouchableOpacity, ScrollView,Modal,FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from './../../../../constants/Color';
import DropDownPicker from 'react-native-dropdown-picker';
import { EvilIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import {BASE_URL} from './../../../../constants/Url';
import { Entypo } from "@expo/vector-icons";
const FilterModal = ({
  isOpen,
  onClose,
  predefinedExpertise,
  handleSelectPredefinedExpertise,
  expertise,
  handleRemoveExpertise,
  columns,
  handleFilter,
}) => {
  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text style={styles.modalTitle}>Filter based on Expertise</Text>
          </View>
          <View style={styles.predefinedExpertiseContainer}>
            {predefinedExpertise.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectPredefinedExpertise(item)}
              >
                <Text style={styles.predefinedExpertiseText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <FlatList
            key={columns}
            data={expertise}
            keyExtractor={(item, index) => index.toString()}
            style={styles.expertiseList}
            numColumns={columns}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleRemoveExpertise(item)}
                style={styles.expertiseItem}
              >
                <EvilIcons name="close-o" size={24} color="black" />
                <Text style={styles.expertiseItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleFilter}>
            <Text style={styles.submitButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const AddBlog = ({navigation}) => {

  //expertise searching for
  const [expertise, setExpertise] = useState([]);
  
  const predefinedExpertise = [
    "Civil Law",
    "Criminal Law",
    "Corporate Law",
    "Tax Law",
    "Labor and Employment Law",
    "Intellectual Property Law",
    "Constitutional Law",
    "Environmental Law",
    "International Law",
    "Family Law",
    "Real Estate Law",
    "Banking and Finance Law",
    "Personal Injury Law",
    "Health Law",
    "Education Law",
    "Immigration Law",
    "Cyber Law",
    "Entertainment Law",
    "Insurance Law",
    "Trusts and Estates Law"
  ];
  
  const [columns, setColumns] = useState(2);

  const handleSelectPredefinedExpertise = (item) => {
    setExpertise((prevExpertise)=>[...prevExpertise, item]);
    //console.log(expertise);
  };

  const handleRemoveExpertise = (itemToRemove) => {
    const updatedExpertise = expertise.filter((item) => item !== itemToRemove);
    setExpertise(updatedExpertise);
  };
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };
  const handleFilter =()=>{
    console.log('Tags selected');
  }


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  //const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await AsyncStorage.setItem('blogImage', result.assets[0].uri);  
    }
  };

  const handleAddBlog = async () => {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', content);
      formData.append('tags', JSON.stringify(expertise));
      formData.append('image', {
        uri: image,
        type: 'image/jpg', 
        name: 'image1.jpg' 
      });
  
      const response = await fetch(`${BASE_URL}/advocate/postBlog`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(expertise);
      
  
    } catch (error) {
      console.error('Error:', error);
      
    }
    setTitle('');
    setContent('');
    setExpertise([]);
    setImage(null);
  };

  /*const handleAddBlog = async () => {
    try {
      const blog = {
        title: title,
        content: content,
        tags: tags,
        image: image
      };

      // Get existing blogs from AsyncStorage
      let existingBlogs = await AsyncStorage.getItem('blogs');
      existingBlogs = existingBlogs ? JSON.parse(existingBlogs) : [];

      // Add new blog to the array
      existingBlogs.push(blog);

      // Store updated blogs array back to AsyncStorage
      await AsyncStorage.setItem('blogs', JSON.stringify(existingBlogs));

      console.log('Blog has been stored:', blog);
      setTitle('');
      setContent('');
      setExpertise([]);
      setImage(null);
    } catch (error) {
      console.error('Error storing blog:', error);
    }
  };*/
  return (
    <ScrollView style={styles.container}>
    <View style={styles.incontainer}>
      
      <TextInput
        style={styles.input}
        value={title}
        placeholder='Give Title to your post'
        onChangeText={text => setTitle(text)}
      />
      
      <TouchableOpacity onPress={pickImage} style={{width:"98%" ,height:300,backgroundColor:COLORS.white,alignItems: 'center', justifyContent: 'center',alignSelf:"center",borderRadius:10}}>
      {image && <Image source={{ uri: image }} style={{  width: "100%", 
        height: "100%", 
        resizeMode: 'contain' }} />}
        {!image&&<Text>Upload your post</Text>}
      </TouchableOpacity>
      
    <Text style={styles.label}>Content:</Text>
      <TextInput
        style={styles.input}
        multiline
        value={content}
        onChangeText={text => setContent(text)}
      />
      <Text style={styles.label}>Tags:</Text>
      <TouchableOpacity
            style={styles.filterButton}
            onPress={openFilterModal}
          >
            <Text style={styles.filterButtonText}>Select Tags</Text>
          </TouchableOpacity>
      <Button title="Add Blog" onPress={handleAddBlog}/>
      <TouchableOpacity onPress={() => navigation.navigate('BlogScreen')}><Text>go back</Text></TouchableOpacity>
      <FilterModal
            isOpen={isFilterModalOpen}
            onClose={closeFilterModal}
            predefinedExpertise={predefinedExpertise}
            handleSelectPredefinedExpertise={handleSelectPredefinedExpertise}
            expertise={expertise}
            handleRemoveExpertise={handleRemoveExpertise}
            columns={columns}
            handleFilter={handleFilter}
          />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.white
  },
  incontainer:{
    marginTop:40,
    padding:20,
    backgroundColor:COLORS.purple,
    borderRadius:10,
    margin:5
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom:10
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  predefinedExpertiseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  predefinedExpertiseText: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 5,
    borderRadius: 5,
    color: "#000",
  },
  expertiseList: {
    paddingVertical: 10,
    borderColor: "#000",
    borderWidth: 2,
    marginVertical: 5,
  },
  expertiseItem: {
    marginHorizontal: 6,
    backgroundColor: "#f0f0f0",
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  expertiseItemText: {
    padding: 5,
  },
  closeButton: {
    marginLeft: "90%",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddBlog

//const styles = StyleSheet.create({})