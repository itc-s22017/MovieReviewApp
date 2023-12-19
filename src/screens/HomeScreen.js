import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { UserContext } from '../context/UserContext';

const HomeScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext)


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
    <View>
      <Text>ホーム画面</Text>
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
    </View>
  );
};

export default HomeScreen;