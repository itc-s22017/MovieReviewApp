import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { initializeAuth, getReactNativePersistence, browserLocalPersistence, browserPopupRedirectResolver, browserSessionPersistence, indexedDBLocalPersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from "react-native";


const firebaseConfig = {
    apiKey: "AIzaSyD2TTp3uiJZyxLnCcLNy9wUIBWnhnAaYus",
    authDomain: "test-ad6ee.firebaseapp.com",
    projectId: "test-ad6ee",
    storageBucket: "test-ad6ee.appspot.com",
    messagingSenderId: "822248123830",
    appId: "1:822248123830:web:a26c8be4144bd095a96517",
    measurementId: "G-P6CXRNHFQB"
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