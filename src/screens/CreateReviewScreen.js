import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

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
        </View>
    )
}

export default CreateReviewScreen