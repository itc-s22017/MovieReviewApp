import { Alert } from 'react-native';

export const showAlert = (title, message, buttonsText = 'OK', onPress = () => { }) => {
    Alert.alert(title, message, [
        {
            text: buttonsText,
            onPress: () => onPress(),
        },
    ]);
};

export const cancelAlert = (title, message, onPress = () => { }) => {
    Alert.alert(title, message, [
        {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
        },
        {
            text: "OK",
            onPress: () => onPress(),
        },
    ]);
};