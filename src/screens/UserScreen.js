import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Pressable, ScrollView,StyleSheet } from 'react-native'
import { UserContext } from '../context/UserContext'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { generateSearchByIdUrl } from "../../request";
import MovieFlatList from '../../components/MovieFlatList';

const db = getFirestore()

export const UserScreen = ({ navigation }) => {
  const { setUser, user } = useContext(UserContext);
  const [testid, setTestId] = useState([])

  useEffect(() => {
    const test = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const unsubscribe = onSnapshot(userRef, (snapshot) => {
          const currentLikes = snapshot.data().likes || [];
          setTestId(currentLikes);
        });
        return () => unsubscribe();
      } catch (e) {
        console.log(e)
      }
    }
    test()
  }, [user])

  const likesMovie = testid.map(v => (
    <MovieFlatList url={generateSearchByIdUrl(v)} listName={''} navigation={navigation} key={v}></MovieFlatList>
  ))

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
      <Text>{user.displayName}</Text>
      <Pressable
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
      <Text style={styles.likesTitle}>いいねした作品</Text>
      <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}>
        {likesMovie}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  likesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:15
  },
  scrollView: {
    marginTop:-20
  },
});