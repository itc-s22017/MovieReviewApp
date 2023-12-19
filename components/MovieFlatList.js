import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import axios from "axios";
import { useState, useEffect } from "react";
import Poster from "./Poster";

export default function MovieFlatList(props) {
    const url = props.url;
    const listName = props.listName;
    const navigation = props.navigation;

  const [Movies, setMovies] = useState({});

  useEffect(() => {
    async function getMovies() {
      try{
        const results = await axios.get(url);
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
        <TouchableOpacity onPress={() => navigation.navigate("MovieDetail", {movie: item})}>
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

const style = StyleSheet.create ({
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

