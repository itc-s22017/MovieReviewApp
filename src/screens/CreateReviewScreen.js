import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'

const CreateReviewScreen = ({ route, navigation }) => {
    const { movie } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: movie.title
        })
    }, [movie])
    return (
        <View>
            <Text>{movie.title}</Text>
            <Text onPress={() => navigation.goBack()}>投稿</Text>
        </View>
    )
}

export default CreateReviewScreen