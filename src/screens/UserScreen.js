import React, { useContext, useEffect } from 'react'
import { View, Text,Pressable } from 'react-native'
import { UserContext } from '../context/UserContext'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export const UserScreen = () => {
  const { setUser,user } = useContext(UserContext)

  // useEffect(()=>{
  //   console.log(user)
  // },[])

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
      <Text>
        {user.displayName}
      </Text>
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
  )
}
