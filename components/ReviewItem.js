import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { getAuth, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from "../firebase"
import moment from "moment";
import Stars from "./Stars"
const ReviewItem = ({ review }) => {
    const userAvatarSource = review.userInfo.photoURL
        ? { uri: review.userInfo.photoURL }
        : require("../assets/icon.png");

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View>
                    <Stars score={review.Star} starSize={16} textSize={12} />
                    <Text style={styles.reviewText}>{review.Content}</Text>
                </View>
                <View style={styles.userInfoContainer}>
                    <Image
                        source={userAvatarSource}
                        style={styles.userAvatar}
                    />
                    <Text style={styles.nameText}>{review.userInfo.displayName}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 16,
    },
    leftContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    reviewText: {
        marginTop: 8,
        color: "white",
    },
    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },
    userAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
    },
    nameText: {
        color: "white",
        fontSize: 14,
    },
});
export default ReviewItem