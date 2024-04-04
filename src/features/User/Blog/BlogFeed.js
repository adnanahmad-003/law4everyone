
import CharacterListItem from '../../../components/CharacterListItem';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React,{ useState, useEffect, useCallback, useMemo, useRef } from 'react';

const BlogFeed = () => {

    const initialPage = 'https://rickandmortyapi.com/api/character';
 const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState('');

  const { width } = useWindowDimensions();

  const fetchPage = async (url) => {
    if (loading) {
      return;
    }

    console.log('Fetching: ', url);
    setLoading(true);
    const response = await fetch(url);
    const responseJson = await response.json();

    setItems((existingItems) => {
      return [...existingItems, ...responseJson.results];
    });
    setNextPage(responseJson.info.next);
    setLoading(false);
  };

  const onRefresh = () => {
    if (loading) {
      return;
    }
    setItems([]);
    // setNextPage(initialPage);
    fetchPage(initialPage);
  };

  useEffect(() => {
    fetchPage(initialPage);
  }, []);

  const renderItem = useCallback(
    ({ item }) => <CharacterListItem character={item} />,
    []
  );

  if (items.length === 0) {
    // this is only to make the debug prop on FlatList Work
    return null;
  }
  return (
    <View style={{flex:1}}>
      <FlatList
      data={items}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 10 }}
      onEndReached={() => fetchPage(nextPage)}
      onEndReachedThreshold={5}
      ListFooterComponent={() => loading && <ActivityIndicator />}
      refreshing={loading}
      onRefresh={onRefresh}
    />
    </View>
  )
}

export default BlogFeed


