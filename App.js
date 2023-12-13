import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, ScrollView, FlatList, Image } from "react-native"
import {requests} from "./request"
import axios from "axios";
import { useState, useEffect } from "react";

// const Stack = createNativeStackNavigator()
export default function App() {
  const [nowPlaying, setNowPlaying] = useState({});
  const [commingSoon, setcommingSoon] = useState({});
  const [populars, setPopulars] = useState({});
  const [topRated, setTopRated] = useState({});
  const [picupMovies, setPicupMovies] = useState({});




  useEffect(() => {
    async function getMovies() {
      try{
        const nowPlayingMovies = await axios.get(requests.NOW_PLAYING);
        setNowPlaying(nowPlayingMovies.data.results);

        const commingSoonMovies = await axios.get(requests.COMMING_SOON);
        setcommingSoon(commingSoonMovies.data.results);

        const popularsMovies = await axios.get(requests.POPULARS);
        setPopulars(popularsMovies.data.results);

        const topRatedMovies = await axios.get(requests.TOP_RATED);
        setTopRated(topRatedMovies.data.results);

      } catch (error) {
        console.log(error);
      }
    }

    async function getPicUpMovies() {
      try {
        const result = await axios.get(requests.NOW_PLAYING);
        const number = Math.floor(Math.random() * (result.data.results.length - 1) + 1);
        setPicupMovies(result.data.results[number]);
      } catch(error) {
        console.log(error)
      }
    }
    getMovies();
    getPicUpMovies();
  }, []);
  return (
    <ScrollView style={style.container}>
      <View style={style.pickupContainer}>
        <Image style={style.pickupImage} source={{uri:`https://image.tmdb.org/t/p/w780${picupMovies.poster_path}`}}></Image>
        <Text style={style.pickupTitle}>{picupMovies.title}</Text>
      </View>

      <Text style={style.listName}>公開中の映画</Text>

      <FlatList
        data={nowPlaying}
        keyExtractor={item => item.id}
        horizontal={true}
        flashScrollIndicators
        renderItem={({ item }) => (
        <View style={style.movieContainer}>
          <Image style={style.movieImage} resizeMode="contain" source={{uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`}}></Image>
          <Text numberOfLines={1} style={style.movieTitle}>{item.title}</Text>
        </View>
        )}>
      </FlatList>

      

      {/* <View style={{backgroundColor: 'blue', width: '100%', flexDirection: 'row'}}>
        <View>
          <View style={style.movieImage}></View>
          <Text style={style.movieTitle}>映画のタイトル</Text>
        </View>
        <View>
          <View style={style.movieImage}></View>
          <Text style={style.movieTitle}>映画のタイトル</Text>
        </View>
        <View>
          <View style={style.movieImage}></View>
          <Text style={style.movieTitle}>映画のタイトル</Text>
        </View>
      </View> */}

      <Text style={style.listName}>公開予定の映画</Text>

      <FlatList
        data={commingSoon}
        keyExtractor={item => item.id}
        horizontal={true}
        flashScrollIndicators
        renderItem={({ item }) => (
        <View style={style.movieContainer}>
          <Image style={style.movieImage} resizeMode="contain" source={{uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`}}></Image>
          <Text numberOfLines={1} style={style.movieTitle}>{item.title}</Text>
        </View>
        )}>
      </FlatList>

      {/* <View style={{backgroundColor: 'blue', width: '100%', flexDirection: 'row'}}>
        <View>
          <View style={style.movieImage}></View>
          <Text style={style.movieTitle}>映画のタイトル</Text>
        </View>
        <View>
          <View style={style.movieImage}></View>
          <Text style={style.movieTitle}>映画のタイトル</Text>
        </View>
        <View>
          <View style={style.movieImage}></View>
          <Text style={style.movieTitle}>映画のタイトル</Text>
        </View>
      </View> */}

      <Text style={style.listName}>人気の映画</Text>

      <FlatList
        data={populars}
        keyExtractor={item => item.id}
        horizontal={true}
        flashScrollIndicators
        renderItem={({ item }) => (
        <View style={style.movieContainer}>
          <Image style={style.movieImage} resizeMode="contain" source={{uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`}}></Image>
          <Text numberOfLines={1} style={style.movieTitle}>{item.title}</Text>
        </View>
        )}>
      </FlatList>

      {/* <View style={{backgroundColor: 'blue', width: '100%', flexDirection: 'row'}}>
        <View>
          <View style={style.movieImage}></View>
          <Text style={style.movieTitle}>映画のタイトル</Text>
        </View>
        <View>
          <View style={style.movieImage}></View>
          <Text style={style.movieTitle}>映画のタイトル</Text>
        </View>
        <View>
          <View style={style.movieImage}></View>
          <Text style={style.movieTitle}>映画のタイトル</Text>
        </View>
      </View> */}

      <Text style={style.listName}>高評価の映画</Text>

      <FlatList
        data={topRated}
        keyExtractor={item => item.id}
        horizontal={true}
        flashScrollIndicators
        renderItem={({ item }) => (
        <View style={style.movieContainer}>
          <Image style={style.movieImage} resizeMode="contain" source={{uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`}}></Image>
          <Text numberOfLines={1} style={style.movieTitle}>{item.title}</Text>
        </View>
        )}>
      </FlatList>

      {/* <View style={{backgroundColor: 'blue', width: '100%', flexDirection: 'row'}}>
        <View>
          <View style={style.movieImage}></View>
          <Text style={style.movieTitle}>映画のタイトル</Text>
        </View>
        <View>
          <View style={style.movieImage}></View>
          <Text style={style.movieTitle}>映画のタイトル</Text>
        </View>
        <View>
          <View style={style.movieImage}></View>
          <Text style={style.movieTitle}>映画のタイトル</Text>
        </View>
      </View> */}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const style = StyleSheet.create ({
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
      width: 130,
      marginBottom: 30
    },
    movieImage: {
    height: 200,
    marginRight: 10,
    // resizeMode: 'contain'
    },
    movieTitle: {
    color: '#ccc', 
    fontSize: 14
},
});

