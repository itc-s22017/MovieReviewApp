import { View, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Text } from "react-native"
import { useState } from "react"
import  Ionicons  from '@expo/vector-icons/Ionicons';
import { requests } from "../request";
import axios from "axios"; 
import Star from 'react-native-stars'

export default function SearchMovie({navigation}) {
    const [text, onChangeText] = useState("");
    const [movies, setSearchMovies] = useState({});
    const numColumns = 3;
    
    async function searchMovies() {
        try {
            const results = await axios.get(requests.SEARCH + text);
            setSearchMovies(results.data.results);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <View style={style.container}>
            <View style={style.searchForm}>
            <Ionicons name="search" size={30} color="#ccc" />
            <TextInput
                style={style.imput}
                onChangeText={text => onChangeText(text)}
                value={text}
                placeholder="映画名"
                placeholderTextColor={'#ccc'}
                keyboardAppearance="dark"
                borderBottomWidth='1'
                autoFocus={true}
                onSubmitEditing={() => searchMovies()}
            />
            </View>
            <FlatList
                data={movies}
                keyExtractor={item => item.id}
                numColumns={numColumns}
                flashScrollIndicators
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate("MovieDetail", {movie: item})}>
                    <View style={style.movieContainer}>
                    <Image style={style.movieImage} resizeMode="contain" source={{uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`}}></Image>
                    <Text numberOfLines={1} style={style.movieTitle}>{item.title}</Text>
                    <View style={style.vote}>
                        <Star
                            default={(item.vote_average/2)}
                            count={5}
                            half={true}
                            fullStar={<Ionicons name="star-sharp" style={style.star} />}
                            emptyStar={<Ionicons name="star-outline" style={style.star} />}
                            halfStar={<Ionicons name="star-half-sharp" style={style.star} />}
                        />    
                    <Text style={style.votaCount}>{item.vote_count}</Text>
                    </View>
                    <Text style={style.movieReleaseDate}>{item.release_date}</Text>
                </View>
                </TouchableOpacity>
                )}>
            </FlatList>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202328',
        alignItems: 'center'
    },
    searchForm: {
        flexDirection: 'row',
        marginTop: 10
    },
    imput: {
        width: '45%',
        height: 30,
        fontSize: 18,
        color: '#ccc',
        marginLeft: 5,
        padding: 5,
        borderColor: 'gray'
    },
    movieContainer: {
        width: 110,
        marginHorizontal: 5
    },
    movieTitle: {
        color: '#ccc',
        fontSize: 14
    },
    movieReleaseDate: {
        color: '#ccc',
        marginBottom: 10
    },
    movieImage: {
        height: 180,
        marginRight: 10,
        // resizeMode: 'center'
    },
    vota: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    votaCount: {
        color: '#ccc',
        marginLeft: 3
    },
    star: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2
    }
})