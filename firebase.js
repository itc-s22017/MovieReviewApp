import { initializeApp } from "firebase/app"
import { initializeAuth, getReactNativePersistence, browserLocalPersistence, browserPopupRedirectResolver, browserSessionPersistence, indexedDBLocalPersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from "react-native";
import {
    API_KEY_FIREBASE,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} from '@env'


const firebaseConfig = {
    apiKey: API_KEY_FIREBASE,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
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