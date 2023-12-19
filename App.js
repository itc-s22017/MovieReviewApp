import React, { useEffect, useState } from 'react';
import { AppNavigator } from "./src/navigation/AppNavigator";
import { UserContext } from "./src/context/UserContext";
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from 'expo-web-browser'
import {WEB_CLIENTID,IOS_CLIENTID,ANDROID_CLIENTID} from '@env'

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential
} from "firebase/auth";
import { auth } from "./firebase";
import { Platform } from "react-native";

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
      if (userData) {
        console.log(JSON.stringify(userData, null, 2))
        setUser(userData)
      } else {
        console.log('else')
      }
    })

    return () => unsub();
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, promptAsync }} >
      <AppNavigator />
    </UserContext.Provider>
  )
};


