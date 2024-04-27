import { StyleSheet, Text, TouchableOpacity, View ,Image,ScrollView,Alert} from 'react-native'
import React,{useState,useEffect} from 'react'


import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../../../constants/Color';



const BlogScreen = ({ navigation }) => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    retrieveBlogs();
  }, []);

  const retrieveBlogs = async () => {
    try {
      const blogsString = await AsyncStorage.getItem('blogs');
      if (blogsString !== null) {
        const blogsData = JSON.parse(blogsString);
        setBlogs(blogsData);
      }
    } catch (error) {
      console.error('Error retrieving blogs:', error);
    }
  };
  const deleteBlog = async (index) => {
    try {
      const updatedBlogs = blogs.filter((blog, i) => i !== index);
      await AsyncStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleDelete = (index) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => deleteBlog(index) },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={styles.container}>
       <ScrollView style={styles.container}>
      {blogs.map((blog, index) => (
        <View key={index} style={styles.blogContainer}>
          <Text style={styles.title}>{blog.title}</Text>
          <Image source={{ uri: blog.image }} style={styles.image} />
          <Text style={styles.content}>{blog.content}</Text>
          <Text style={styles.tags}>Tags: {blog.tags}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddBlog')}>
        <Text style={styles.addButtonText}>Add Blog</Text>
      </TouchableOpacity>

    </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    
  
    
  },
  addButton: {
    
    backgroundColor:COLORS.brown4,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  tags: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#3E3232',
  },

});


export default BlogScreen
