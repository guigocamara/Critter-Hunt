import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    };

    const doLogin = async () => {
        try {
            await fetch('http://critterhunt.herokuapp.com/api/login', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            if (data.error) {
                                Alert.alert("Error", data.error);
                            }
                            else {
                                // decode accessToken into an object with user information 
                                let userData = jwt_decode(data.accessToken);
                                // convert the information to a string to be able to save it
                                userData = JSON.stringify(userData);
                                // save the string to secure local storage
                                save("userData", userData);
                                // userId is not sent in token
                                save("userId", data.userId);
                                navigation.navigate('Welcome');
                            }
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    // Possible auto login
    /*
    useEffect(() => {
        getUserData();
        if (isLoggedIn) {
            navigation.navigate("Welcome");
        }
    }, [])
    */
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                autoCapitalize="none"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Button title="Login" onPress={doLogin} />
            <Button title="Create Account" onPress={() => navigation.navigate('SignUp')} />
            <Button title="Forgot Password?" onPress={() => navigation.navigate('ForgotPass')} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})