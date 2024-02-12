import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet, Image, FlatList } from 'react-native'
import { UserContext } from '../context/UserContext'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { getFirestore, doc, onSnapshot, where, query, collection, getDocs } from 'firebase/firestore';
import { generateSearchByIdUrl } from "../../request";
import MovieFlatList from '../../components/MovieFlatList';

const db = getFirestore()

export const UserScreen = ({ navigation, route }) => {
  const { setUser, user } = useContext(UserContext);
  const [testid, setTestId] = useState([])
  const otherUserId = route.params?.uid;
  const [otherUser, setOtherUser] = useState({});
  const currentUserId = otherUserId ? otherUser : user;
  const userAvatarSource = currentUserId.photoURL
    ? { uri: currentUserId.photoURL }
    : { uri: 'https://sp-ao.shortpixel.ai/client/q_lossless,ret_img,w_250/https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg' };
  const [commentedMovieId, setCommentedMovieId] = useState([])

  const moveToRankingScreen = () => {
    navigation.navigate("Ranking")
  }

  useEffect(() => {
    const test = async () => {
      try {
        const unsubscribeUser = onSnapshot(doc(db, 'users', otherUserId || user.uid), (snapshot) => {
          const currentLikes = snapshot.data().likes || [];
          setTestId(currentLikes);
          if (otherUserId) {
            setOtherUser(snapshot.data());
          }
        });

        const unsubscribeReviews = onSnapshot(
          query(
            collection(db, 'reviews'),
            where('UserId', '==', otherUserId || user.uid)
          ),
          (querySnapshot) => {
            const reviews = querySnapshot.docs.map(doc => doc.data().MovieId);
            const commentedIds = Array.from(new Set(reviews));
            setCommentedMovieId(commentedIds);
          }
        );

        return () => {
          unsubscribeUser();
          unsubscribeReviews();
        };
      } catch (e) {
        console.log(e);
      }
    }
    test()
  }, [user, otherUserId]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('logout');
        setUser(null)
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={userAvatarSource} style={styles.userAvatar} />
          <Text style={styles.nameText}>{currentUserId.displayName}</Text>
        </View>
        <Pressable onPress={moveToRankingScreen}>
          <Text style={styles.ranking}>ランキングを見る</Text>
        </Pressable>
      </View>
      {!otherUserId &&
        <Pressable Pressable
          onPress={handleLogout}
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: '#88cb7f',
            borderRadius: 10,
            width: 100,
          }}
        >
          <Text style={{ color: 'white' }}>ログアウト</Text>
        </Pressable>
      }

      <Text style={styles.likesTitle}>いいねした作品</Text>
      <FlatList
        data={testid}
        horizontal
        renderItem={({ item }) => <MovieFlatList url={generateSearchByIdUrl(item)} listName={''} navigation={navigation} key={item}></MovieFlatList>}
      />

      <Text style={styles.likesTitle}>コメントした作品</Text>
      <FlatList
        data={commentedMovieId}
        horizontal
        renderItem={({ item }) => <MovieFlatList url={generateSearchByIdUrl(item)} listName={''} navigation={navigation} key={item}></MovieFlatList>}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 8,
  },
  likesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  nameText: {
    fontSize: 20
  },
  ranking: {
    color: 'blue',
    textDecorationStyle: 'solid',
    textDecorationColor: 'blue',
    textDecorationLine: 'underline'
  }
});