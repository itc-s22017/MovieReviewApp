import { Text, View, ScrollView, StyleSheet, Image,} from "react-native";
import  Ionicons  from '@expo/vector-icons/Ionicons';
import Star from "react-native-stars"

export default function MovieDetail(props) {
    const {movie} = props.route.params;
    return (
        <ScrollView style={style.container}>
            <Image style={style.movieImage} resizeMode="contain" source={{uri: `https://image.tmdb.org/t/p/w780${movie.poster_path}`}}></Image>
            <View>
                <Text style={style.title}>{movie.title}</Text>
                <View style={style.vote}>
                    <Star
                        default={(movie.vote_average/2)}
                        count={5}
                        half={true}
                        fullStar={<Ionicons name="star-sharp" style={style.star} />}
                        emptyStar={<Ionicons name="star-outline" style={style.star} />}
                        halfStar={<Ionicons name="star-half-sharp" style={style.star} />}
                    ></Star>
                    <Text style={style.voteCount}>{movie.vote_count}</Text>
                </View>
                <Text style={style.movieReleaseDate}>{movie.release_date}</Text>
                <Text style={style.overview}>{movie.overview}</Text>
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202328'
    },
    textBox: {
        paddingHorizontal:30,
        paddingVertical: 5
    },
    title: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold'
    },
    movieReleaseDate: {
        color: '#ccc',
        marginBottom: 10
    },
    overview: {
        color: '#fff',
        fontSize: 18
    },
    movieImage: {
        height: 480,
        // resizeMode: 'contain'
    },
    vote: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    voteCount: {
        color: '#ccc',
        marginLeft: 3
    },
    star: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
    }
});