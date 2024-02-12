import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RankingItem } from '../../components/RankingItem';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
const db = getFirestore();


const Ranking = ({ navigation }) => {
    const [topUsers, setTopUsers] = useState([]);

    const fetchTop10 = async () => {
        try {
            const q = query(collection(db, 'users'), orderBy('totalReviewLikes', 'desc'), limit(10));
            const querySnapshot = await getDocs(q);

            const usersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTopUsers(usersData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTop10();
    }, [])

    return (
        <View style={{ padding: 10 }}>
            {topUsers.map((user, index) => (
                <RankingItem rank={index + 1} name={user.displayName} score={user.totalReviewLikes} key={user.id} uid={user.uid} navigation={navigation} />
            ))}
        </View>
    );
};


export default Ranking