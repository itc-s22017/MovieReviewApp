import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Poster from "./Poster";

const MovieFlatList = (props) => {
  const url = props.url;
  const listName = props.listName;
  const navigation = props.navigation;

  const [Movies, setMovies] = useState([]);

  const moveToDetail = (item) => {
    navigation.navigate("MovieDetail", { movie: item })
  }


  useEffect(() => {
    async function getMovies() {
      try {
        const results = await axios.get(url);
        // 1件しか取ってこないとき
        if (results.data.results === undefined) {
          setMovies([results.data]);
          return
        }
        setMovies(results.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    getMovies();
  }, []);

  return (
    <View>
      <Text style={style.listName}>{listName}</Text>
      <FlatList
        data={Movies}
        keyExtractor={item => item.id}
        horizontal={true}
        flashScrollIndicators
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => moveToDetail(item)}>
            <View style={style.movieContainer}>
              <Poster posterPath={item.poster_path} imageWidth={300} imageHeight={200}></Poster>
              <Text numberOfLines={1} style={style.movieTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}>
      </FlatList>
    </View>
  );
}

const style = StyleSheet.create({
  listName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  movieContainer: {
    width: 130,
    marginRight: 10,
    marginBottom: 30
  },
  movieTitle: {
    color: '#ccc',
    fontSize: 14
  },
});


export default MovieFlatList;
