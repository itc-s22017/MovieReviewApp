import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Poster from "../../components/Poster";
import { AntDesign } from '@expo/vector-icons';


export default function MovieDetail(props) {
    const { movie } = props.route.params;
    return (
        <>
            <ScrollView style={style.container}>
                <Poster posterPath={movie.poster_path} imageWidth={780} imageHeight={480}></Poster>
                <View>
                    <Text style={style.title}>{movie.title}</Text>
                    <Text style={style.movieReleaseDate}>{movie.release_date}</Text>
                    <Text style={style.overview}>{movie.overview}</Text>
                </View>
            </ScrollView>
            <View style={style.container2}>
                <TouchableOpacity style={style.button}>
                    <AntDesign name="pluscircleo" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202328'
    },
    textBox: {
        paddingHorizontal: 30,
        paddingVertical: 5
    },
    title: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        padding: 10
    },
    movieReleaseDate: {
        color: '#ccc',
        marginBottom: 10,
        paddingLeft: 10
    },
    overview: {
        color: '#fff',
        fontSize: 18,
        padding: 10,
        textAlign: 'justify'
    },
    container2: {
        position: 'absolute',
        right: 16,
        bottom: 10,
    },
    button: {
        backgroundColor:'blue',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

