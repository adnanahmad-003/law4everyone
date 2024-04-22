import CharacterListItem from "../../../../components/CharacterListItem";
import * as SecureStore from "expo-secure-store";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

const BlogFeed = () => {
  const [skip, setSkip] = useState(0);
  const limit = 1;
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const [isLiked, setIsLiked] = useState(false);

  const handleLikeChange = (newIsLiked) => {
    setIsLiked(newIsLiked);
  };
  const { width } = useWindowDimensions();

  const fetchPage = async () => {
    if (loading) {
      return;
    }

    console.log("Fetching: ");

    try {
      const token = await SecureStore.getItemAsync("authToken");
      const response = await fetch(
        `http://localhost:3000/user/getBlogs?skip=${skip}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data.message);

      if (data.blogs && data.blogs.length > 0) {
        const uniqueBlogs = data.blogs.filter(
          (newBlog) =>
            !items.some((existingBlog) => existingBlog.id === newBlog.id)
        );

        setItems((existingItems) => [...existingItems, ...uniqueBlogs]);
        setSkip(skip + limit);
        setIsLiked(data.blogs.isLiked);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  /*const onRefresh = () => {
    if (loading) {
      return;
    }
    setItems([]);
    fetchPage(skip,limit);
  };*/

  useEffect(() => {
    fetchPage();
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <CharacterListItem
        character={item}
        isLiked={isLiked}
        setIsLiked={handleLikeChange}
      />
    ),
    []
  );

  if (items.length === 0) {
    // this is only to make the debug prop on FlatList Work
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10 }}
        onEndReached={() => fetchPage()}
        onEndReachedThreshold={1}
        ListFooterComponent={() => loading && <ActivityIndicator />}
        refreshing={loading}
      />
    </View>
  );
};

export default BlogFeed;
