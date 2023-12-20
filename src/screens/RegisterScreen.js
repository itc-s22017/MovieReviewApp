import React, { useContext, useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth"
import {
    View,
    TextInput,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { showAlert } from '../utils/showAlert';
const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const { setUser } = useContext(UserContext)


    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            await EmailVerification(user);
        } catch (error) {
            console.log(`handleRegisterError:${error}`)
        }
    };

    const EmailVerification = async (user) => {
        try {
            await sendEmailVerification(user);
            showAlert('認証を完了してください','メールを送信しました')
            navigation.goBack()
        } catch (error) {
            console.error("確認メールの送信エラー:", error.message);
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
            <Text style={{ fontSize: 20, marginBottom: 20 }}>ユーザ登録画面</Text>
            <View style={{ marginBottom: 20 }}>
                <TextInput
                    style={{
                        width: 250,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: 'gray',
                    }}
                    onChangeText={setName}
                    value={name}
                    placeholder="名前（表示名）"
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
            <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: '#88cb7f',
                    borderRadius: 10,
                }}
                onPress={handleRegister}
                disabled={!email || !password}
            >
                <Text style={{ color: 'white' }}>登録する</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen