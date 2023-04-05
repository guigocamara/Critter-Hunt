import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';


export default function Welcome({ navigation }) {
    const [username, setUsername] = useState('');

    const getUsername = async () => {
        let result = await SecureStore.getItemAsync('userData');
        if (result) {
            let userData = JSON.parse(result);
            setUsername(userData.username);
        } else {
            setUsername('');
        }
    }

    const doLogout = async () => {
        await SecureStore.deleteItemAsync('userData');
        navigation.navigate('Login');
    }

    // when this screen renders, get the username from secure store and display
    useEffect(() => {
        getUsername();
    }, [])

    return (
        <View style={styles.container}>
            <Text>Welcome, {username}</Text>
            <Button title="Log out" onPress={() => doLogout()} />
            <Button title="Go to camera" onPress={() => navigation.navigate('Camera')} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});