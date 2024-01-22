import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const SelectScore = ({ score, onChangeScore}) => {
    const stars = [1, 2, 3, 4, 5].map((starCount) => (
        <TouchableOpacity
            onPress={() => onChangeScore(starCount)}
            key={starCount.toString()}
        >
            <FontAwesome
                style={styles.star}
                name={score >= starCount ? "star" : "star-o"}
            />
        </TouchableOpacity>
    ));

    return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    star: {
        marginRight: 8,
        fontSize: 24,
        color: "#900",
    },
    scoreText: {
        fontSize: 14,
        color: "#000",
        fontWeight: "bold",
    },
});


export default SelectScore