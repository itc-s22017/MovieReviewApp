import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Platform, ScrollView, StyleSheet, Text, TouchableHighlight, View,FlatList, Image } from 'react-native';
import { requests } from '../utils/request';

export default function MovieList() {
  const [nowPlaying,setNowPlaying] = useState({})
  const [commingSoon,setCommingSoon] = useState({})
  const [popular,setPopular] = useState({})
  const [topRated,setTopRated] = useState({})
  const [pickUp,setPickUp] = useState({})




  useEffect(() => {
    const getMovies = async () => {
      try {
        // Use Promise.all to execute multiple requests in parallel
        const [nowPlayingMovies, comingSoonMovies, popularMovies, topRatedMovies] = await Promise.all([
          axios.get(requests.NOW_PLAYING),
          axios.get(requests.COMMING_SOON),
          axios.get(requests.POPULARS),
          axios.get(requests.TOP_RATED)
        ]);
      
        // Set state after all requests are complete
        setNowPlaying(nowPlayingMovies.data.results);
        setCommingSoon(comingSoonMovies.data.results);
        setPopular(popularMovies.data.results);
        setTopRated(topRatedMovies.data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    const getPickUpMovie = async () => {
      try {
        const result = await axios.get(requests.NOW_PLAYING)
        const num = Math.floor(Math.random() * (result.data.results.length - 1) + 1)
        setPickUp(result.data.results[num])
      } catch (error) {
        
      }
    }
    getMovies()
    getPickUpMovie()
  },[])
 
  if (Platform.OS === 'ios') {
    console.log(`ios:${Platform.Version}`)
  }

  return (
    <>
    <ScrollView style={styles.container}>
      <View style={styles.pickupContainer}>
        <Image style={styles.pickupImage} source={{uri: `https://image.tmdb.org/t/p/w780${pickUp.poster_path}`}}></Image>
        <Text style={styles.pickupTitle}>{pickUp.title}</Text>
      </View>

      <Text style={styles.listName}>公開中の映画</Text>
      <FlatList
        data={nowPlaying}
        keyExtractor={item => item.id}
        horizontal={true}
        flashScrollIndicators
        renderItem={({ item }) => (
        <View style={styles.movieContainer}>
          <Image style={styles.movieImage} source={{uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`}}></Image>
          <Text numberOfLines={1} style={styles.movieTitle}>{item.title}</Text>
        </View>
        )}>
      </FlatList>

      <Text style={styles.listName}>公開予定の映画</Text>
      <FlatList
        data={commingSoon}
        keyExtractor={item => item.id}
        horizontal={true}
        flashScrollIndicators
        renderItem={({ item }) => (
        <View style={styles.movieContainer}>
          <Image style={styles.movieImage} source={{uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`}}></Image>
          <Text numberOfLines={1} style={styles.movieTitle}>{item.title}</Text>
        </View>
        )}>
      </FlatList>

      <Text style={styles.listName}>人気の映画</Text>
      <FlatList
        data={popular}
        keyExtractor={item => item.id}
        horizontal={true}
        flashScrollIndicators
        renderItem={({ item }) => (
        <View style={styles.movieContainer}>
          <Image style={styles.movieImage} source={{uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`}}></Image>
          <Text numberOfLines={1} style={styles.movieTitle}>{item.title}</Text>
        </View>
        )}>
      </FlatList>

      <Text style={styles.listName}>高評価の映画</Text>
      <FlatList
        data={topRated}
        keyExtractor={item => item.id}
        horizontal={true}
        flashScrollIndicators
        renderItem={({ item }) => (
        <View style={styles.movieContainer}>
          <Image style={styles.movieImage} source={{uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`}}></Image>
          <Text numberOfLines={1} style={styles.movieTitle}>{item.title}</Text>
        </View>
        )}>
      </FlatList>
      
      <StatusBar style="auto" />
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
  pickupContainer: {
    width: '100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'

    },
  pickupImage: {
    backgroundColor: 'gray',
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
  movieContainer: {
    width:130,
    marginBottom:30
  },
  movieImage: {
    height: 200,
    marginRight: 10,
    resizeMode:'contain'
    },
  movieTitle: {
    color: '#ccc', 
    fontSize: 14
}
});

