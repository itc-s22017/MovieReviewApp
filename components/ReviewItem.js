import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Button, TouchableHighlight } from "react-native";
import { deleteDoc, getFirestore, doc, getDoc, runTransaction, onSnapshot } from "firebase/firestore"
import Stars from "./Stars";
import { UserContext } from "../src/context/UserContext";
import { cancelAlert } from "../src/utils/showAlert";
import { AntDesign } from '@expo/vector-icons';
const db = getFirestore();

const ReviewItem = ({ review, navigation }) => {
    const [isLiked, setIsLiked] = useState(null)
    const [likesCount, setLikesCount] = useState(0)
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

    const { user } = useContext(UserContext);

    const moveToUserDetailScreen = () => {
        navigation.navigate("UserDetailScreen", { uid: review.userInfo.uid })
    }

    const handleDelete = () => {
        cancelAlert("確認", "本当に削除しますか？", async () => {
            await deleteDoc(doc(db, "reviews", review.id));
        })
    }

    const handleLike = async () => {
        const userRef = doc(db, 'users', review.userInfo.uid);
        const reviewRef = doc(db, 'reviews', review.id);

        try {
            await runTransaction(db, async (transaction) => {
                const userDoc = await getDoc(userRef);
                const reviewDoc = await getDoc(reviewRef);

                if (!isLiked) {
                    const newLikes = userDoc.data().totalReviewLikes + 1;
                    transaction.update(userRef, { totalReviewLikes: newLikes });

                    const reviewLikes = reviewDoc.data().Likes || [];
                    reviewLikes.push(user.uid);
                    transaction.update(reviewRef, { Likes: reviewLikes });
                    setIsLiked(true);
                    setLikesCount(prev => prev + 1)
                } else {
                    const newLikes = userDoc.data().totalReviewLikes - 1;
                    transaction.update(userRef, { totalReviewLikes: newLikes });

                    const reviewLikes = reviewDoc.data().Likes || [];
                    const updatedLikes = reviewLikes.filter(uid => uid !== user.uid);
                    transaction.update(reviewRef, { Likes: updatedLikes });
                    setIsLiked(false);
                    setLikesCount(prev => prev - 1)
                }
            });
        } catch (error) {
            console.error('トランザクションエラー:', error);
        }
    };

    const fetchIsLiked = async () => {
        const reviewRef = doc(db, 'reviews', review.id);
        const unsubscribe = onSnapshot(reviewRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                const isLiked = data.Likes.includes(user.uid);
                setIsLiked(isLiked);
                setLikesCount(data.Likes.length);
            } else {
                // 'Likes'が配列でないか存在しない場合の処理
                setIsLiked(false);
            }
        });

        // 不要になった場合にリスナーを解除する
        return () => unsubscribe();
    }

    useEffect(() => {
        fetchIsLiked();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Stars score={review.Star} starSize={16} textSize={12} />
                        {user.uid === review.userInfo.uid ?
                            <Button title="削除" accessibilityLabel="Sure?" onPress={handleDelete} /> : ''
                        }
                    </View>
                    <Text style={styles.reviewText}>{review.Content}</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.userInfoContainer}>
                    <TouchableHighlight onPress={() => moveToUserDetailScreen()}>
                        <Image source={userAvatarSource} style={styles.userAvatar} />
                    </TouchableHighlight>
                    <View style={styles.nameAndIcon}>
                        <Text style={styles.nameText}>{review.userInfo.displayName}</Text>
                    </View>
                </View>
                <Text style={styles.dateText}>{formatDate}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                {user.uid !== review.userInfo.uid ?
                    <AntDesign name={isLiked ? "heart" : "hearto"} size={16} color="white" onPress={handleLike} /> : ''
                }
                <Text style={{ color: 'white', marginLeft: 5 }}>{likesCount}人が参考になったと言っています。</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
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
        flex: 1,
        marginBottom: 12
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "flex-start",
        marginTop: 8,
    },
    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    nameAndIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
    },
    reviewText: {
        marginTop: 8,
        color: "white",
    },
    nameText: {
        color: 'white',
        fontSize: 14,
        marginRight: 8,
    },
    dateText: {
        color: 'white',
        fontSize: 12,
        marginTop: 12,
    },
});

export default ReviewItem