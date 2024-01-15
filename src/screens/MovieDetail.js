import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Poster from "../../components/Poster";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import ReviewItem from "../../components/ReviewItem";

export default function MovieDetail({ route, navigation }) {
    const { movie } = route.params;
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            title: movie.title
        })
    }, [movie])

    useEffect(() => {
        const getReviewsById = async () => {
            try {
                const db = getFirestore();
                const reviewsRef = collection(db, 'reviews');
                const q = query(reviewsRef, where('MovieId', '==', movie.id));
                const querySnapshot = await getDocs(q);

                // setReviews(querySnapshot.docs.map(doc => doc.data()));

                const reviewsData = await Promise.all(querySnapshot.docs.map(async (dooc) => {
                    const review = dooc.data();
    
                    const userDoc = await getDoc(doc(db, 'users', review.UserId));
                    if (userDoc.exists()) {
                        const userInfo = userDoc.data();
                        return { ...review, userInfo };
                    } else {
                        console.log('User not found');
                        return review;
                    }
                }));
                setReviews(reviewsData)

            } catch (error) {
                console.error('Error getting reviews:', error);
            }
        }
        getReviewsById()
    }, [])
    return (
        <>
            <ScrollView style={style.container}>
                <Poster posterPath={movie.poster_path} imageWidth={780} imageHeight={480}></Poster>
                <View>
                    <Text style={style.title}>{movie.title}</Text>
                    <Text style={style.movieReleaseDate}>{movie.release_date}</Text>
                    <Text style={style.overview}>{movie.overview}</Text>
                </View>
                {reviews.map((review, index) => (
                    <ReviewItem key={index} review={review} />
                ))}
            </ScrollView>
            <View style={style.container2}>
                <TouchableOpacity style={style.button} onPress={() => { navigation.navigate('CreateReviewScreen', { movie }) }}>
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
        backgroundColor: 'blue',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        opacity:0.4
    },
});

