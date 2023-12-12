import React from 'react';
import { View, Text,TouchableOpacity, Pressable } from 'react-native';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const HomeScreen = ({ navigation }) => {

    const handleLogout = () => {
        signOut(auth)
          .then(() => {
            console.log('logout');
          })
          .catch((error) => {
            console.log(error.message);
          });
      };  return (
    <View>
      <Text onPress={() => navigation.navigate("Register")}>ホーム画面</Text>
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