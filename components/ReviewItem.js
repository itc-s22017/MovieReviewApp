import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Stars from "./Stars"
const ReviewItem = ({ review }) => {
    const userAvatarSource = review.userInfo.photoURL
        ? { uri: review.userInfo.photoURL }
        : { uri: 'https://sp-ao.shortpixel.ai/client/q_lossless,ret_img,w_250/https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg' };

    const milli = review.Create_at.seconds * 1000;
    const date = new Date(milli);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const secondsFormatted = String(date.getSeconds()).padStart(2, '0');

    const formatDate = `${year}/${month}/${day} ${hours}:${minutes}:${secondsFormatted}`;

    useEffect(() => {
        console.log(review)
    }, [])
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
                    <View style={styles.dateAndName}>
                        <Text style={styles.nameText}>{review.userInfo.displayName}</Text>
                        <Text style={{ color: 'white', fontSize: 12 }}>{formatDate}</Text>
                    </View>
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
        color: 'white',
        fontSize: 14,
        marginRight: 110,
    },
    dateAndName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
export default ReviewItem