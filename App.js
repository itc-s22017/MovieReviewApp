import React, { useEffect, useState } from 'react';
import { AppNavigator } from "./src/navigation/AppNavigator";
import { UserContext } from "./src/context/UserContext";
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from 'expo-web-browser'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential
} from "firebase/auth";
import { auth } from "./firebase";
import { Platform } from "react-native";
import { WEB_CLIENTID, IOS_CLIENTID, ANDROID_CLIENTID } from '@env'
import { getFirestore, getDoc, doc,setDoc } from 'firebase/firestore';


WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = useState(null)
  const isWeb = Platform.OS === 'web';

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: WEB_CLIENTID,
    iosClientId: IOS_CLIENTID,
    androidClientId: ANDROID_CLIENTID,
    responseType: isWeb ? 'id_token' : 'code',
  })

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential)
    }
  }, [response])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (userData) => {
      if (userData && userData.emailVerified) {
        try {
          const db = getFirestore();
          const userDocRef = doc(db, 'users', userData.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (!userDocSnapshot.exists()) {
            const Data = {
              displayName: userData.displayName,
              email: userData.email,
              photoURL:userData.photoURL,
              uid:userData.uid,
            };

            await setDoc(userDocRef, Data);
            setUser(userData);
            console.log('新しいユーザーが登録されました', userData);
          } else {
            setUser(userData);
            console.log('既に存在するユーザーです', userData);
          }
        } catch (error) {
          console.error('ログインエラー:', error);
        }
      }
    });

    // useEffectのクリーンアップ関数を追加
    return () => unsub();
  }, []);



  return (
    <UserContext.Provider value={{ user, setUser, promptAsync }} >
      <AppNavigator />
    </UserContext.Provider>
  )
};


