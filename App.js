import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = useState(null)
  const isWeb = Platform.OS === 'web';

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '981373992894-helo4ve3c7t9hmr1shrh1eej1cg6rqqq.apps.googleusercontent.com',
    iosClientId: '939278286178-c4rkl9cv0f2lfpuodbefov4pegqouk3t.apps.googleusercontent.com',
    androidClientId: '939278286178-6id6vu4oe59qn7iarkmp9n71j8fuc93n.apps.googleusercontent.com',
    responseType: isWeb ? 'id_token' : 'code',
    // clientSecret:'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'
    // expoClientId:'939278286178-5vasc08jp97a4lu1695udof8023mro67.apps.googleusercontent.com',
    // clientSecret:'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'
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

