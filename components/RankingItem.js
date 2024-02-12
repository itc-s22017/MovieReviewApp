import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export const RankingItem = ({ rank, name, score,navigation,uid }) => {
    const moveToUserScreen = () => {
        navigation.navigate("UserDetailScreen",{ uid })
    }
    
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.rank}>{rank}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.name} onPress={moveToUserScreen}>{name}</Text>
                <Text style={styles.score}>合計いいね数: {score}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        justifyContent:'center'
    },
    rank: {
        width: 30,
        marginRight: 10,
        fontWeight: 'bold',
    },
    infoContainer: {
        flexDirection: 'column',
    },
    name: {
        fontSize: 16,
        marginBottom: 5,
    },
    score: {
        color: 'gray',
    },
}); 
