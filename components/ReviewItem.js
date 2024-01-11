import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { getAuth, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from "../firebase"
import moment from "moment";
import Stars from "./Stars"
const ReviewItem = ({ review }) => {
    

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View>
                    <Stars score={review.Star} starSize={16} textSize={12} />
                    <Text style={styles.reviewText}>{review.Content}</Text>
                    
                </View>
                <Text style={styles.nameText}>{review.name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 16,
    },
    leftContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    rightContainer: {},
    image: {
        width: 100,
        height: 100,
    },
    reviewText: {
        marginTop: 4,
        color: "#000",
    },
    nameText: {
        color: "#888",
        fontSize: 12,
    },
});

export default ReviewItem