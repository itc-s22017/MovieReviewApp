import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Pressable
} from 'react-native'
import { UserContext } from '../context/UserContext';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';


const CreateReviewScreen = ({ route, navigation }) => {
    const { setUser, user } = useContext(UserContext)
    const { movie } = route.params;
    const [isEnabled, setIsEnabled] = useState(false);
    const [text, setText] = useState('');
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleInputChange = (inputText) => {
        setText(inputText);
    };

    const createReview = async () => {
        try {
            const firestore = getFirestore();
            await addDoc(collection(firestore, 'reviews'), {
                UserId: user.uid,
                MovieId: movie.id,
                Content: text,
                Star: 5,
                Create_at: Timestamp.now(),
                Netabare: isEnabled,
                name: user.displayName,
            });
            navigation.goBack();
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }

    useEffect(() => {
        navigation.setOptions({
            title: movie.title
        })
    }, [movie])
    return (
        <KeyboardAvoidingView style={style.container} behavior="padding" enabled>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={style.container}>
                <Text style={style.title}>タイトル:{movie.title}</Text>
                <View style={style.stars}>
                    <Text style={style.textSize}>満足度</Text>
                    <Text style={style.textSize}>★★★★★</Text>
                </View>
                <View style={style.stars}>
                    <Text style={style.textSize}>ネタバレ</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={style.switch}
                    />
                </View>
                <View style={style.reviewContainer}>
                    <Text style={style.reviewText}>レビュー本文</Text>
                    <TextInput
                        style={style.textInput}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="感想を記入してください"
                        onChangeText={handleInputChange}
                        value={text}
                    />
                </View>
                <Pressable style={style.button} onPress={() => { }}>
                    <Text style={style.text} onPress={createReview}>投稿する</Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const style = StyleSheet.create({
    textSize: {
        fontWeight: 'bold',
        fontSize: 29
    },
    container: {
        flex: 1,
        // alignItems: 'center',
        margin: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
    },
    stars: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        marginTop: 30,
    },
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    reviewContainer: {
        marginTop: 70,
        width: '70%',
        alignItems: 'center',
    },
    reviewText: {
        fontSize: 26,
    },
    textInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 16,
        marginTop: 20,
        padding: 8,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
        marginTop: 15
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})

export default CreateReviewScreen