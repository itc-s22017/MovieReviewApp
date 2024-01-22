import { Alert } from 'react-native';

export const showAlert = (title, message, buttonsText = 'OK') => {
    Alert.alert(title, message, [
        { text: buttonsText },
    ]);
};