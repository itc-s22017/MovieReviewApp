import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import {
    View,
    TextInput,
    Text,
    KeyboardAvoidingView,
    Pressable,
    Alert
} from 'react-native';
import { AntDesign } from "@expo/vector-icons"
import { auth } from '../../firebase';
import { UserContext } from '../context/UserContext';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, promptAsync } = useContext(UserContext)

    const handleLogin = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            if (!user.user.emailVerified) {
                console.log('email ver');
                Alert.alert('Alert Title', 'My Alert Msg', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
                return;
            }
            console.log(user)
            setUser(user.user)
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
            <Pressable
                style={{
                    padding: 10,
                    backgroundColor: '#88cb7f',
                    borderRadius: 10,
                }}
                onPress={handleLogin}
            // disabled={!email || !password}
            >
                <Text style={{ color: 'white' }}>ログイン</Text>
            </Pressable>
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