import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore';
import {
    View,
    TextInput,
    Text,
    KeyboardAvoidingView,
    Pressable,
    TouchableOpacity
} from 'react-native';
import { AntDesign } from "@expo/vector-icons"
import { auth } from '../../firebase';
import { UserContext } from '../context/UserContext';
import { showAlert } from "../utils/showAlert"

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, promptAsync } = useContext(UserContext)

    const handleLogin = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            if (!user.user.emailVerified) {
                showAlert('認証を完了してください', 'メールを確認してください')
                return
            }
            try {
                const db = getFirestore();
                const userDocRef = doc(db, 'users', user.user.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (!userDocSnapshot.exists()) {
                    const Data = {
                        displayName: user.user.displayName,
                        email: user.user.email,
                        photoURL: user.user.photoURL,
                        uid: user.user.uid,
                        likes:[],
                        totalReviewLikes:0
                    };
                    await setDoc(userDocRef, Data);
                    setUser(user.user);
                    console.log('新しいユーザーがlogin');
                } else {
                    setUser(user.user);
                    console.log('既に存在するユーザーlogin');
                }
            } catch (error) {
                console.error('ログインエラー:', error);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}
        >
            <Text style={{ fontSize: 20, marginBottom: 20 }}>ログイン画面</Text>

            <Pressable
                style={{
                    backgroundColor: "#4285F4",
                    width: 250,
                    padding: 10,
                    borderRadius: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 15,
                }}
                onPress={() => promptAsync()}
            >
                <AntDesign name='google' size={30} color='white' />
                <Text style={{ fontWeight: "bold", color: 'white', fontSize: 17 }}>Sign In with Google</Text>
            </Pressable>
            <Text style={{ color: 'gray', fontSize: 18, padding: 12 }}>又は</Text>
            <View style={{ marginBottom: 20 }}>
                <TextInput
                    style={{
                        width: 250,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: 'gray',
                    }}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="メールアドレスを入力してください"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
                />
            </View>
            <View style={{ marginBottom: 20 }}>
                <TextInput
                    style={{
                        width: 250,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: 'gray',
                    }}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="パスワードを入力してください"
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
            </View>
            <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: '#88cb7f',
                    borderRadius: 10,
                }}
                onPress={handleLogin}
                activeOpacity={0.6}
                disabled={!email || !password}
            >
                <Text style={{ color: 'white' }}>ログイン</Text>
            </TouchableOpacity>
            <Pressable
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate('Register')}
            >
                <Text>ユーザ登録はこちら</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

