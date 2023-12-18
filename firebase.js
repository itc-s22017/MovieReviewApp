import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { initializeAuth, getReactNativePersistence, browserLocalPersistence, browserPopupRedirectResolver, browserSessionPersistence, indexedDBLocalPersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from "react-native";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyC5doNXoMierYztCxmrcJMM9VqKH57tkcU",
  authDomain: "movieapp-19fc6.firebaseapp.com",
  projectId: "movieapp-19fc6",
  storageBucket: "movieapp-19fc6.appspot.com",
  messagingSenderId: "981373992894",
  appId: "1:981373992894:web:e0da77826fdb760d1a83ef"
};

const app = initializeApp(firebaseConfig);
export let auth;

if (Platform.OS === 'ios' || Platform.OS === 'android') {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
} else {
    auth = initializeAuth(app, {
        persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence],
        popupRedirectResolver: browserPopupRedirectResolver,
    });
}

// export const auth = getAuth(app);