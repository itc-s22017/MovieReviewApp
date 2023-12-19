import { Alert } from 'react-native';

export const showAlert = (title, message, buttonsText = 'OK',LogText = 'OK PRESSED') => {
    Alert.alert(title, message, [
        { text: buttonsText, onPress: () => console.log(LogText) },
    ]);
};