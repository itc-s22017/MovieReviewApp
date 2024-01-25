import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl } from "react-native"
import { requests } from "../../request";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import MovieFlatList from "../../components/MovieFlatList";
import { useScrollToTop } from '@react-navigation/native';


export default function MovieList({ navigation }) {
  const [picupMovies, setPicupMovies] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const ref = useRef(null)

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const result = await axios.get(requests.NOW_PLAYING);
      const number = Math.floor(Math.random() * (result.data.results.length - 1) + 1);
      setPicupMovies(result.data.results[number]);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const getPicUpMovies = async () => {
    try {
      const result = await axios.get(requests.NOW_PLAYING);
      const number = Math.floor(Math.random() * (result.data.results.length - 1) + 1);
      setPicupMovies(result.data.results[number]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPicUpMovies();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      console.log(e)
      useScrollToTop(ref);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={style.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} ref={ref} />}>
      <TouchableOpacity onPress={() => navigation.navigate("MovieDetail", { movie: picupMovies })}>
        <View style={style.pickupContainer}>
          <Image style={style.pickupImage} resizeMode="contain" source={{ uri: `https://image.tmdb.org/t/p/w780${picupMovies.poster_path}` }}></Image>
          <Text style={style.pickupTitle}>{picupMovies.title}</Text>
        </View>
      </TouchableOpacity>
      <MovieFlatList url={requests.NOW_PLAYING} listName={'公開中の映画'} navigation={navigation}></MovieFlatList>
      <MovieFlatList url={requests.COMMING_SOON} listName={'公開予定の映画'} navigation={navigation}></MovieFlatList>
      <MovieFlatList url={requests.POPULARS} listName={'人気の映画'} navigation={navigation}></MovieFlatList>
      <MovieFlatList url={requests.TOP_RATED} listName={'高評価の映画'} navigation={navigation}></MovieFlatList>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202328',
  },
  pickupContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupImage: {
    height: 350,
    width: '45%'
  },
  pickupTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    width: '45%',
    marginLeft: 5
  },
  listName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});

